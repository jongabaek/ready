/**
 * 월드커피포럼 쇼가이드 · 세션 플래너 API
 * 통합관리시트에 바인딩해서 웹 앱으로 배포한다.
 *   확장 프로그램 → Apps Script → 이 코드 붙여 넣기 → 배포 → 새 배포 → 웹 앱
 *   실행 사용자: 나 / 액세스 권한: 모든 사용자
 *
 * 로그인: 이름 + 휴대전화(숫자) 또는 이메일
 *   본인 확인 출처 → ① 「티켓 명단」 탭(유료 구매자, 권종 포함)  ② 「초청 MB 명단」 탭  ③ 「초청 단권 명단」 탭  ④ 수요조사 응답자(모두 MB 소지자)
 * 권한:
 *   MB(유료·초청) → All About Q를 뺀 전 세션 참관 가능, 수요조사 조회·수정·신규 응답 가능
 *   단권          → 「권종 관리」 탭 매핑에 1 표시된 세션만 참관 가능, 수요조사 없음
 *   단권 초청     → 「초청 단권 명단」의 초청 권종(권종명 또는 집계 키) 세션만 참관 가능, 표시는 「○○ (초청)」
 * 혼잡도: 「세션 현황」 탭 상태(여유 / 마감 임박 / 마감·초과) → ok / near / full
 * 수정·신규 응답: 「수정 응답」 탭에 한 줄 추가 (원본·통합 탭은 건드리지 않음)
 */

var CFG = {
  SURVEY_SHEET: '(참고) MB수요조사_통합',
  SURVEY_HEADER_ROW: 3,
  STATUS_SHEET: '세션 현황',
  TICKET_MAP_SHEET: '권종 관리',
  TICKET_SHEET: '티켓 명단',          // 유료 구매자 명단 (없으면 자동 생성, 예약자 정보 받으면 채움)
  INVITE_MB_SHEET: '초청 MB 명단',
  INVITE_SINGLE_SHEET: '초청 단권 명단', // 더 스테이지·오리진 참가사 초청 등 (없으면 자동 생성)
  EDIT_SHEET: '수정 응답',
  MB_TICKET: 'Master Blend Pass',
  MB_EXCLUDE: ['SCA_AAQ'],
  YEAR: 2026,
  TZ: 'Asia/Seoul',
  MAX_FAIL: 5,
  LOCK_SEC: 600
};

// 수정 응답에 기록할 선택지 문구. 통합 탭의 키워드 매칭에 걸리도록 원래 폼 표기를 따른다.
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
var ALL_KEYS = ['F_Q1', 'F_S1', 'F_S2', 'F_S3', 'F_S4', 'F_S5', 'F_S6', 'F_S7', 'F_S8', 'F_S9', 'F_S10', 'F_S11',
  'F_O1', 'F_O2', 'F_O6', 'F_O3', 'F_O4', 'F_O5', 'F_NAS', 'F_PAN', 'SCA_AAQ', 'SCA_E1', 'SCA_E2', 'SCA_E3', 'SCA_CUP'];
function qOf_(k) {
  if (k === 'F_Q1') return 'Q1';
  if (/^F_S/.test(k)) return 'Q2';
  if (/^F_O/.test(k)) return 'Q3';
  if (k === 'F_NAS' || k === 'F_PAN') return 'Q4';
  return 'Q5';
}
var Q1_TEXT = { '참석': '참석', '미정': '아직 결정하지 않음', '불참': '참석하지 않음' };
var EDIT_HEADER = ['응답 시각', '구분', '방문자 성함', '동반 1인', '참고 (예매자·팀)', '소속 / 직함', '휴대전화', '이메일',
  'Q1 원문', 'Q2 원문', 'Q3 원문', 'Q4 원문', 'Q5 SCA 교육 원문', '의견', '세션 키', '최초 응답 시각', '수정 경로'];
var TICKET_HEADER = ['채널', '권종', '이름', '휴대전화', '이메일', '예매번호', '비고'];
// 초청 권종: 「권종 관리」의 권종명(예: The Stage, Origin Discovery 11/11) 또는 집계 키(예: F_O2 = El Injerto 세션만)
var INVITE_SINGLE_HEADER = ['초청처', '초청 권종', '표시 이름', '이름', '휴대전화', '이메일', '비고'];

// ---------------------------------------------------------------- entry
function doGet(e) {
  var p = (e && e.parameter) || {};
  try {
    if (p.action === 'login') return out(login_(p));
    return out({ ok: true, service: 'wcf-planner' });
  } catch (err) { return out({ ok: false, error: 'server', detail: String(err) }); }
}
function doPost(e) {
  try {
    var b = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (b.action === 'save') return out(save_(b));
    if (b.action === 'login') return out(login_(b));
    return out({ ok: false, error: 'bad_request' });
  } catch (err) { return out({ ok: false, error: 'server', detail: String(err) }); }
}
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

// ---------------------------------------------------------------- login
function creds_(p) {
  return { name: normName_(p.name), phone: normPhone_(p.phone), email: String(p.email || '').trim().toLowerCase() };
}
function login_(p) {
  var c = creds_(p);
  if (!c.name || (c.phone.length < 10 && !c.email)) return { ok: false, error: 'bad_request' };
  var cache = CacheService.getScriptCache(), fk = 'fail:' + c.name, fails = +(cache.get(fk) || 0);
  if (fails >= CFG.MAX_FAIL) return { ok: false, error: 'locked' };
  var m = load_(), me = identify_(m, c);
  if (!me) { cache.put(fk, String(fails + 1), CFG.LOCK_SEC); return { ok: false, error: 'not_found' }; }
  cache.remove(fk);
  return view_(m, me);
}

function match_(c, nameN, phoneN, emailN) {
  if (nameN !== c.name) return false;
  if (c.phone.length >= 10 && phoneN === c.phone) return true;
  return !!c.email && emailN === c.email;
}

// 세 출처를 합쳐 한 사람의 티켓·수요조사 상태를 만든다
function identify_(m, c) {
  var tickets = [], src = null;
  m.ticketRows.forEach(function (t) { if (match_(c, t.nameN, t.phoneN, t.emailN)) { tickets.push(t.ticket); src = src || t; } });
  var invited = m.inviteRows.filter(function (t) { return match_(c, t.nameN, t.phoneN, t.emailN); })[0];
  var singleInv = m.singleInviteRows.filter(function (t) { return match_(c, t.nameN, t.phoneN, t.emailN); });
  var surveys = m.people.filter(function (pp) { return match_(c, pp.nameN, pp.phoneN, pp.emailN); })
    .sort(function (a, b) { return b.lastTs - a.lastTs; });
  var sv = surveys[0] || null;
  var paidMB = tickets.some(function (t) { return sameTicket_(t, CFG.MB_TICKET); });
  var isMB = paidMB || !!invited || !!sv;
  if (!tickets.length && !isMB && !singleInv.length) return null;
  if (isMB && !paidMB) tickets.unshift(CFG.MB_TICKET + (invited || (sv && sv.group !== 'MB 구매자') ? ' (초청)' : ''));

  var access = {};
  if (isMB) ALL_KEYS.forEach(function (k) { if (CFG.MB_EXCLUDE.indexOf(k) < 0) access[k] = 1; });
  tickets.forEach(function (t) { (m.ticketMap[normTicket_(t)] || []).forEach(function (k) { access[k] = 1; }); });
  // 단권 초청: 권종명이면 권종 매핑, 집계 키(F_○○/SCA_○○)면 그 세션만
  singleInv.forEach(function (t) {
    var keys = /^(F_|SCA_)/.test(t.grant) ? t.grant.split(/[,\s]+/) : (m.ticketMap[normTicket_(t.grant)] || []);
    keys.forEach(function (k) { if (k) access[k] = 1; });
    var lab = (t.label || t.grant) + ' (초청)';
    if (!isMB && tickets.indexOf(lab) < 0) tickets.push(lab);
  });

  var who = src || invited || singleInv[0];
  var base = sv ? sv.row : { name: who.name, phone: who.phone, email: who.email, comp: '', ref: '', org: '' };
  return {
    name: base.name, phoneN: normPhone_(base.phone), emailN: String(base.email || '').toLowerCase(),
    tickets: tickets, isMB: isMB, access: access, survey: sv,
    group: sv ? sv.group : (paidMB ? 'MB 구매자' : invited ? '초청장(MB)' : tickets.length && !singleInv.length ? '단권' : '단권 초청'), base: base
  };
}

function view_(m, me) {
  var sv = me.survey;
  return {
    ok: true,
    asOf: fmt_(new Date()),
    person: {
      name: me.name,
      contact: me.phoneN ? maskPhone_(me.phoneN) : maskEmail_(me.emailN),
      tickets: me.tickets,
      isMB: me.isMB
    },
    access: Object.keys(me.access),
    survey: me.isMB ? {
      responded: !!sv,
      q1: sv ? sv.q1 : '',
      picks: sv ? Object.keys(sv.keys).filter(function (k) { return me.access[k]; }) : [],
      lastAt: sv ? fmt_(new Date(sv.lastTs)) : '',
      edited: !!(sv && sv.editTs)
    } : null,
    congestion: m.cong
  };
}

// ---------------------------------------------------------------- save (MB 수요조사 수정·신규)
function save_(b) {
  var c = creds_(b);
  if (!c.name || (c.phone.length < 10 && !c.email)) return { ok: false, error: 'bad_request' };
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var m = load_(), me = identify_(m, c);
    if (!me) return { ok: false, error: 'not_found' };
    if (!me.isMB) return { ok: false, error: 'no_survey' };
    var q1 = Q1_TEXT[b.q1] ? b.q1 : '미정';
    var keys = (b.keys || []).filter(function (k) { return LABEL[k] && me.access[k]; });
    var byQ = { Q2: [], Q3: [], Q4: [], Q5: [] };
    keys.forEach(function (k) { byQ[qOf_(k)].push(LABEL[k]); });
    var r = me.base; // 원래 응답 표기를 그대로 써야 「구분+성함+휴대전화」 중복 규칙에 걸린다
    editSheet_().appendRow([
      new Date(), me.group, r.name, r.comp || '', r.ref || '', r.org || '', r.phone || '', r.email || '',
      Q1_TEXT[q1],
      byQ.Q2.join(', ') || '선택 안 함', byQ.Q3.join(', ') || '선택 안 함', byQ.Q4.join(', ') || '선택 안 함',
      byQ.Q5.join(', ') || '선택 안 함',
      me.survey ? '(세션 플래너에서 수정)' : '(세션 플래너에서 신규 응답)',
      (q1 === '참석' ? ['F_Q1'] : []).concat(keys).join(','),
      me.survey ? new Date(me.survey.firstTs) : new Date(),
      'web'
    ]);
    SpreadsheetApp.flush();
    var m2 = load_();
    return view_(m2, identify_(m2, c));
  } finally { lock.releaseLock(); }
}

function sheet_(name, header) {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}
function editSheet_() {
  var sh = sheet_(CFG.EDIT_SHEET, EDIT_HEADER);
  sh.getRange('A:A').setNumberFormat('MM/dd HH:mm');
  sh.getRange('P:P').setNumberFormat('MM/dd HH:mm');
  return sh;
}

// ---------------------------------------------------------------- model
function load_() {
  var ss = SpreadsheetApp.getActive();

  // 1) 수요조사 응답자 (통합 탭) — 사람별로 묶고 집계 포함(Y) 행을 유효 응답으로
  var vals = ss.getSheetByName(CFG.SURVEY_SHEET).getDataRange().getDisplayValues();
  var head = vals[CFG.SURVEY_HEADER_ROW - 1], col = function (l) { return head.indexOf(l); };
  var C = { group: col('구분'), time: col('응답 시각'), name: col('방문자 성함'), comp: col('동반 1인'), ref: col('참고 (예매자·팀)'),
    org: col('소속 / 직함'), phone: col('휴대전화'), email: col('이메일'), inc: col('집계 포함'), q1: col('Q1 더 스테이지') };
  var flagCols = {};
  head.forEach(function (h, i) { var k = keyOfHeader_(h); if (k) flagCols[k] = i; });
  var map = {};
  function idOf(g, n, ph, em) { return g + '|' + normName_(n) + '|' + (normPhone_(ph) || String(em || '').toLowerCase()); }
  for (var r = CFG.SURVEY_HEADER_ROW; r < vals.length; r++) {
    var v = vals[r];
    if (!v[C.group] || !v[C.name]) continue;
    var row = { group: v[C.group], name: v[C.name], comp: v[C.comp], ref: v[C.ref], org: v[C.org], phone: v[C.phone], email: v[C.email],
      inc: String(v[C.inc]).charAt(0) === 'Y', q1: q1Of_(v[C.q1]), ts: parseTs_(v[C.time]), keys: {} };
    Object.keys(flagCols).forEach(function (k) { if (String(v[flagCols[k]]) === '1') row.keys[k] = 1; });
    (map[idOf(row.group, row.name, row.phone, row.email)] = map[idOf(row.group, row.name, row.phone, row.email)] || []).push(row);
  }

  // 2) 수정 응답 탭 덧씌우기 (세션 플래너에서 처음 응답한 사람도 여기서 생긴다)
  var esh = ss.getSheetByName(CFG.EDIT_SHEET);
  var edits = {};
  if (esh && esh.getLastRow() > 1) {
    esh.getRange(2, 1, esh.getLastRow() - 1, EDIT_HEADER.length).getValues().forEach(function (e) {
      if (!e[1] || !e[2]) return;
      var keys = {}; String(e[14] || '').split(',').forEach(function (k) { if (k) keys[k] = 1; });
      (edits[idOf(e[1], e[2], e[6], e[7])] = edits[idOf(e[1], e[2], e[6], e[7])] || []).push({
        ts: e[0] instanceof Date ? e[0].getTime() : 0, keys: keys,
        q1: e[8] === '참석' ? '참석' : e[8] === '참석하지 않음' ? '불참' : '미정',
        row: { group: e[1], name: e[2], comp: e[3], ref: e[4], org: e[5], phone: String(e[6]), email: e[7] }
      });
    });
  }
  var people = [];
  Object.keys(map).concat(Object.keys(edits).filter(function (id) { return !map[id]; })).forEach(function (id) {
    var rows = (map[id] || []).sort(function (a, b) { return a.ts - b.ts; });
    var ed = (edits[id] || []).sort(function (a, b) { return a.ts - b.ts; });
    var eff = rows.filter(function (x) { return x.inc; }).pop() || rows[rows.length - 1];
    var lastEd = ed[ed.length - 1];
    var p = eff ? { row: eff, keys: eff.keys, q1: eff.q1, lastTs: eff.ts, firstTs: rows[0].ts, editTs: 0 }
      : { row: lastEd.row, keys: lastEd.keys, q1: lastEd.q1, lastTs: lastEd.ts, firstTs: ed[0].ts, editTs: lastEd.ts };
    if (eff && lastEd && lastEd.ts > eff.ts) { p.keys = lastEd.keys; p.q1 = lastEd.q1; p.lastTs = lastEd.ts; p.editTs = lastEd.ts; }
    p.group = p.row.group; p.nameN = normName_(p.row.name); p.phoneN = normPhone_(p.row.phone);
    p.emailN = String(p.row.email || '').trim().toLowerCase();
    people.push(p);
  });

  // 3) 티켓 명단 (유료 구매자)
  var tsh = sheet_(CFG.TICKET_SHEET, TICKET_HEADER), ticketRows = [];
  if (tsh.getLastRow() > 1) {
    tsh.getRange(2, 1, tsh.getLastRow() - 1, TICKET_HEADER.length).getDisplayValues().forEach(function (t) {
      if (!t[1] || !t[2]) return;
      ticketRows.push({ ticket: t[1], name: t[2], phone: t[3], email: t[4], nameN: normName_(t[2]), phoneN: normPhone_(t[3]), emailN: String(t[4]).trim().toLowerCase() });
    });
  }

  // 4) 초청 MB 명단 (헤더 4행: 순번·성함·영문 성함·소속·직책·연락처·이메일…)
  var inviteRows = [], ish = ss.getSheetByName(CFG.INVITE_MB_SHEET);
  if (ish) {
    var iv = ish.getDataRange().getDisplayValues(), ih = iv[3] || [];
    var iN = ih.indexOf('성함'), iP = ih.indexOf('연락처'), iE = ih.indexOf('이메일');
    iv.slice(4).forEach(function (t) {
      if (!t[iN]) return;
      inviteRows.push({ name: t[iN], phone: t[iP], email: t[iE], nameN: normName_(t[iN]), phoneN: normPhone_(t[iP]), emailN: String(t[iE]).trim().toLowerCase() });
    });
  }

  // 4-2) 초청 단권 명단 (더 스테이지·오리진 참가사 초청)
  var ssh = sheet_(CFG.INVITE_SINGLE_SHEET, INVITE_SINGLE_HEADER), singleInviteRows = [];
  if (ssh.getLastRow() > 1) {
    ssh.getRange(2, 1, ssh.getLastRow() - 1, INVITE_SINGLE_HEADER.length).getDisplayValues().forEach(function (t) {
      if (!t[1] || !t[3]) return;
      singleInviteRows.push({ org: t[0], grant: String(t[1]).trim(), label: String(t[2]).trim(), name: t[3], phone: t[4], email: t[5],
        nameN: normName_(t[3]), phoneN: normPhone_(t[4]), emailN: String(t[5]).trim().toLowerCase() });
    });
  }

  // 5) 권종 → 세션 매핑 (권종 관리: 4행 집계 키, 5행부터 권종)
  var tv = ss.getSheetByName(CFG.TICKET_MAP_SHEET).getDataRange().getDisplayValues(), keyRow = tv[3], ticketMap = {};
  tv.slice(4).forEach(function (t) {
    if (!t[0]) return;
    var ks = [];
    keyRow.forEach(function (k, i) { if (/^(F_|SCA_)/.test(k) && String(t[i]) === '1') ks.push(k); });
    ticketMap[normTicket_(t[0])] = ks;
  });

  // 6) 혼잡도 (세션 현황 U열 상태, V열 집계 키)
  var cong = {};
  ss.getSheetByName(CFG.STATUS_SHEET).getDataRange().getDisplayValues().forEach(function (row) {
    var k = row[21]; if (!k || !/^(F_|SCA_)/.test(k)) return;
    var u = String(row[20]);
    cong[k] = u.indexOf('임박') > -1 ? 'near' : (u.indexOf('마감') > -1 || u.indexOf('초과') > -1) ? 'full' : 'ok';
  });

  return { people: people, ticketRows: ticketRows, inviteRows: inviteRows, singleInviteRows: singleInviteRows, ticketMap: ticketMap, cong: cong };
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
function normTicket_(s) { return String(s || '').replace(/\s+/g, '').toLowerCase(); }
function sameTicket_(a, b) { return normTicket_(a) === normTicket_(b); }
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

// 편집기에서 실행: 첫 응답자로 로그인했을 때의 결과를 로그로 확인
function testLogin() {
  var m = load_(), p = m.people[0];
  Logger.log(JSON.stringify(login_({ name: p.row.name, phone: p.row.phone, email: p.row.email }), null, 1));
}
