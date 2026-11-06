/* 내 신청 조회 · 수정
   - 이름 + 휴대전화 전체(또는 해외 응답자는 이메일)로 조회
   - 결과: 신청 세션별 상태(확정 / 부분 확정 / 대기)
   - 수정: Apps Script로 POST → 통합관리시트 「수정 응답」 탭에 한 줄 추가 */
(function () {
  var CFG = window.WCF_CONFIG || {};
  var root = document.getElementById('planner');
  if (!root) return;
  var MOCK = !CFG.API_URL || /[?&]mock=1/.test(location.search);

  // 세션 목록 (집계 키 = 통합관리시트 F_○○ / SCA_○○)
  var CATALOG = [
    { q: 'Q1', title: 'The Stage', room: '4F 401호', items: [
      { k: 'F_Q1', t: 'The Stage 참석', d: '11.12 목 10:30–16:30' } ] },
    { q: 'Q2', title: 'The Sessions', room: '3F 301호', items: [
      { k: 'F_S1', t: '세션 1 · 발효의 변조', s: '송호석', d: '11.11 수 13:00' },
      { k: 'F_S2', t: '세션 2 · 실전 브루잉의 기준', s: '차미경', d: '11.11 수 15:30' },
      { k: 'F_S3', t: '세션 3 · 공학적 로스팅', s: '이준선', d: '11.12 목 10:30' },
      { k: 'F_S4', t: '세션 4 · 도덕과 규범', s: '이규범·홍순인', d: '11.12 목 13:00' },
      { k: 'F_S5', t: '세션 5 · 매력적인 에스프레소', s: '권혁수', d: '11.12 목 15:30' },
      { k: 'F_S6', t: '세션 6 · 커피의 개인화', s: 'Gilad Bechor', d: '11.13 금 10:00' },
      { k: 'F_S7', t: '세션 7 · 데이터의 힘', s: 'Vasilis Apostolopoulos', d: '11.13 금 11:30' },
      { k: 'F_S8', t: '세션 8 · 커피 바 동선 설계', s: '김의성', d: '11.13 금 13:00' },
      { k: 'F_S9', t: '세션 9 · 2027 커피 트렌드', s: '홍준기', d: '11.13 금 15:30' },
      { k: 'F_S10', t: '세션 10 · 바리스타의 새로운 역할', s: '임정환', d: '11.14 토 10:30' },
      { k: 'F_S11', t: '세션 11 · 시간을 사는 법', s: '홍찬호', d: '11.14 토 13:00' } ] },
    { q: 'Q3', title: 'Origin Discovery', room: '3F 300호', items: [
      { k: 'F_O1', t: 'Coffee Board of India', d: '11.11 수 10:30' },
      { k: 'F_O2', t: 'El Injerto', d: '11.11 수 13:30' },
      { k: 'F_O6', t: 'Guatemala Anacafé', d: '11.11 수 16:00' },
      { k: 'F_O3', t: 'IWCA', d: '11.12 목 10:30' },
      { k: 'F_O4', t: 'Café de Honduras', d: '11.12 목 13:30' },
      { k: 'F_O5', t: 'Coffee Board of India', d: '11.12 목 16:00' } ] },
    { q: 'Q4', title: 'Champion Live', room: '3F 318호', items: [
      { k: 'F_NAS', t: 'Nas Jaafar', s: '2026 월드브루어스컵 챔피언', d: '11.14 토 10:30' },
      { k: 'F_PAN', t: 'Pan Wei', s: '2026 월드바리스타챔피언십 챔피언', d: '11.14 토 13:30' } ] },
    { q: 'Q5', title: 'SCA Education', room: '3F 317호', note: 'MB 무료 초청자만 신청 가능', items: [
      { k: 'SCA_E1', t: 'One Day Coffee Explorer 1회차', d: '11.12 목 10:00' },
      { k: 'SCA_E2', t: 'One Day Coffee Explorer 2회차', d: '11.12 목 13:00' },
      { k: 'SCA_E3', t: 'One Day Coffee Explorer 3회차', d: '11.12 목 16:00' },
      { k: 'SCA_CUP', t: 'Intro to Cupping', d: '11.14 토 10:00' } ] }
  ];
  var BY_KEY = {};
  CATALOG.forEach(function (g) { g.items.forEach(function (it) { it.g = g; BY_KEY[it.k] = it; }); });

  var STATE_L = { ok: '확정', part: '부분 확정', wait: '대기', none: '-' };
  var CAP_L = { ok: '여유', near: '마감 임박', full: '마감' };
  var Q1_L = ['참석', '미정', '불참'];

  var cred = null;   // 마지막 조회 입력값
  var data = null;   // 마지막 조회 결과

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function digits(s) { return String(s || '').replace(/\D/g, ''); }
  function fmtPhone(v) { var d = digits(v).slice(0, 11); return d.length < 4 ? d : d.length < 8 ? d.slice(0, 3) + '-' + d.slice(3) : d.slice(0, 3) + '-' + d.slice(3, 7) + '-' + d.slice(7); }

  // ---------- API ----------
  function api(payload) {
    if (MOCK) return mockApi(payload);
    if (payload.action === 'lookup') {
      var q = Object.keys(payload).map(function (k) { return k + '=' + encodeURIComponent(payload[k] || ''); }).join('&');
      return fetch(CFG.API_URL + '?' + q).then(function (r) { return r.json(); });
    }
    // text/plain 으로 보내면 CORS preflight 없이 Apps Script에 도달한다
    return fetch(CFG.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); });
  }

  // ---------- 화면: 조회 폼 ----------
  function viewForm(err) {
    var c = cred || {};
    root.innerHTML =
      (MOCK ? '<p class="mock-note">테스트 모드 · 예시 데이터입니다. 이름 「김커피」, 번호 010-1234-5678로 조회해 보세요.</p>' : '') +
      '<form class="lk-form" id="lkf" novalidate>' +
      '<div class="fld"><label for="lk-n">이름</label><input id="lk-n" autocomplete="name" placeholder="수요조사에 입력한 이름" value="' + esc(c.name) + '"></div>' +
      '<div class="fld"><label for="lk-p">휴대전화</label><input id="lk-p" inputmode="numeric" autocomplete="tel" placeholder="010-0000-0000" value="' + esc(c.phone) + '"></div>' +
      '<div class="fld"><label for="lk-e">이메일<small>해외 번호로 응답한 경우</small></label><input id="lk-e" type="email" autocomplete="email" placeholder="name@example.com" value="' + esc(c.email) + '"></div>' +
      '<p class="lk-err" id="lk-err">' + esc(err || '') + '</p>' +
      '<button class="lk-btn" id="lk-go">조회하기</button>' +
      '<p class="lk-hint">' + esc(CFG.UPDATED_NOTE) + '</p></form>';
    var p = document.getElementById('lk-p');
    p.addEventListener('input', function () { p.value = fmtPhone(p.value); });
    document.getElementById('lkf').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('lk-n').value.trim();
      var phone = digits(p.value), email = document.getElementById('lk-e').value.trim();
      if (!name) return showErr('이름을 입력해 주세요.');
      if (phone.length < 10 && !email) return showErr('휴대전화 번호 전체를 입력해 주세요. 해외 번호는 이메일로 조회할 수 있어요.');
      cred = { name: name, phone: phone, email: email };
      busy('lk-go', '조회 중…');
      api({ action: 'lookup', name: name, phone: phone, email: email }).then(onResult, netErr);
    });
  }
  function showErr(m) { var el = document.getElementById('lk-err'); if (el) el.textContent = m; }
  function busy(id, label) { var b = document.getElementById(id); if (b) { b.disabled = true; b.textContent = label; } }
  function netErr() { viewForm('연결에 실패했어요. 잠시 후 다시 시도해 주세요.'); }

  var ERR = {
    not_found: '일치하는 응답을 찾지 못했어요. 수요조사에 입력한 이름과 번호를 확인해 주세요. 응답 직후라면 최대 30분 뒤에 다시 조회해 주세요.',
    locked: '조회 시도가 많아 잠시 막아 두었어요. 10분 뒤에 다시 시도해 주세요.',
    multiple: '같은 정보로 응답이 여러 건 있어요. 이메일을 함께 입력해 주세요.',
    bad_request: '입력값을 확인해 주세요.'
  };
  function onResult(res) {
    if (!res || !res.ok) return viewForm(ERR[res && res.error] || '조회 중 문제가 생겼어요.');
    data = res; viewResult();
  }

  // ---------- 화면: 결과 ----------
  function viewResult(msg) {
    document.body.classList.remove('editing');
    var p = data.person, rows = '';
    var mine = data.sessions || [];
    CATALOG.forEach(function (g) {
      g.items.forEach(function (it) {
        var s = mine.filter(function (x) { return x.key === it.k; })[0];
        if (!s) return;
        var label = STATE_L[s.state] || '-';
        if (s.state === 'part' && s.n) label += ' (' + s.n + '명)';
        if (s.state === 'wait' && s.rank) label += ' ' + s.rank + '번';
        rows += '<li><span class="t">' + esc(it.t) + '</span><span class="m">' + esc(it.d) + ' · ' + esc(g.room) + '</span><span class="st ' + esc(s.state) + '">' + esc(label) + '</span></li>';
      });
    });
    var q1 = p.q1 && p.q1 !== '참석' ? '<li><span class="t">The Stage</span><span class="m">' + esc(p.q1) + '</span><span class="st none">' + esc(p.q1) + '</span></li>' : '';
    root.innerHTML =
      (MOCK ? '<p class="mock-note">테스트 모드 · 예시 데이터입니다.</p>' : '') +
      (msg ? '<p class="mock-note" style="color:var(--gd);background:#F1F6EA">' + esc(msg) + '</p>' : '') +
      '<div class="me"><b>' + esc(p.name) + ' 님</b><small>' + esc(p.contact) + ' · ' + esc(p.group) + '</small></div>' +
      (rows || q1 ? '<ul class="rs">' + rows + q1 + '</ul>' : '<p class="lk-hint" style="padding:18px 0">신청한 세션이 없어요. 아래 「신청 수정」에서 추가할 수 있어요.</p>') +
      '<p class="lk-meta">' + (p.editedAt ? '마지막 수정 ' + esc(p.editedAt) + ' · ' : '') + '마지막 응답 ' + esc(p.lastAt) + ' · ' + esc(data.asOf) + ' 기준</p>' +
      '<p class="ed-note">「대기」는 정원보다 신청이 많을 때의 순서예요. 유료 구매자가 먼저 배정되고, 무료 초청은 응답 순서대로 배정됩니다. 당일 불참이 많아 현장에서 입장할 수 있는 경우가 많아요.</p>' +
      '<div class="lk-row"><button class="lk-link" id="lk-back">다른 이름으로 조회</button>' +
      (p.editable ? '<button class="lk-btn" id="lk-edit" style="margin:0;padding:11px 20px">신청 수정</button>' : '') + '</div>';
    document.getElementById('lk-back').onclick = function () { data = null; viewForm(); };
    var eb = document.getElementById('lk-edit'); if (eb) eb.onclick = viewEdit;
  }

  // ---------- 화면: 수정 ----------
  function viewEdit() {
    var p = data.person, cap = data.capacity || {};
    var picked = {}; (data.sessions || []).forEach(function (s) { picked[s.key] = 1; });
    var html = '<div class="me"><b>신청 수정</b><small>' + esc(p.name) + ' 님</small></div>';
    html += '<div class="ed-grp"><h4>The Stage<small>11.12 목 · 4F 401호</small></h4>';
    Q1_L.forEach(function (v) {
      html += '<label class="opt"><input type="radio" name="q1" value="' + v + '"' + ((p.q1 || '미정') === v ? ' checked' : '') + '><span class="t">' + v + '</span><span class="m"></span>' +
        (v === '참석' && cap.F_Q1 ? '<span class="cap c-' + cap.F_Q1 + '">' + CAP_L[cap.F_Q1] + '</span>' : '') + '</label>';
    });
    html += '</div>';
    CATALOG.forEach(function (g) {
      if (g.q === 'Q1') return;
      if (g.q === 'Q5' && !p.canSca) return;
      html += '<div class="ed-grp"><h4>' + esc(g.title) + '<small>' + esc(g.room) + (g.note ? ' · ' + esc(g.note) : '') + '</small></h4>';
      g.items.forEach(function (it) {
        var c = cap[it.k];
        html += '<label class="opt"><input type="checkbox" name="k" value="' + it.k + '"' + (picked[it.k] ? ' checked' : '') + '>' +
          '<span class="t">' + esc(it.t) + '</span><span class="m">' + esc(it.d) + (it.s ? ' · ' + esc(it.s) : '') + '</span>' +
          (c ? '<span class="cap c-' + c + '">' + CAP_L[c] + '</span>' : '') + '</label>';
      });
      html += '</div>';
    });
    html += '<p class="ed-note">원래 신청한 세션은 처음 응답한 순서를 그대로 유지해요. 새로 추가한 세션만 수정 시각 기준으로 순서가 정해집니다. 「마감」 세션도 신청은 가능하며 대기로 표시됩니다.</p>' +
      '<p class="lk-err" id="lk-err"></p>' +
      '<div class="ed-bar"><button class="lk-btn ghost" id="ed-x">취소</button><button class="lk-btn" id="ed-ok">저장</button></div>';
    root.innerHTML = html;
    document.body.classList.add('editing');
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('ed-x').onclick = function () { viewResult(); };
    document.getElementById('ed-ok').onclick = function () {
      var q1 = (root.querySelector('input[name=q1]:checked') || {}).value || '미정';
      var keys = [].slice.call(root.querySelectorAll('input[name=k]:checked')).map(function (i) { return i.value; });
      busy('ed-ok', '저장 중…');
      api({ action: 'update', name: cred.name, phone: cred.phone, email: cred.email, q1: q1, keys: keys })
        .then(function (res) {
          if (!res || !res.ok) { showErr(ERR[res && res.error] || '저장하지 못했어요. 잠시 후 다시 시도해 주세요.'); var b = document.getElementById('ed-ok'); b.disabled = false; b.textContent = '저장'; return; }
          data = res; viewResult('저장했어요. 바뀐 내용으로 다시 계산한 결과예요.');
          root.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, function () { showErr('연결에 실패했어요. 잠시 후 다시 시도해 주세요.'); });
    };
  }

  // ---------- 목업 ----------
  var mockDb = {
    person: { name: '김커피', contact: '010-****-5678', group: '월간커피 구독자', q1: '참석', lastAt: '11.03 14:22', editedAt: '', editable: true, canSca: true },
    keys: ['F_Q1', 'F_S3', 'F_O2', 'F_NAS']
  };
  var mockCap = { F_Q1: 'full', F_S1: 'full', F_S2: 'full', F_S3: 'full', F_S4: 'near', F_S5: 'full', F_S6: 'ok', F_S7: 'ok', F_S8: 'full', F_S9: 'near', F_S10: 'full', F_S11: 'near',
    F_O1: 'ok', F_O2: 'full', F_O6: 'ok', F_O3: 'full', F_O4: 'full', F_O5: 'full', F_NAS: 'full', F_PAN: 'ok', SCA_E1: 'ok', SCA_E2: 'full', SCA_E3: 'full', SCA_CUP: 'ok' };
  var mockState = { F_Q1: 'ok', F_S3: 'ok', F_O2: 'part', F_NAS: 'wait' };
  function mockApi(pl) {
    return new Promise(function (res) {
      setTimeout(function () {
        if (pl.name !== mockDb.person.name || (digits(pl.phone) !== '01012345678' && pl.email !== 'test@example.com')) return res({ ok: false, error: 'not_found' });
        if (pl.action === 'update') {
          mockDb.keys = pl.keys.slice(); mockDb.person.q1 = pl.q1;
          if (pl.q1 === '참석' && mockDb.keys.indexOf('F_Q1') < 0) mockDb.keys.unshift('F_Q1');
          if (pl.q1 !== '참석') mockDb.keys = mockDb.keys.filter(function (k) { return k !== 'F_Q1'; });
          mockDb.person.editedAt = '11.06 21:00';
        }
        res({ ok: true, person: mockDb.person, capacity: mockCap, asOf: '11.06 21:00',
          sessions: mockDb.keys.map(function (k) { return { key: k, state: mockState[k] || (mockCap[k] === 'full' ? 'wait' : 'ok'), n: k === 'F_O2' ? 1 : 0 }; }) });
      }, 350);
    });
  }

  viewForm();
})();
