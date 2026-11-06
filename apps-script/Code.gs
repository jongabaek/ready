/**
 * 월드커피포럼 쇼가이드 · 내 신청 조회/수정 API
 * 통합관리시트에 바인딩해서 웹 앱으로 배포한다.
 *   확장 프로그램 → Apps Script → 이 코드 붙여 넣기 → 배포 → 새 배포 → 웹 앱
 *   실행 사용자: 나 / 액세스 권한: 모든 사용자
 *
 * - 조회(GET ?action=lookup): 이름 + 휴대전화(숫자) 또는 이메일이 일치하는 본인 응답만 돌려준다.
 * - 수정(POST, text/plain JSON {action:'update'}): 「수정 응답」 탭에 한 줄 추가한다.
 *   원본 응답 시트와 통합 탭은 건드리지 않는다.
 */

var CFG = {
  DATA_SHEET: '(참고) MB수요조사_통합', // 통합 응답 탭 (수식)
  DATA_HEADER_ROW: 3,
  STATUS_SHEET: '세션 현황',
  EDIT_SHEET: '수정 응답',
  SHOW_WAIT_RANK: false,      // true면 「대기 N번」 숫자를 보여 준다
  YEAR: 2026,
  TZ: 'Asia/Seoul',
  MAX_FAIL: 5,                // 같은 이름으로 연속 실패 허용 횟수
  LOCK_SEC: 600
};

// 수정 응답에 기록할 선택지 문구. 통합 탭의 키워드 매칭(세션 N / 제목·연사 / 오리진 이름·시간)에 걸리도록 원래 폼 표기를 따른다.
var LABEL = {
  F_S1: '11/11(수) 13:00 - 15:00 세션 1 : 커피의 가공과정 중 발효의 변조(송호석)',
  F_S2: '11/11(수) 15:30 - 17:30 세션 2 : 추출변수로 만드는 실전 브루잉의 기준(차미경)',
  F_S3: '11/12(목) 10:30 - 12:30 세션 3 : 맛있는 커피를 만드는 공학적 로스팅 접근법(이준선)',
  F_S4: '11/12(목) 13:00 - 15:00 세션 4 : 도덕과 규범(이규범·홍순인)',
  F_S5: '11/12(목) 15:30 - 17:30 세션 5 : 어떤 원두든, 매력적인 에스프레소로(권혁수)',
  F_S6: '11/13(금) 10:00 - 11:00 세션 6 : 커피의 개인화 시대, 그 뒤에 숨은 기술(Gilad Bechor)',
  F_S7: '11/13(금) 11:30 - 12:30 세션 7 : 데이터의 힘(Vasilis Apostolopoulos)',
  F_S8: '11/13(금) 13:00 - 15:00 세션 8 : 커피 바 동선 설계(김의성)',
  F_S9: '11/13(금) 15:30 - 17:30 세션 9 : 2027 커피 트렌드(홍준기)',
  F_S10: '11/14(토) 10:30 - 12:30 바리스타의 새로운 역할(에어리커피 임정환)',
  F_S11: '11/14(토) 13:00 - 15:00 시간을 사는 법(RoasteryFlow 홍찬호)',
  F_O1: '11/11(수) 10:30 - 12:30 Coffee Board of India',
  F_O2: '11/11(수) 13:30 - 15:30 El Injerto',
  F_O6: '11/11(수) 16:00 - 18:00 Guatemala Anacafé',
  F_O3: '11/12(목) 10:30 - 12:30 IWCA',
  F_O4: '11/12(목) 13:30 - 15:30 Café de Honduras',
  F_O5: '11/12(목) 16:00 - 18:00 Coffee Board of India',
  F_NAS: '11/14(토) 10:30 - 12:30 Nas Jaafar (2026 월드브루어스컵 챔피언)',
  F_PAN: '11/14(토) 13:30 - 15:30 Pan Wei (2026 월드바리스타챔피언십 챔피언)',
  SCA_E1: '11/12(목) 10:00 One Day Coffee Explorer (1회차)',
  SCA_E2: '11/12(목) 13:00 One Day Coffee Explorer (2회차)',
  SCA_E3: '11/12(목) 16:00 One Day Coffee Explorer (3회차)',
  SCA_CUP: '11/14(토) 10:00 Intro to Cupping'
};
var Q_OF = function (k) {
  if (k === 'F_Q1') return 'Q1';
  if (/^F_S/.test(k)) return 'Q2';
  if (/^F_O/.test(k)) return 'Q3';
  if (k === 'F_NAS' || k === 'F_PAN') return 'Q4';
  return 'Q5';
};
var Q1_TEXT = { '참석': '참석', '미정': '아직 결정하지 않음', '불참': '참석하지 않음' };
var EDIT_HEADER = ['응답 시각', '구분', '방문자 성함', '동반 1인', '참고 (예매자·팀)', '소속 / 직함', '휴대전화', '이메일',
  'Q1 원문', 'Q2 원문', 'Q3 원문', 'Q4 원문', 'Q5 SCA 교육 원문', '의견', '세션 키', '최초 응답 시각', '수정 경로'];

// ---------------------------------------------------------------- entry
function doGet(e) {
  var p = (e && e.parameter) || {};
  try {
    if (p.action === 'lookup') return out(lookup_(p));
    return out({ ok: true, service: 'wcf-planner' });
  } catch (err) { return out({ ok: false, error: 'server', detail: String(err) }); }
}

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (body.action === 'update') return out(update_(body));
    if (body.action === 'lookup') return out(lookup_(body));
    return out({ ok: false, error: 'bad_request' });
  } catch (err) { return out({ ok: false, error: 'server', detail: String(err) }); }
}

function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

// ---------------------------------------------------------------- lookup
function lookup_(p) {
  var name = normName_(p.name), phone = normPhone_(p.phone), email = String(p.email || '').trim().toLowerCase();
  if (!name || (phone.length < 10 && !email)) return { ok: false, error: 'bad_request' };
  var cache = CacheService.getScriptCache(), fk = 'fail:' + name;
  var fails = +(cache.get(fk) || 0);
  if (fails >= CFG.MAX_FAIL) return { ok: false, error: 'locked' };

  var model = load_();
  var me = findPerson_(model, name, phone, email);
  if (!me) { cache.put(fk, String(fails + 1), CFG.LOCK_SEC); return { ok: false, error: 'not_found' }; }
  cache.remove(fk);
  return result_(model, me);
}

function findPerson_(model, name, phone, email) {
  var hits = model.people.filter(function (pp) {
    if (pp.nameN !== name) return false;
    if (phone.length >= 10 && pp.phoneN === phone) return true;
    return !!email && pp.emailN === email;
  });
  if (!hits.length) return null;
  // 여러 폼에 응답한 경우 가장 최근에 응답·수정한 쪽을 보여 준다
  hits.sort(function (a, b) { return b.lastTs - a.lastTs; });
  return hits[0];
}

function result_(model, me) {
  var sessions = [];
  Object.keys(me.keys).forEach(function (k) {
    var st = model.standing[k] && model.standing[k][me.id];
    var s = { key: k, state: st ? st.state : 'none' };
    if (st && st.state === 'part') s.n = st.n;
    if (st && st.state === 'wait' && CFG.SHOW_WAIT_RANK) s.rank = st.rank;
    sessions.push(s);
  });
  return {
    ok: true,
    asOf: fmt_(new Date()),
    person: {
      name: me.name,
      contact: me.phoneN ? maskPhone_(me.phoneN) : maskEmail_(me.emailN),
      group: me.group,
      q1: me.q1,
      lastAt: fmt_(new Date(me.rowTs)),
      editedAt: me.editTs ? fmt_(new Date(me.editTs)) : '',
      editable: true,
      canSca: me.group !== 'MB 구매자'
    },
    sessions: sessions,
    capacity: model.capState
  };
}

// ---------------------------------------------------------------- update
function update_(b) {
  var name = normName_(b.name), phone = normPhone_(b.phone), email = String(b.email || '').trim().toLowerCase();
  if (!name || (phone.length < 10 && !email)) return { ok: false, error: 'bad_request' };
  var q1 = Q1_TEXT[b.q1] ? b.q1 : '미정';
  var keys = (b.keys || []).filter(function (k) { return LABEL[k]; });

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var model = load_();
    var me = findPerson_(model, name, phone, email);
    if (!me) return { ok: false, error: 'not_found' };
    if (me.group === 'MB 구매자') keys = keys.filter(function (k) { return Q_OF(k) !== 'Q5'; });

    var byQ = { Q2: [], Q3: [], Q4: [], Q5: [] };
    keys.forEach(function (k) { byQ[Q_OF(k)].push(LABEL[k]); });
    var allKeys = (q1 === '참석' ? ['F_Q1'] : []).concat(keys);
    var r = me.row; // 마지막 유효 응답 행 (원래 표기 그대로 복사해야 중복 규칙에 걸린다)
    var sh = editSheet_();
    sh.appendRow([
      new Date(), me.group, r.name, r.comp, r.ref, r.org, r.phone, r.email,
      Q1_TEXT[q1],
      byQ.Q2.join(', ') || '선택 안 함',
      byQ.Q3.join(', ') || '선택 안 함',
      byQ.Q4.join(', ') || '선택 안 함',
      me.group === 'MB 구매자' ? '' : (byQ.Q5.join(', ') || '선택 안 함'),
      '(모바일 쇼가이드에서 수정)',
      allKeys.join(','),
      new Date(me.firstTs),
      'web'
    ]);
    SpreadsheetApp.flush();
    var fresh = load_();
    var me2 = findPerson_(fresh, name, phone, email);
    return result_(fresh, me2);
  } finally { lock.releaseLock(); }
}

function editSheet_() {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(CFG.EDIT_SHEET);
  if (!sh) {
    sh = ss.insertSheet(CFG.EDIT_SHEET);
    sh.getRange(1, 1, 1, EDIT_HEADER.length).setValues([EDIT_HEADER]).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('MM/dd HH:mm');
    sh.getRange('P:P').setNumberFormat('MM/dd HH:mm');
  }
  return sh;
}

// ---------------------------------------------------------------- model
function load_() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(CFG.DATA_SHEET);
  var vals = sh.getDataRange().getDisplayValues();
  var head = vals[CFG.DATA_HEADER_ROW - 1];
  var col = function (label) { return head.indexOf(label); };
  var C = {
    group: col('구분'), time: col('응답 시각'), name: col('방문자 성함'), comp: col('동반 1인'), ref: col('참고 (예매자·팀)'),
    org: col('소속 / 직함'), phone: col('휴대전화'), email: col('이메일'), ppl: col('인원 (동반 포함)'), inc: col('집계 포함'), q1: col('Q1 더 스테이지')
  };
  var flagCols = {};
  head.forEach(function (h, i) { var k = keyOfHeader_(h); if (k) flagCols[k] = i; });

  // 1) 사람별로 응답 행 묶기
  var map = {};
  for (var r = CFG.DATA_HEADER_ROW; r < vals.length; r++) {
    var v = vals[r];
    if (!v[C.group] || !v[C.name]) continue;
    var row = {
      group: v[C.group], name: v[C.name], comp: v[C.comp], ref: v[C.ref], org: v[C.org], phone: v[C.phone], email: v[C.email],
      ppl: +v[C.ppl] || 1, inc: String(v[C.inc]).charAt(0) === 'Y', q1raw: v[C.q1], ts: parseTs_(v[C.time]), keys: {}
    };
    Object.keys(flagCols).forEach(function (k) { if (String(v[flagCols[k]]) === '1') row.keys[k] = 1; });
    var id = row.group + '|' + normName_(row.name) + '|' + (normPhone_(row.phone) || String(row.email).toLowerCase());
    (map[id] = map[id] || []).push(row);
  }

  // 2) 수정 응답 탭 덧씌우기
  var edits = {};
  var esh = ss.getSheetByName(CFG.EDIT_SHEET);
  if (esh && esh.getLastRow() > 1) {
    esh.getRange(2, 1, esh.getLastRow() - 1, EDIT_HEADER.length).getValues().forEach(function (e) {
      if (!e[1] || !e[2]) return;
      var id = e[1] + '|' + normName_(e[2]) + '|' + (normPhone_(e[6]) || String(e[7]).toLowerCase());
      var ts = e[0] instanceof Date ? e[0].getTime() : 0;
      var keys = {}; String(e[14] || '').split(',').forEach(function (k) { if (k) keys[k] = 1; });
      var q1 = e[8] === '참석' ? '참석' : e[8] === '참석하지 않음' ? '불참' : '미정';
      (edits[id] = edits[id] || []).push({ ts: ts, keys: keys, q1: q1 });
    });
  }

  var people = [];
  Object.keys(map).forEach(function (id) {
    var rows = map[id].sort(function (a, b) { return a.ts - b.ts; });
    var eff = rows.filter(function (x) { return x.inc; }).pop() || rows[rows.length - 1];
    var hist = rows.map(function (x) { return { ts: x.ts, keys: x.keys }; });
    var person = {
      id: id, group: eff.group, name: eff.name, nameN: normName_(eff.name), phoneN: normPhone_(eff.phone), emailN: String(eff.email || '').trim().toLowerCase(),
      ppl: eff.ppl, row: eff, rowTs: eff.ts, firstTs: rows[0].ts, keys: eff.keys, q1: q1Of_(eff.q1raw), editTs: 0, lastTs: eff.ts
    };
    var ed = (edits[id] || []).sort(function (a, b) { return a.ts - b.ts; });
    ed.forEach(function (x) { hist.push({ ts: x.ts, keys: x.keys }); });
    var lastEd = ed[ed.length - 1];
    if (lastEd && lastEd.ts > eff.ts) { person.keys = lastEd.keys; person.q1 = lastEd.q1; person.editTs = lastEd.ts; person.lastTs = lastEd.ts; }
    // 세션별 줄 서는 시각 = 그 세션을 처음 선택한 시각 (수정해도 원래 세션 순번 유지)
    person.since = {};
    hist.sort(function (a, b) { return a.ts - b.ts; }).forEach(function (h) {
      Object.keys(h.keys).forEach(function (k) { if (!(k in person.since)) person.since[k] = h.ts; });
    });
    people.push(person);
  });

  // 3) 정원·우선 배정 인원
  var st = ss.getSheetByName(CFG.STATUS_SHEET).getDataRange().getDisplayValues();
  var cap = {}, capState = {};
  st.forEach(function (row) {
    var k = row[21]; // V열 (집계 키)
    if (!k || !/^(F_|SCA_)/.test(k)) return;
    var n = function (x) { return +String(x).replace(/[^\d.-]/g, '') || 0; };
    cap[k] = { cap: n(row[3]), pre: n(row[5]) + n(row[14]) + n(row[15]), has: String(row[3]).trim() !== '' };
    var u = String(row[20]);
    capState[k] = u.indexOf('임박') > -1 ? 'near' : (u.indexOf('마감') > -1 || u.indexOf('초과') > -1) ? 'full' : 'ok';
  });

  // 4) 세션별 배정 (② 유료 MB → ③ 무료 초청, 각 그룹 안에서는 세션 선택 시각 순)
  var standing = {};
  Object.keys(cap).forEach(function (k) {
    var c = cap[k], list = people.filter(function (pp) { return pp.keys[k]; });
    if (/^SCA_/.test(k)) list = list.filter(function (pp) { return pp.group !== 'MB 구매자'; });
    list.sort(function (a, b) {
      var pa = a.group === 'MB 구매자' ? 2 : 3, pb = b.group === 'MB 구매자' ? 2 : 3;
      return pa - pb || (a.since[k] || 0) - (b.since[k] || 0);
    });
    var avail = c.cap - c.pre, cum = 0, w = 0, m = standing[k] = {};
    list.forEach(function (pp) {
      if (!c.has) { m[pp.id] = { state: 'none' }; return; }
      var before = cum; cum += pp.ppl;
      if (cum <= avail) m[pp.id] = { state: 'ok' };
      else if (before < avail) m[pp.id] = { state: 'part', n: avail - before };
      else m[pp.id] = { state: 'wait', rank: ++w };
    });
  });

  return { people: people, standing: standing, capState: capState };
}

// ---------------------------------------------------------------- helpers
function keyOfHeader_(h) {
  h = String(h);
  if (h === 'Q1 더 스테이지 참석') return 'F_Q1';
  var m = h.match(/^Q2 세션 (\d+)\s*\|/); if (m) return 'F_S' + m[1];
  if (/^Q3 /.test(h)) {
    if (h.indexOf('미정') > -1) return null;
    if (h.indexOf('Coffee Board of India') > -1) return h.indexOf('11/11') > -1 ? 'F_O1' : 'F_O5';
    if (h.indexOf('El Injerto') > -1) return 'F_O2';
    if (h.indexOf('Guatemala') > -1) return 'F_O6';
    if (h.indexOf('IWCA') > -1) return 'F_O3';
    if (h.indexOf('Honduras') > -1) return 'F_O4';
  }
  if (/^Q4 /.test(h)) { if (h.indexOf('Nas') > -1) return 'F_NAS'; if (h.indexOf('Pan Wei') > -1) return 'F_PAN'; }
  if (/^Q5 /.test(h)) {
    if (h.indexOf('1회차') > -1) return 'SCA_E1';
    if (h.indexOf('2회차') > -1) return 'SCA_E2';
    if (h.indexOf('3회차') > -1) return 'SCA_E3';
    if (h.indexOf('Cupping') > -1) return 'SCA_CUP';
  }
  return null;
}
function q1Of_(s) { s = String(s); return s.indexOf('참석하지') > -1 || s === '불참' ? '불참' : s.indexOf('참석') > -1 ? '참석' : '미정'; }
function normName_(s) { return String(s || '').replace(/\s+/g, '').toLowerCase(); }
function normPhone_(s) {
  var d = String(s || '').replace(/\D/g, '');
  if (/^82(10\d{8})$/.test(d)) d = '0' + d.slice(2);
  if (/^10\d{8}$/.test(d)) d = '0' + d;
  return d;
}
function parseTs_(s) {
  var m = String(s).match(/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{2})/);
  return m ? new Date(CFG.YEAR, +m[1] - 1, +m[2], +m[3], +m[4]).getTime() : 0;
}
function fmt_(d) { return Utilities.formatDate(d, CFG.TZ, 'MM.dd HH:mm'); }
function maskPhone_(d) { return d.length >= 10 ? d.slice(0, 3) + '-****-' + d.slice(-4) : '****'; }
function maskEmail_(e) { var i = e.indexOf('@'); return i > 1 ? e.charAt(0) + '***' + e.slice(i) : e; }

// 편집기에서 실행해 보는 테스트: 로그에 첫 응답자의 조회 결과가 찍힌다
function testLookup() {
  var m = load_(), p = m.people[0];
  Logger.log(JSON.stringify(result_(m, p), null, 1));
}
