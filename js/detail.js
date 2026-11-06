/* session.html
   ?prog=sessions → 프로그램별 세션 목록
   ?id=session-3  → 세션 상세 (개요 · 연사 · 내 신청 상태) */
(function () {
  var S = window.WCF_SESSIONS || [], P = window.WCF_PROG || {};
  var root = document.getElementById('view');
  var q = new URLSearchParams(location.search);
  var id = q.get('id'), prog = q.get('prog');
  var STATE_L = { ok: '확정', part: '부분 확정', wait: '대기', none: '신청함' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function mine() { try { return JSON.parse(sessionStorage.getItem('wcf_my') || 'null'); } catch (e) { return null; } }
  function myState(key) {
    var m = mine(); if (!m || !key) return null;
    var s = (m.sessions || []).filter(function (x) { return x.key === key; })[0];
    return s || null;
  }
  function badge(key) {
    var s = myState(key); if (!s) return '';
    return '<span class="st ' + esc(s.state) + '">' + esc(STATE_L[s.state] || '신청함') + (s.state === 'part' && s.n ? ' (' + s.n + '명)' : '') + '</span>';
  }
  function speakersLine(x) { return x.speakers.map(function (p) { return p.name; }).join(', '); }

  // ---------- 목록 ----------
  function viewList(pk) {
    var pg = P[pk]; if (!pg) return notFound();
    document.title = pg.name + ' · 제15회 월드커피포럼';
    var list = S.filter(function (x) { return x.prog === pk; }), day = '', html = '';
    html += '<a class="back" href="index.html#' + esc(pg.anchor) + '">‹ 홈</a>' +
      '<h1 class="pg-t">' + esc(pg.name) + '</h1><p class="pg-m">' + esc(pg.room) + '</p>';
    if (mine()) html += '<p class="pg-hint">' + esc(mine().person.name) + ' 님이 신청한 세션에 상태가 표시됩니다.</p>';
    list.forEach(function (x) {
      if (x.day !== day) { if (day) html += '</ul>'; day = x.day; html += '<h2 class="dh">' + x.day + ' <small>' + x.dow + '</small></h2><ul class="sl">'; }
      html += '<li><a href="session.html?id=' + esc(x.id) + '">' +
        '<time>' + x.s + '<i>–' + x.e + '</i></time>' +
        '<span class="sl-b">' + (x.cat ? '<span class="sl-c"' + (x.color ? ' style="--c:' + x.color + '"' : '') + '>' + esc(x.cat) + '</span>' : '') +
        '<span class="sl-t">' + esc(x.title) + '</span>' +
        (x.speakers.length ? '<span class="sl-s">' + esc(speakersLine(x)) + '</span>' : '') + '</span>' +
        '<span class="sl-r">' + badge(x.key) + '<i aria-hidden="true">›</i></span></a></li>';
    });
    root.innerHTML = html + '</ul>';
  }

  // ---------- 상세 ----------
  function viewDetail(x) {
    var pg = P[x.prog];
    document.title = x.title + ' · ' + pg.name;
    var sibs = S.filter(function (y) { return y.prog === x.prog; }), i = sibs.indexOf(x);
    var prev = sibs[i - 1], next = sibs[i + 1];
    var st = myState(x.key);
    var html = '<a class="back" href="session.html?prog=' + esc(x.prog) + '">‹ ' + esc(pg.name) + '</a>';
    html += (x.cat ? '<p class="dt-c"' + (x.color ? ' style="--c:' + x.color + '"' : '') + '>' + esc(x.cat) + '</p>' : '') +
      '<h1 class="dt-t">' + esc(x.title) + '</h1>' +
      '<dl class="dt-m"><div><dt>일시</dt><dd>' + x.day + ' (' + x.dow + ') ' + x.s + ' – ' + x.e + '</dd></div>' +
      '<div><dt>장소</dt><dd>' + esc(pg.room) + '</dd></div>' +
      (x.speakers.length ? '<div><dt>연사</dt><dd>' + esc(speakersLine(x)) + '</dd></div>' : '') + '</dl>';

    if (st) {
      html += '<a class="my-st" href="planner.html"><span>내 신청</span>' + badge(x.key) + '<i aria-hidden="true">›</i></a>';
    } else if (x.key) {
      html += '<a class="my-st off" href="planner.html"><span>이 세션 신청하기 · 내 신청 조회</span><i aria-hidden="true">›</i></a>';
    }

    html += '<h2 class="dt-h">' + (x.prog === 'origin' ? '소개' : x.prog === 'sca' ? '교육 소개' : '발표 개요') + '</h2>' +
      '<div class="dt-body">' + x.overview.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>';

    if (x.speakers.length) {
      html += '<h2 class="dt-h">' + (x.prog === 'sca' ? '강사' : '연사') + '</h2><ul class="spk">';
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

  function notFound() { root.innerHTML = '<a class="back" href="index.html">‹ 홈</a><p class="lk-hint" style="padding:40px 0">세션을 찾지 못했어요.</p>'; }

  if (id) { var x = S.filter(function (y) { return y.id === id; })[0]; x ? viewDetail(x) : notFound(); }
  else viewList(prog || 'sessions');
})();
