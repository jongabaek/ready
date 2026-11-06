/* 탭·클릭하면 ☕ 이 톡 튀어 오르고, 드래그·스크롤하면 손가락을 따라 작은 ☕ 이 남는다 */
(function () {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var EMO = '☕️', live = 0, MAX = 40;
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

  function spawn(x, y, cls) {
    if (live >= MAX) return;
    var e = document.createElement('span');
    e.className = 'cfx ' + cls; e.textContent = EMO; e.setAttribute('aria-hidden', 'true');
    e.style.left = x + 'px'; e.style.top = y + 'px';
    e.style.setProperty('--r', (Math.random() * 30 - 15).toFixed(0) + 'deg');
    e.style.setProperty('--dx', (Math.random() * 30 - 15).toFixed(0) + 'px');
    document.body.appendChild(e); live++;
    e.addEventListener('animationend', function () { e.remove(); live--; });
  }

  var down = false, lx = 0, ly = 0, lt = 0;
  addEventListener('pointerdown', function (ev) { down = true; lx = ev.clientX; ly = ev.clientY; spawn(ev.clientX, ev.clientY, 'pop'); }, { passive: true });
  addEventListener('pointerup', function () { down = false; }, { passive: true });
  addEventListener('pointercancel', function () { down = false; }, { passive: true });
  function trail(x, y) {
    var now = Date.now(), dx = x - lx, dy = y - ly;
    if (now - lt < 45 || dx * dx + dy * dy < 28 * 28) return;
    lt = now; lx = x; ly = y; spawn(x, y, 'tr');
  }
  addEventListener('pointermove', function (ev) { if (down && ev.pointerType === 'mouse') trail(ev.clientX, ev.clientY); }, { passive: true });
  // 모바일: 스크롤 중에는 pointer 이벤트가 끊기므로 touchmove로 따라간다
  addEventListener('touchmove', function (ev) { var t = ev.touches[0]; if (t) trail(t.clientX, t.clientY); }, { passive: true });
})();
