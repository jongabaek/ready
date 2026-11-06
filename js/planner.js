/* 세션 플래너
   로그인: 이름 + 휴대전화 (해외 번호는 이메일)
   - MB 패스: All About Q를 뺀 전 세션 참관 가능 · 수요조사 응답 조회 / 수정 / 신규 응답
   - 단권: 구매한 프로그램만 참관 가능 (수요조사 없음)
   - 혼잡도: 초록(여유) · 주황(보통) · 빨강(혼잡) — 수요조사 기반 예상치 */
(function () {
  var CFG = window.WCF_CONFIG || {};
  var root = document.getElementById('planner');
  if (!root) return;
  var MOCK = !CFG.API_URL || /[?&]mock=1/.test(location.search);
  var S = window.WCF_SESSIONS || [], P = window.WCF_PROG || {};
  var EN = document.documentElement.lang === 'en';
  function T(ko, en) { return EN ? en : ko; }
  function tk(t) { return EN ? String(t).replace('(초청)', '(Invited)').replace('(목요일권)', '(Thursday)').replace('(금요일권)', '(Friday)').replace('(수요일권)', '(Wednesday)').replace('(토요일권)', '(Saturday)').replace('(4일권)', '(4-Day)') : t; }

  // 수정 화면용 묶음 (집계 키 = 통합관리시트 F_○○ / SCA_○○)
  var GROUPS = [
    { title: 'The Sessions', prog: 'sessions' },
    { title: 'Origin Discovery', prog: 'origin' },
    { title: 'Champion Live', prog: 'champion' },
    { title: 'SCA Education', prog: 'sca' }
  ];
  var CONG = EN ? { ok: 'Available', near: 'Moderate', full: 'Busy' } : { ok: '여유', near: '보통', full: '혼잡' };
  var Q1_L = ['참석', '미정', '불참'];
  var Q1_EN = { '참석': 'Attending', '미정': 'Undecided', '불참': 'Not attending' };
  function q1l(v) { return EN ? (Q1_EN[v] || v) : v; }
  var MB_NOTE = EN ? 'Seats for each session are limited. If seats run short, priority seating goes to those who responded to the survey in advance. Some sessions have a limited number of tasting portions, so we may not be able to offer a tasting to everyone when attendance is high. Thank you for your understanding.' : '세션별 좌석은 한정되어 있습니다. 좌석이 부족할 경우 수요조사에 미리 응답하신 분께 우선 착석을 안내해 드립니다. 일부 세션은 시음 가능 인원이 정해져 있어, 참석 인원이 많을 때는 모든 분께 시음을 제공해 드리기 어려울 수 있는 점 양해 부탁드립니다.';

  var cred = null, data = null;
  function save() { try { sessionStorage.setItem('wcf_my', JSON.stringify(data)); sessionStorage.setItem('wcf_cred', JSON.stringify(cred)); } catch (e) {} }
  function clear() { try { sessionStorage.removeItem('wcf_my'); sessionStorage.removeItem('wcf_cred'); } catch (e) {} }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function digits(s) { return String(s || '').replace(/\D/g, ''); }
  function fmtPhone(v) { var d = digits(v).slice(0, 11); return d.length < 4 ? d : d.length < 8 ? d.slice(0, 3) + '-' + d.slice(3) : d.slice(0, 3) + '-' + d.slice(3, 7) + '-' + d.slice(7); }
  function byKey(k) { return S.filter(function (x) { return x.key === k; }); }
  function first(k) { return byKey(k)[0]; }
  function cong(k) { var c = data && data.congestion && data.congestion[k]; return c ? '<span class="cg cg-' + c + '" role="img" aria-label="' + CONG[c] + '" title="' + CONG[c] + '"></span>' : ''; }
  var LEGEND = '<p class="cg-lg"><span class="cg cg-ok"></span>' + CONG.ok + '<span class="cg cg-near"></span>' + CONG.near + '<span class="cg cg-full"></span>' + CONG.full + '</p>';
  function has(k) { return data && data.access.indexOf(k) > -1; }

  // ---------- API ----------
  function api(payload) {
    if (MOCK) return mockApi(payload);
    if (payload.action === 'login') {
      var q = Object.keys(payload).map(function (k) { return k + '=' + encodeURIComponent(payload[k] || ''); }).join('&');
      return fetch(CFG.API_URL + '?' + q).then(function (r) { return r.json(); });
    }
    return fetch(CFG.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); });
  }
  var ERR = EN ? {
    not_found: 'No matching ticket found. Please check the name and phone number or email you registered with.',
    locked: 'Too many login attempts. Please try again in 10 minutes.',
    bad_request: 'Please check your input.',
    no_survey: 'This ticket is not eligible for the survey.'
  } : {
    not_found: '일치하는 티켓 정보를 찾지 못했습니다. 티켓 구매·초청 시 등록한 이름과 번호를 확인해 주십시오.',
    locked: '로그인 시도가 많아 잠시 제한되었습니다. 10분 뒤에 다시 시도해 주십시오.',
    bad_request: '입력값을 확인해 주십시오.',
    no_survey: '이 티켓은 수요조사 대상이 아닙니다.'
  };

  // ---------- 로그인 ----------
  function viewLogin(err) {
    var c = cred || {};
    root.innerHTML =
      (MOCK ? '<div class="mock-note"><b>' + T('테스트 계정', 'Test accounts') + '</b>' +
        mk(T('MB 구매자 · 수요조사 응답', 'MB pass · responded'), '김커피', '01012345678') +
        mk(T('MB 구매자 · 미응답', 'MB pass · not responded'), '최구매', '01044445555') +
        mk(T('MB 초청자 · 미응답', 'MB pass (invited) · not responded'), '박엠비', '01033334444') +
        mk(T('단권 구매자', 'Single-program ticket'), '이단권', '01022223333') +
        mk(T('단권 초청 · 더 스테이지', 'Invited · The Stage'), '정스테', '01055556666') +
        mk(T('단권 초청 · 오리진 특정 세션', 'Invited · one Origin session'), '한오리', '01066667777') + '</div>' : '') +
      '<form class="lk-form" id="lkf" novalidate>' +
      '<div class="fld"><label for="lk-n">' + T('이름', 'Name<small>first name, then last name</small>') + '</label><input id="lk-n" autocomplete="name" placeholder="' + T('김포럼', 'Jane Smith') + '" value="' + esc(c.name) + '"></div>' +
      (EN ? '' : '<div class="fld"><label for="lk-p">' + T('휴대전화', 'Mobile (Korea)') + '</label><input id="lk-p" inputmode="numeric" autocomplete="tel" placeholder="010-0000-0000" value="' + esc(fmtPhone(c.phone)) + '"></div>') +
      '<div class="fld"><label for="lk-e">' + T('이메일<small>해외 번호인 경우</small>', 'Email') + '</label><input id="lk-e" type="email" autocomplete="email" placeholder="name@example.com" value="' + esc(c.email) + '"></div>' +
      '<p class="lk-err" id="lk-err">' + esc(err || '') + '</p>' +
      '<button class="lk-btn" id="lk-go">' + T('로그인', 'Log in') + '</button>' +
      '<ul class="lk-cap">' + T('<li>국내 등록자는 휴대전화 번호로 로그인할 수 있습니다.</li><li>해외 번호로 등록하신 분은 이메일 주소로 로그인할 수 있습니다.</li>', '<li>Please enter the name and email address you registered with.</li>') + '</ul></form>';
    var p = document.getElementById('lk-p') || { value: '', addEventListener: function () {} };
    p.addEventListener('input', function () { p.value = fmtPhone(p.value); });
    [].forEach.call(root.querySelectorAll('.mk'), function (btn) {
      btn.onclick = function () { document.getElementById('lk-n').value = btn.dataset.n; p.value = fmtPhone(btn.dataset.p); document.getElementById('lk-e').value = EN ? btn.dataset.e : ''; };
    });
    document.getElementById('lkf').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('lk-n').value.trim(), phone = digits(p.value), email = document.getElementById('lk-e').value.trim();
      if (!name) return showErr(T('이름을 입력해 주십시오.', 'Please enter your name.'));
      if (EN && !email) return showErr('Please enter your email address.');
      if (phone.length < 10 && !email) return showErr(T('휴대전화 번호 전체를 입력해 주십시오. 해외 번호는 이메일로 로그인할 수 있습니다.', 'Please enter your full mobile number, or log in with email if you have a non-Korean number.'));
      cred = { name: name, phone: phone, email: email };
      busy('lk-go', T('확인 중…', 'Checking…'));
      api({ action: 'login', name: name, phone: phone, email: email }).then(function (res) {
        if (!res || !res.ok) return viewLogin(ERR[res && res.error] || T('로그인 중 문제가 발생했습니다.', 'Something went wrong while logging in.'));
        data = res; save(); viewHome();
      }, function () { viewLogin(T('연결에 실패했습니다. 잠시 후 다시 시도해 주십시오.', 'Connection failed. Please try again shortly.')); });
    });
  }
  function mk(label, n, ph) { var em = 'test' + ph.slice(-4) + '@example.com'; return '<button type="button" class="mk" data-n="' + n + '" data-p="' + ph + '" data-e="' + em + '"><span>' + label + '</span>' + n + ' · ' + (EN ? em : fmtPhone(ph)) + '</button>'; }
  function showErr(m) { var el = document.getElementById('lk-err'); if (el) el.textContent = m; }
  function busy(id, label) { var b = document.getElementById(id); if (b) { b.disabled = true; b.textContent = label; } }

  // ---------- 로그인 후 ----------
  function row(k, extra) {
    var x = first(k); if (!x) return '';
    var href = k === 'F_Q1' ? 'session.html?prog=stage' : 'session.html?id=' + x.id;
    var t = k === 'F_Q1' ? 'The Stage' : (x.cat && x.prog === 'sessions' ? x.cat + ' · ' : '') + x.title;
    return '<li><a href="' + href + '"><span class="t">' + esc(t) + '</span><span class="m">' + x.day + ' ' + x.dow + ' ' + x.s + ' · ' + esc(P[x.prog].room) + (extra || '') + '</span>' +
      '<span class="st">' + cong(k) + '</span><i class="go" aria-hidden="true">›</i></a></li>';
  }
  function progSummary() {
    var html = '<ul class="pv">';
    ['stage', 'sessions', 'origin', 'champion', 'sca'].forEach(function (pk) {
      var items = S.filter(function (x) { return x.prog === pk && x.key; });
      var keys = items.map(function (x) { return x.key; }).filter(function (k, i, a) { return a.indexOf(k) === i; });
      var n = keys.filter(has).length;
      if (!n && !data.person.isMB) return; // 단권: 참관 가능한 프로그램만
      html += '<li><a href="session.html?prog=' + pk + '"><span class="dot ' + (n ? 'on' : 'off') + '"></span><span class="t">' + esc(P[pk].name) + '</span>' +
        '<span class="m">' + (n ? (n === keys.length ? T('전체 참관 가능', 'All sessions included') : T(n + '개 세션 참관 가능', n + (n === 1 ? ' session' : ' sessions') + ' included')) : T('참관 불가', 'Not included')) + '</span><i class="go" aria-hidden="true">›</i></a></li>';
    });
    return html + '</ul>';
  }

  function viewHome(msg) {
    document.body.classList.remove('editing');
    var p = data.person, sv = data.survey, html = '';
    if (MOCK) html += '<p class="mock-note">' + T('테스트 모드 · 예시 데이터입니다.', 'Test mode · sample data') + '</p>';
    if (msg) html += '<p class="ok-note">' + esc(msg) + '</p>';
    html += LEGEND + '<div class="me"><b>' + esc(p.name) + T(' 님', '') + '</b><small>' + esc(p.contact) + '</small></div>' +
      '<p class="tk">' + p.tickets.map(function (t) { return '<span>' + esc(tk(t)) + '</span>'; }).join('') + '</p>';

    if (p.isMB && sv) {
      html += '<h2 class="lk-sub">' + T('세션 수요조사', 'Session Survey') + '</h2>';
      if (sv.responded) {
        var keys = (sv.q1 === '참석' ? ['F_Q1'] : []).concat(sv.picks.filter(function (k) { return k !== 'F_Q1'; }));
        html += '<p class="sv-st"><span class="dot on"></span>' + T('응답 완료 · ', 'Responded · ') + (sv.edited ? T('마지막 수정 ', 'last edited ') : T('마지막 응답 ', 'responded ')) + esc(sv.lastAt) + '</p>' +
          (keys.length ? '<ul class="rs">' + keys.map(function (k) { return row(k); }).join('') + '</ul>' : '<p class="lk-hint" style="padding:12px 0">' + T('선택한 세션이 없습니다.', 'No sessions selected.') + '</p>') +
          (sv.q1 && sv.q1 !== '참석' ? '<p class="lk-meta">The Stage · ' + esc(q1l(sv.q1)) + '</p>' : '') +
          '<button class="lk-btn ghost wide" id="lk-edit">' + T('응답 수정', 'Edit response') + '</button>';
      } else {
        html += '<p class="sv-st"><span class="dot off"></span>' + T('아직 응답하지 않았습니다', 'Not responded yet') + '</p>' +
          '<p class="lk-hint">' + T('참여를 희망하는 세션을 미리 선택해 주십시오. 응답 내용은 좌석과 현장 운영 준비에 활용되며, 아직 정하지 않았다면 「미정」으로 응답한 뒤 나중에 수정할 수 있습니다.', 'Please select the sessions you plan to attend. Your response helps us prepare seating and on-site operations. If you have not decided yet, choose “Undecided” and edit later.') + '</p>' +
          '<button class="lk-btn wide" id="lk-edit">' + T('수요조사 응답하기', 'Take the survey') + '</button>';
      }
      html += '<p class="ed-note">' + MB_NOTE + '</p>';
    }

    html += '<h2 class="lk-sub">' + T('내 티켓으로 볼 수 있는 프로그램', 'Programs in your ticket') + '</h2>' + progSummary();
    if (!p.isMB) {
      var mine = data.access.filter(function (k) { return first(k); });
      html += '<h2 class="lk-sub">' + T('참관 가능 세션', 'Sessions you can attend') + '</h2><ul class="rs">' + mine.map(function (k) { return row(k); }).join('') + '</ul>';
    }
    html += '<p class="lk-meta">' + T(esc(data.asOf) + ' 기준', 'As of ' + esc(data.asOf)) + '</p>' +
      '<div class="lk-row"><button class="lk-link" id="lk-out">' + T('로그아웃', 'Log out') + '</button></div>';
    root.innerHTML = html;
    document.getElementById('lk-out').onclick = function () { data = null; cred = null; clear(); viewLogin(); };
    var eb = document.getElementById('lk-edit'); if (eb) eb.onclick = viewEdit;
  }

  // ---------- 수요조사 응답 · 수정 (MB) ----------
  function viewEdit() {
    var sv = data.survey, picked = {};
    sv.picks.forEach(function (k) { picked[k] = 1; });
    var q1now = sv.responded ? (sv.q1 || '미정') : '';
    var html = LEGEND + '<div class="me"><b>' + (sv.responded ? T('응답 수정', 'Edit response') : T('수요조사 응답', 'Session survey')) + '</b><small>' + esc(data.person.name) + T(' 님', '') + '</small></div>';
    if (has('F_Q1')) {
      html += '<div class="ed-grp"><h4>The Stage<small>' + T('11.12 목 · 4F 401호', '11.12 Thu · 4F Room 401') + '</small></h4>';
      Q1_L.forEach(function (v) {
        html += '<label class="opt"><input type="radio" name="q1" value="' + v + '"' + (q1now === v ? ' checked' : '') + '><span class="t">' + q1l(v) + '</span><span class="m"></span>' +
          (v === '참석' ? cong('F_Q1') : '') + '</label>';
      });
      html += '</div>';
    }
    GROUPS.forEach(function (g) {
      var items = S.filter(function (x) { return x.prog === g.prog && x.key && has(x.key); });
      if (!items.length) return;
      html += '<div class="ed-grp"><h4>' + esc(g.title) + '<small>' + esc(P[g.prog].room) + '</small></h4>';
      items.forEach(function (x) {
        html += '<label class="opt"><input type="checkbox" name="k" value="' + x.key + '"' + (picked[x.key] ? ' checked' : '') + '>' +
          '<span class="t">' + esc((x.prog === 'sessions' ? x.cat + ' · ' : '') + x.title) + '</span>' +
          '<span class="m">' + x.day + ' ' + x.dow + ' ' + x.s + (x.speakers.length && x.prog !== 'sca' ? ' · ' + esc(x.speakers.map(function (s) { return s.name; }).join(', ')) : '') + '</span>' +
          cong(x.key) + '</label>';
      });
      html += '</div>';
    });
    html += '<p class="ed-note">' + T('실제 참석이 가능한 세션만 선택해 주십시오. ', 'Please select only the sessions you can actually attend. ') + MB_NOTE + T(' SCA 교육 All about Q는 별도 등록이 필요합니다.', ' SCA Education All about Q requires separate registration.') + '</p><p class="lk-err" id="lk-err"></p>' +
      '<div class="ed-bar"><button class="lk-btn ghost" id="ed-x">' + T('취소', 'Cancel') + '</button><button class="lk-btn" id="ed-ok">' + (sv.responded ? T('저장', 'Save') : T('응답 제출', 'Submit')) + '</button></div>';
    root.innerHTML = html;
    document.body.classList.add('editing');
    scrollTo(0, 0);
    document.getElementById('ed-x').onclick = function () { viewHome(); scrollTo(0, 0); };
    document.getElementById('ed-ok').onclick = function () {
      var q1 = (root.querySelector('input[name=q1]:checked') || {}).value || '미정';
      var keys = [].slice.call(root.querySelectorAll('input[name=k]:checked')).map(function (i) { return i.value; });
      busy('ed-ok', T('저장 중…', 'Saving…'));
      api({ action: 'save', name: cred.name, phone: cred.phone, email: cred.email, q1: q1, keys: keys }).then(function (res) {
        if (!res || !res.ok) { showErr(ERR[res && res.error] || T('저장하지 못했습니다. 잠시 후 다시 시도해 주십시오.', 'Could not save. Please try again shortly.')); var b = document.getElementById('ed-ok'); b.disabled = false; b.textContent = T('저장', 'Save'); return; }
        var wasNew = !data.survey.responded;
        data = res; save(); viewHome(wasNew ? T('수요조사 응답이 제출되었습니다.', 'Your survey response has been submitted.') : T('응답이 수정되었습니다.', 'Your response has been updated.')); scrollTo(0, 0);
      }, function () { showErr(T('연결에 실패했습니다. 잠시 후 다시 시도해 주십시오.', 'Connection failed. Please try again shortly.')); });
    };
  }

  // ---------- 목업 ----------
  var MB_ACCESS = ['F_Q1', 'F_S1', 'F_S2', 'F_S3', 'F_S4', 'F_S5', 'F_S6', 'F_S7', 'F_S8', 'F_S9', 'F_S10', 'F_S11', 'F_O1', 'F_O2', 'F_O6', 'F_O3', 'F_O4', 'F_O5', 'F_NAS', 'F_PAN', 'SCA_E1', 'SCA_E2', 'SCA_E3', 'SCA_CUP'];
  var mockCong = { F_Q1: 'full', F_S1: 'full', F_S2: 'full', F_S3: 'full', F_S4: 'near', F_S5: 'full', F_S6: 'ok', F_S7: 'ok', F_S8: 'full', F_S9: 'near', F_S10: 'full', F_S11: 'near',
    F_O1: 'ok', F_O2: 'full', F_O6: 'ok', F_O3: 'full', F_O4: 'full', F_O5: 'full', F_NAS: 'full', F_PAN: 'ok', SCA_AAQ: 'ok', SCA_E1: 'ok', SCA_E2: 'full', SCA_E3: 'full', SCA_CUP: 'ok' };
  var mockDb = {
    '01012345678': { person: { name: '김커피', contact: '010-****-5678', tickets: ['Master Blend Pass'], isMB: true }, access: MB_ACCESS,
      survey: { responded: true, q1: '참석', picks: ['F_Q1', 'F_S3', 'F_O2', 'F_NAS'], lastAt: '11.03 14:22', edited: false } },
    '01033334444': { person: { name: '박엠비', contact: '010-****-4444', tickets: ['Master Blend Pass (초청)'], isMB: true }, access: MB_ACCESS,
      survey: { responded: false, q1: '', picks: [], lastAt: '', edited: false } },
    '01044445555': { person: { name: '최구매', contact: '010-****-5555', tickets: ['Master Blend Pass'], isMB: true }, access: MB_ACCESS,
      survey: { responded: false, q1: '', picks: [], lastAt: '', edited: false } },
    '01022223333': { person: { name: '이단권', contact: '010-****-3333', tickets: ['The Sessions (목요일권)', 'Champion Live'], isMB: false },
      access: ['F_S3', 'F_S4', 'F_S5', 'F_NAS', 'F_PAN'], survey: null },
    '01055556666': { person: { name: '정스테', contact: '010-****-6666', tickets: ['The Stage (초청)'], isMB: false }, access: ['F_Q1'], survey: null },
    '01066667777': { person: { name: '한오리', contact: '010-****-7777', tickets: ['Origin Discovery · El Injerto (초청)'], isMB: false }, access: ['F_O2'], survey: null }
  };
  function mockApi(pl) {
    return new Promise(function (res) {
      setTimeout(function () {
        var key = digits(pl.phone) || Object.keys(mockDb).filter(function (k) { return pl.email && pl.email === 'test' + k.slice(-4) + '@example.com'; })[0];
        var u = mockDb[key];
        if (!u || u.person.name !== pl.name) return res({ ok: false, error: 'not_found' });
        if (pl.action === 'save') {
          u.survey.responded = true; u.survey.q1 = pl.q1; u.survey.edited = true; u.survey.lastAt = '11.06 21:30';
          u.survey.picks = (pl.q1 === '참석' ? ['F_Q1'] : []).concat(pl.keys);
        }
        res({ ok: true, asOf: '11.06 21:30', person: u.person, access: u.access, survey: u.survey, congestion: mockCong });
      }, 300);
    });
  }

  try { data = JSON.parse(sessionStorage.getItem('wcf_my') || 'null'); cred = JSON.parse(sessionStorage.getItem('wcf_cred') || 'null'); } catch (e) { data = null; }
  if (data && cred && data.access) viewHome(); else viewLogin();
})();
