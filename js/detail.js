/* session.html
   ?prog=sessions → 프로그램별 세션 목록
   ?id=session-3  → 세션 상세 (개요 · 연사 · 참관 가능 여부 · 혼잡도) */
(function () {
  var S = window.WCF_SESSIONS || [], P = window.WCF_PROG || {};
  var root = document.getElementById('view');
  var EN = document.documentElement.lang === 'en';
  function T(ko, en) { return EN ? en : ko; }
  var SITE = T('제15회 월드커피포럼', 'The 15th World Coffee Forum');
  var q = new URLSearchParams(location.search);
  var id = q.get('id'), prog = q.get('prog');

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function mine() { try { return JSON.parse(sessionStorage.getItem('wcf_my') || 'null'); } catch (e) { return null; } }
  var CONG = EN ? { ok: 'Available', near: 'Moderate', full: 'Busy' } : { ok: '여유', near: '보통', full: '혼잡' };
  function me() { var m = mine(); return m && m.access ? m : null; }
  function can(key) { var m = me(); return !!(m && key && m.access.indexOf(key) > -1); }
  function picked(key) { var m = me(); return !!(m && m.survey && m.survey.picks.indexOf(key) > -1); }
  function cong(key) { var m = me(), c = m && m.congestion[key]; return c ? '<span class="cg cg-' + c + '" role="img" aria-label="' + CONG[c] + '" title="' + CONG[c] + '"></span>' : ''; }
  var LEGEND = '<p class="cg-lg"><span class="cg cg-ok"></span>' + CONG.ok + '<span class="cg cg-near"></span>' + CONG.near + '<span class="cg cg-full"></span>' + CONG.full + '</p>';
  // 목록 오른쪽: 로그인 전에는 아무것도 없음, 로그인 후 참관 가능 여부(초록/회색) + 혼잡도
  function badge(key) {
    if (!me() || !key) return '';
    return can(key) ? cong(key) : '<span class="acc off">' + T('참관 불가', 'Not included') + '</span>';
  }
  function speakersLine(x) { return x.speakers.map(function (p) { return p.name; }).join(', '); }

  // ---------- 목록 ----------
  function viewList(pk) {
    var pg = P[pk]; if (!pg) return notFound();
    document.title = pg.name + ' · ' + SITE;
    var list = S.filter(function (x) { return x.prog === pk; }), day = '', html = '';
    var single = me() && !me().person.isMB;
    if (single) list = list.filter(function (x) { return !x.key || can(x.key); }); // 단권: 참관 가능한 세션만
    html += '<a class="back" href="index.html#' + esc(pg.anchor) + '">‹ ' + T('홈', 'Home') + '</a>' +
      '<h1 class="pg-t">' + esc(pg.name) + '</h1><p class="pg-m">' + esc(pg.room) + '</p>';
    if (me()) html += LEGEND;
    list.forEach(function (x) {
      if (x.day !== day) { if (day) html += '</ul>'; day = x.day; html += '<h2 class="dh">' + x.day + ' <small>' + x.dow + '</small></h2><ul class="sl">'; }
      html += '<li' + (me() && x.key && !can(x.key) ? ' class="dim"' : '') + '><a href="session.html?id=' + esc(x.id) + '">' +
        '<time>' + x.s + '<i>–' + x.e + '</i></time>' +
        '<span class="sl-b">' + (x.cat ? '<span class="sl-c"' + (x.color ? ' style="--c:' + x.color + '"' : '') + '>' + esc(x.cat) + '</span>' : '') +
        '<span class="sl-t">' + esc(x.title) + '</span>' +
        (x.speakers.length ? '<span class="sl-s"><span class="av">' + x.speakers.map(function (p) { return p.photo ? '<img src="' + esc(p.photo) + '" alt="" width="26" height="26" loading="lazy">' : '<b aria-hidden="true">' + esc(p.name.charAt(0)) + '</b>'; }).join('') + '</span><span class="sl-n">' + esc(speakersLine(x)) + '</span></span>' : '') + '</span>' +
        '<span class="sl-r">' + badge(x.key) + '<i aria-hidden="true">›</i></span></a></li>';
    });
    if (!list.length) html += T('<p class="lk-hint" style="padding:28px 0">내 티켓으로 참관할 수 있는 세션이 없습니다. <a href="planner.html">세션 플래너</a>에서 참관 가능한 프로그램을 확인할 수 있습니다.</p>', '<p class="lk-hint" style="padding:28px 0">Your ticket does not include sessions in this program. See the <a href="planner.html">Session Planner</a> for the programs you can attend.</p>');
    root.innerHTML = html + (list.length ? '</ul>' : '');
  }

  // ---------- 상세 ----------
  function viewDetail(x) {
    var pg = P[x.prog];
    document.title = x.title + ' · ' + pg.name;
    var sibs = S.filter(function (y) { return y.prog === x.prog && (!me() || me().person.isMB || !y.key || can(y.key) || y === x); }), i = sibs.indexOf(x);
    var prev = sibs[i - 1], next = sibs[i + 1];

    var single = S.filter(function (y) { return y.prog === x.prog; }).length === 1;
    var html = (single ? '<a class="back" href="index.html#programs">‹ ' + T('홈', 'Home') + '</a>' : '<a class="back" href="session.html?prog=' + esc(x.prog) + '">‹ ' + esc(pg.name) + '</a>') + (me() && can(x.key) ? LEGEND : '');
    html += (x.cat ? '<p class="dt-c"' + (x.color ? ' style="--c:' + x.color + '"' : '') + '>' + esc(x.cat) + '</p>' : '') +
      '<h1 class="dt-t">' + esc(x.title) + '</h1>' +
      '<dl class="dt-m"><div><dt>' + T('일시', 'Date') + '</dt><dd>' + x.day + ' (' + x.dow + ') ' + x.s + ' – ' + x.e + '</dd></div>' +
      '<div><dt>' + T('장소', 'Venue') + '</dt><dd>' + esc(x.room || pg.room) + '</dd></div>' +
      (x.speakers.length ? '<div><dt>' + (x.metaLabel ? x.metaLabel : x.speakerLabel ? x.speakerLabel : x.prog === 'futures' ? T('심사', 'Judges') : x.prog === 'sca' ? T('강사', 'Trainers') : T('연사', 'Speaker')) + '</dt><dd>' + esc(speakersLine(x)) + '</dd></div>' : '') + '</dl>';

    if (x.key && me()) {
      var ok = can(x.key), m = me();
      html += '<a class="my-st" href="planner.html"><span class="acc-l"><span class="dot ' + (ok ? 'on' : 'off') + '"></span>' +
        (ok ? T('내 티켓으로 참관 가능', 'Included in your ticket') : T('내 티켓으로는 참관할 수 없습니다', 'Not included in your ticket')) + '</span>' + (ok ? cong(x.key) : '') + '<i aria-hidden="true">›</i></a>';
      if (ok && m.person.isMB && m.survey) html += '<p class="my-sub">' + (picked(x.key) ? T('수요조사에 담은 세션입니다.', 'You selected this session in your survey.') : T('수요조사에 담지 않은 세션입니다. 세션 플래너에서 추가할 수 있습니다.', 'Not in your survey yet. You can add it in the Session Planner.')) + '</p>';
    }

    if (x.schedule) html += '<h2 class="dt-h">' + T('진행 순서', 'Schedule') + '</h2><ol class="sched">' + x.schedule.map(function (r) {
      return '<li><time>' + r[0] + '<i>–' + r[1] + '</i></time><span>' + esc(r[2]) + (r[3] ? '<small>' + r[3].map(function (t, i) { return ((r[4] || 1) + i) + '. ' + esc(t); }).join('<br>') + '</small>' : '') + '</span></li>'; }).join('') + '</ol>' +
      (x.scheduleNotes ? '<ul class="lk-cap sched-n">' + x.scheduleNotes.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>' : '');
    html += '<h2 class="dt-h">' + (x.overviewLabel ? x.overviewLabel : x.prog === 'origin' || x.prog === 'futures' || !x.speakers.length ? T('소개', 'About') : x.prog === 'sca' ? T('교육 소개', 'About the Course') : T('발표 개요', 'Overview')) + '</h2>' +
      (x.image ? '<img class="dt-img" src="' + esc(x.image) + '" alt="">' : '') +
      '<div class="dt-body">' + x.overview.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
      (x.links || []).map(function (l) { return '<a class="btn dt-link" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' ↗</a>'; }).join('');

    // 참가사 라인업 (페어링 테이블 등): partners = [{group, items:[{name, desc, logo}]}]
    if (x.partners && x.partners.length) {
      html += '<h2 class="dt-h">' + T('참가사 라인업', 'Partner Lineup') + '</h2>';
      x.partners.forEach(function (g) {
        html += '<h3 class="pt-g">' + esc(g.group) + '</h3><ul class="pt">';
        g.items.forEach(function (it) {
          html += '<li><a href="session.html?partner=' + esc(it.id) + '">' + logo(it) +
            '<div><b>' + esc(it.name) + '</b>' + (it.sub ? '<small>' + esc(it.sub) + '</small>' : '') + '</div><i aria-hidden="true">›</i></a></li>';
        });
        html += '</ul>';
      });
    }

    if (x.speakers.length) {
      html += '<h2 class="dt-h">' + (x.speakerLabel || (x.prog === 'sca' ? T('강사', 'Trainers') : x.prog === 'futures' ? T('심사위원', 'Judges') : T('연사', 'Speakers'))) + '</h2><ul class="spk">';
      x.speakers.forEach(function (p) {
        html += '<li>' + (p.photo ? '<img src="' + esc(p.photo) + '" alt="" width="64" height="64">' : '<span class="spk-ph" aria-hidden="true">' + esc(p.name.charAt(0)) + '</span>') +
          '<div><b>' + esc(p.name) + '</b><small>' + esc(p.role) + '</small><p>' + esc(p.bio || '') + '</p></div></li>';
      });
      html += '</ul>';
    }

    html += '<nav class="pn">' +
      (prev ? '<a href="session.html?id=' + prev.id + '"><small>' + T('이전', 'Previous') + '</small><span>' + esc(prev.title) + '</span></a>' : '<span></span>') +
      (next ? '<a class="nx" href="session.html?id=' + next.id + '"><small>' + T('다음', 'Next') + '</small><span>' + esc(next.title) + '</span></a>' : '<span></span>') +
      '</nav>';
    root.innerHTML = html;
    scrollTo(0, 0);
  }

  function logo(it) { return it.logo ? '<img src="' + esc(it.logo) + '" alt="">' : '<span class="pt-ph" aria-hidden="true">' + esc(it.name.charAt(0)) + '</span>'; }

  // ---------- 파트너 브랜드 상세 ----------
  function viewPartner(pid) {
    var host, item, grp;
    S.forEach(function (y) { (y.partners || []).forEach(function (g) { g.items.forEach(function (it) { if (it.id === pid) { host = y; item = it; grp = g; } }); }); });
    if (!item) return notFound();
    document.title = item.name + ' · ' + host.title;
    var html = '<a class="back" href="session.html?id=' + esc(host.id) + '">‹ ' + esc(host.title) + '</a>' +
      '<p class="dt-c">' + esc(grp.group) + '</p><div class="pt-hd">' + logo(item) + '<div><h1 class="dt-t">' + esc(item.name) + '</h1>' + (item.sub ? '<p class="pg-m">' + esc(item.sub) + '</p>' : '') + '</div></div>' +
      '<h2 class="dt-h">' + T('브랜드 소개', 'About the Brand') + '</h2>' +
      '<div class="dt-body"><p>' + esc(item.desc || T('더 스테이지 페어링 테이블의 ' + grp.group + '입니다.', grp.group.replace(/s$/, '') + ' of the Pairing Table at The Stage.')) + '</p></div>';
    if (item.featured) html += '<div class="pt-ft"><h4>' + esc(item.featured.title) + '</h4>' + (item.featured.note ? '<p>' + esc(item.featured.note) + '</p>' : '') +
      '<ol>' + item.featured.list.map(function (r) { return '<li><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + '</span></li>'; }).join('') + '</ol></div>';
    var others = []; host.partners.forEach(function (g) { g.items.forEach(function (it) { if (it.id !== pid) others.push(it); }); });
    if (others.length) html += '<h2 class="dt-h">' + T('다른 파트너', 'Other Partners') + '</h2><ul class="pt">' + others.map(function (it) {
      return '<li><a href="session.html?partner=' + esc(it.id) + '">' + logo(it) + '<div><b>' + esc(it.name) + '</b></div><i aria-hidden="true">›</i></a></li>'; }).join('') + '</ul>';
    root.innerHTML = html; scrollTo(0, 0);
  }

  function notFound() { root.innerHTML = '<a class="back" href="index.html">‹ ' + T('홈', 'Home') + '</a><p class="lk-hint" style="padding:40px 0">' + T('세션을 찾지 못했습니다.', 'Session not found.') + '</p>'; }

  var partner = q.get('partner');
  if (partner) viewPartner(partner);
  else if (id) { var x = S.filter(function (y) { return y.id === id; })[0]; x ? viewDetail(x) : notFound(); }
  else viewList(prog || 'sessions');
})();
