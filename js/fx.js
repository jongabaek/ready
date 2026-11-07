/* 모바일: 탭·클릭하면 ☕ 이 톡 튀어 오르고, 드래그·스크롤하면 손가락을 따라 작은 ☕ 이 남는다 */
(function () {
  // PC(마우스): 커서 자체를 ☕ 로, 이모지가 지정된 항목을 누르면 커서가 그 이모지로 바뀐다
  var DESK = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  var cst;
  function cur(emo) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><text x="1" y="26" font-size="26">' + emo + '</text></svg>';
    var u = 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '") 6 4';
    if (!cst) { cst = document.createElement('style'); document.head.appendChild(cst); }
    cst.textContent = 'html,html *{cursor:' + u + ',auto!important}' +
      'html input:not([type=button]):not([type=submit]):not([type=checkbox]):not([type=radio]),html textarea{cursor:text!important}';
  }
  if (DESK) { cur('☕️'); addEventListener('pageshow', function () { cur('☕️'); }); }
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches && !DESK) return;
  var EMO = '☕️', live = 0, MAX = 40, ct;
  var st = document.createElement('style');
  st.textContent =
    '.cfx{position:fixed;left:0;top:0;pointer-events:none;z-index:9999;line-height:1;user-select:none;will-change:transform,opacity}' +
    '.cfx.pop{font-size:26px;animation:cfxPop .8s cubic-bezier(.2,.7,.3,1) forwards}' +
    '.cfx.tr{font-size:15px;animation:cfxTr .7s ease-out forwards}' +
    '@keyframes cfxPop{0%{transform:translate(-50%,-50%) scale(.3) rotate(var(--r));opacity:0}' +
    '25%{transform:translate(-50%,-90%) scale(1.15) rotate(var(--r));opacity:1}' +
    '100%{transform:translate(calc(-50% + var(--dx)),-260%) scale(.9) rotate(calc(var(--r) * -1));opacity:0}}' +
    '@keyframes cfxTr{0%{transform:translate(-50%,-50%) scale(.6);opacity:.9}100%{transform:translate(-50%,-140%) scale(.4);opacity:0}}';
  document.head.appendChild(st);

  // 프로그램 링크는 프로그램별 이모지
  var PROG = { stage: '🎤', champion: '🏆', origin: '🌐', sessions: '🔎', session: '🔎', sca: '📚', futures: '🚀' };
  function progOf(el) {
    if (el && el.closest && el.closest('.vt button[data-v="tt"], .tabs button')) return '📅';
    var a = el && el.closest && el.closest('a[href]'); if (!a) return null;
    var h = a.getAttribute('href');
    if (/[?&]id=stage-pair\b/.test(h)) return '🍭';
    if (/[?&]id=stage-dj\b/.test(h)) return '🎧';
    if (/[?&]id=gala-1\b/.test(h)) return '💯';
    if (/[?&]partner=kewleaves\b/.test(h)) return '🫖';
    var m = h.match(/[?&]prog=([a-z]+)/) || h.match(/[?&]id=([a-z]+)-/);
    return m && PROG[m[1]] ? PROG[m[1]] : null;
  }
  function spawn(x, y, cls, emo) {
    if (live >= MAX) return;
    var e = document.createElement('span');
    e.className = 'cfx ' + cls; e.textContent = emo || EMO; e.setAttribute('aria-hidden', 'true');
    e.style.left = x + 'px'; e.style.top = y + 'px';
    e.style.setProperty('--r', (Math.random() * 30 - 15).toFixed(0) + 'deg');
    e.style.setProperty('--dx', (Math.random() * 30 - 15).toFixed(0) + 'px');
    document.body.appendChild(e); live++;
    e.addEventListener('animationend', function () { e.remove(); live--; });
  }

  var down = false, lx = 0, ly = 0, lt = 0;
  addEventListener('pointerdown', function (ev) {
    down = true; lx = ev.clientX; ly = ev.clientY;
    var pe = progOf(ev.target);
    if (DESK) {
      if (ev.pointerType !== 'mouse') return;
      clearTimeout(ct);
      if (pe) { cur(pe); ct = setTimeout(function () { cur('☕️'); }, 1600); }
      return;
    }
    spawn(ev.clientX, ev.clientY, 'pop', pe);
  }, { passive: true });
  // 프로그램 링크는 이모지가 보이도록 잠깐 기다렸다가 이동
  addEventListener('click', function (ev) {
    if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    var a = ev.target.closest && ev.target.closest('a[href]');
    if (!a || a.target === '_blank' || !progOf(a)) return;
    ev.preventDefault(); var href = a.href;
    setTimeout(function () { location.href = href; }, 320);
  });
  addEventListener('pointerup', function () { down = false; }, { passive: true });
  addEventListener('pointercancel', function () { down = false; }, { passive: true });
  var HOME = document.body.classList.contains('home-page');
  function trail(x, y) {
    if (!HOME || DESK) return; // 드래그·스크롤 커피는 모바일 홈 화면에서만
    var now = Date.now(), dx = x - lx, dy = y - ly;
    if (now - lt < 80 || dx * dx + dy * dy < 40 * 40) return;
    lt = now; lx = x; ly = y; spawn(x, y, 'tr');
  }
  addEventListener('pointermove', function (ev) { if (down && ev.pointerType === 'mouse') trail(ev.clientX, ev.clientY); }, { passive: true });
  // 모바일: 스크롤 중에는 pointer 이벤트가 끊기므로 touchmove로 따라간다
  addEventListener('touchmove', function (ev) { var t = ev.touches[0]; if (t) trail(t.clientX, t.clientY); }, { passive: true });
})();
