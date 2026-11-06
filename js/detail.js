/* session.html
   ?prog=sessions → 프로그램별 세션 목록
   ?id=session-3  → 세션 상세 (개요 · 연사 · 참관 가능 여부 · 혼잡도) */
(function () {
  var S = window.WCF_SESSIONS || [], P = window.WCF_PROG || {};
  var root = document.getElementById('view');
  var q = new URLSearchParams(location.search);
  var id = q.get('id'), prog = q.get('prog');

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function mine() { try { return JSON.parse(sessionStorage.getItem('wcf_my') || 'null'); } catch (e) { return null; } }
  var CONG = { ok: '여유', near: '보통', full: '혼잡' };
  function me() { var m = mine(); return m && m.access ? m : null; }
  function can(key) { var m = me(); return !!(m && key && m.access.indexOf(key) > -1); }
  function picked(key) { var m = me(); return !!(m && m.survey && m.survey.picks.indexOf(key) > -1); }
  function cong(key) { var m = me(), c = m && m.congestion[key]; return c ? '<span class="cg cg-' + c + '" role="img" aria-label="' + CONG[c] + '" title="' + CONG[c] + '"></span>' : ''; }
  var LEGEND = '<p class="cg-lg"><span class="cg cg-ok"></span>여유<span class="cg cg-near"></span>보통<span class="cg cg-full"></span>혼잡</p>';
  // 목록 오른쪽: 로그인 전에는 아무것도 없음, 로그인 후 참관 가능 여부(초록/회색) + 혼잡도
  function badge(key) {
    if (!me() || !key) return '';
    return can(key) ? cong(key) : '<span class="acc off">참관 불가</span>';
  }
  function speakersLine(x) { return x.speakers.map(function (p) { return p.name; }).join(', '); }

  // ---------- 목록 ----------
  function viewList(pk) {
    var pg = P[pk]; if (!pg) return notFound();
    document.title = pg.name + ' · 제15회 월드커피포럼';
    var list = S.filter(function (x) { return x.prog === pk; }), day = '', html = '';
    var single = me() && !me().person.isMB;
    if (single) list = list.filter(function (x) { return !x.key || can(x.key); }); // 단권: 참관 가능한 세션만
    html += '<a class="back" href="index.html#' + esc(pg.anchor) + '">‹ 홈</a>' +
      '<h1 class="pg-t">' + esc(pg.name) + '</h1><p class="pg-m">' + esc(pg.room) + '</p>';
    if (me()) html += LEGEND;
    list.forEach(function (x) {
      if (x.day !== day) { if (day) html += '</ul>'; day = x.day; html += '<h2 class="dh">' + x.day + ' <small>' + x.dow + '</small></h2><ul class="sl">'; }
      html += '<li' + (me() && x.key && !can(x.key) ? ' class="dim"' : '') + '><a href="session.html?id=' + esc(x.id) + '">' +
        '<time>' + x.s + '<i>–' + x.e + '</i></time>' +
        '<span class="sl-b">' + (x.cat ? '<span class="sl-c"' + (x.color ? ' style="--c:' + x.color + '"' : '') + '>' + esc(x.cat) + '</span>' : '') +
        '<span class="sl-t">' + esc(x.title) + '</span>' +
        (x.speakers.length ? '<span class="sl-s">' + esc(speakersLine(x)) + '</span>' : '') + '</span>' +
        '<span class="sl-r">' + badge(x.key) + '<i aria-hidden="true">›</i></span></a></li>';
    });
    if (!list.length) html += '<p class="lk-hint" style="padding:28px 0">내 티켓으로 참관할 수 있는 세션이 없습니다. <a href="planner.html">세션 플래너</a>에서 참관 가능한 프로그램을 확인할 수 있습니다.</p>';
    root.innerHTML = html + (list.length ? '</ul>' : '');
  }

  // ---------- 상세 ----------
  function viewDetail(x) {
    var pg = P[x.prog];
    document.title = x.title + ' · ' + pg.name;
    var sibs = S.filter(function (y) { return y.prog === x.prog && (!me() || me().person.isMB || !y.key || can(y.key) || y === x); }), i = sibs.indexOf(x);
    var prev = sibs[i - 1], next = sibs[i + 1];

    var single = S.filter(function (y) { return y.prog === x.prog; }).length === 1;
    var html = (single ? '<a class="back" href="index.html#programs">‹ 홈</a>' : '<a class="back" href="session.html?prog=' + esc(x.prog) + '">‹ ' + esc(pg.name) + '</a>') + (me() && can(x.key) ? LEGEND : '');
    html += (x.cat ? '<p class="dt-c"' + (x.color ? ' style="--c:' + x.color + '"' : '') + '>' + esc(x.cat) + '</p>' : '') +
      '<h1 class="dt-t">' + esc(x.title) + '</h1>' +
      '<dl class="dt-m"><div><dt>일시</dt><dd>' + x.day + ' (' + x.dow + ') ' + x.s + ' – ' + x.e + '</dd></div>' +
      '<div><dt>장소</dt><dd>' + esc(pg.room) + '</dd></div>' +
      (x.speakers.length ? '<div><dt>' + (x.metaLabel ? x.metaLabel : x.speakerLabel ? x.speakerLabel : x.prog === 'futures' ? '심사' : x.prog === 'sca' ? '강사' : '연사') + '</dt><dd>' + esc(speakersLine(x)) + '</dd></div>' : '') + '</dl>';

    if (x.key && !me()) {
      html += '<a class="my-st off" href="planner.html"><span>세션 플래너에 로그인하면 내 티켓으로 참관할 수 있는지 확인할 수 있습니다</span><i aria-hidden="true">›</i></a>';
    } else if (x.key) {
      var ok = can(x.key), m = me();
      html += '<a class="my-st" href="planner.html"><span class="acc-l"><span class="dot ' + (ok ? 'on' : 'off') + '"></span>' +
        (ok ? '내 티켓으로 참관 가능' : '내 티켓으로는 참관할 수 없습니다') + '</span>' + (ok ? cong(x.key) : '') + '<i aria-hidden="true">›</i></a>';
      if (ok && m.person.isMB && m.survey) html += '<p class="my-sub">' + (picked(x.key) ? '수요조사에 담은 세션입니다.' : '수요조사에 담지 않은 세션입니다. 세션 플래너에서 추가할 수 있습니다.') + '</p>';
    }

    html += '<h2 class="dt-h">' + (x.overviewLabel ? x.overviewLabel : x.prog === 'origin' || x.prog === 'futures' || !x.speakers.length ? '소개' : x.prog === 'sca' ? '교육 소개' : '발표 개요') + '</h2>' +
      (x.image ? '<img class="dt-img" src="' + esc(x.image) + '" alt="">' : '') +
      '<div class="dt-body">' + x.overview.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
      (x.links || []).map(function (l) { return '<a class="btn dt-link" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' ↗</a>'; }).join('');

    // 참가사 라인업 (페어링 테이블 등): partners = [{group, items:[{name, desc, logo}]}]
    if (x.partners && x.partners.length) {
      html += '<h2 class="dt-h">참가사 라인업</h2>';
      x.partners.forEach(function (g) {
        html += '<h3 class="pt-g">' + esc(g.group) + '</h3><ul class="pt">';
        g.items.forEach(function (it) {
          html += '<li>' + (it.logo ? '<img src="' + esc(it.logo) + '" alt="">' : '<span class="pt-ph" aria-hidden="true">' + esc(it.name.replace(/^\(예시\)\s*/, '').replace(/[()]/g, '').charAt(0)) + '</span>') +
            '<div><b>' + esc(it.name) + '</b>' + (it.desc ? '<small>' + esc(it.desc) + '</small>' : '') + '</div></li>';
        });
        html += '</ul>';
      });
    }

    if (x.speakers.length) {
      html += '<h2 class="dt-h">' + (x.speakerLabel || (x.prog === 'sca' ? '강사' : x.prog === 'futures' ? '심사위원' : '연사')) + '</h2><ul class="spk">';
      x.speakers.forEach(function (p) {
        html += '<li>' + (p.photo ? '<img src="' + esc(p.photo) + '" alt="" width="64" height="64">' : '<span class="spk-ph" aria-hidden="true">' + esc(p.name.charAt(0)) + '</span>') +
          '<div><b>' + esc(p.name) + '</b><small>' + esc(p.role) + '</small><p>' + esc(p.bio || '') + '</p></div></li>';
      });
      html += '</ul>';
    }

    html += '<nav class="pn">' +
      (prev ? '<a href="session.html?id=' + prev.id + '"><small>이전</small><span>' + esc(prev.title) + '</span></a>' : '<span></span>') +
      (next ? '<a class="nx" href="session.html?id=' + next.id + '"><small>다음</small><span>' + esc(next.title) + '</span></a>' : '<span></span>') +
      '</nav>';
    root.innerHTML = html;
    scrollTo(0, 0);
  }

  function notFound() { root.innerHTML = '<a class="back" href="index.html">‹ 홈</a><p class="lk-hint" style="padding:40px 0">세션을 찾지 못했습니다.</p>'; }

  if (id) { var x = S.filter(function (y) { return y.id === id; })[0]; x ? viewDetail(x) : notFound(); }
  else viewList(prog || 'sessions');
})();
