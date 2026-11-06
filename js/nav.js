/* 공통 상단 바 + 왼쪽 메뉴(드로어)
   <body data-base="">       → 홈(index.html)에서는 앵커로 이동
   <body data-base="index.html"> → 다른 페이지에서는 홈의 앵커로 이동 */
(function () {
  var base = document.body.getAttribute('data-base') || '';
  var here = location.pathname.split('/').pop() || 'index.html';
  var MENU = [
    ['', '홈', '#home'],
    ['my', '세션 플래너 조회 · 수정', 'planner.html'],
    ['', '한눈에 보는 일정', '#glance'],
    ['h', '프로그램'],
    ['', 'The Stage', 'session.html?prog=stage'],
    ['', 'The Sessions', 'session.html?prog=sessions'],
    ['', 'Origin Discovery', 'session.html?prog=origin'],
    ['', 'SCA Education', 'session.html?prog=sca'],
    ['', 'Champion Live', 'session.html?prog=champion'],
    ['', 'Coffee Futures Challenge', '#futures'],
    ['', "Asia-Pacific's 100 Best Coffee Shops GALA", '#gala'],
    ['h', '안내'],
    ['', '장소 · 문의', '#venue']
  ];
  function href(h) { return h.charAt(0) === '#' ? base + h : h; }

  var items = MENU.map(function (m) {
    if (m[0] === 'h') return '<li class="dr-h">' + m[1] + '</li>';
    var cur = (m[2] === here || (here.indexOf('session.html') === 0 && location.search && m[2].indexOf(location.search) > -1)) ? ' aria-current="page"' : '';
    return '<li><a href="' + href(m[2]) + '"' + cur + (m[0] === 'my' ? ' class="dr-my"' : '') + '>' + m[1] + '</a></li>';
  }).join('');

  var wrap = document.querySelector('.wrap') || document.body;
  var bar = document.createElement('header');
  bar.className = 'topbar';
  bar.innerHTML =
    '<button class="hb" id="hb" aria-label="메뉴 열기" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>' +
    '<a class="tb-logo" href="' + (base || '#top') + '"><img src="assets/wcf-logo.png" alt="제15회 월드커피포럼" width="170" height="27"></a>' +
    '<a class="tb-lang" href="en/">EN</a>';
  wrap.insertBefore(bar, wrap.firstChild);

  var dr = document.createElement('div');
  dr.className = 'drawer'; dr.id = 'drawer'; dr.setAttribute('aria-hidden', 'true');
  dr.innerHTML = '<div class="scrim" data-close></div><nav class="dr-panel" aria-label="전체 메뉴">' +
    '<div class="dr-top"><span>15th World Coffee Forum</span><button class="dr-x" data-close aria-label="메뉴 닫기">×</button></div>' +
    '<ul>' + items + '</ul><p class="dr-foot">2026.11.11 – 14 · 코엑스 컨퍼런스룸 3, 4층</p></nav>';
  document.body.appendChild(dr);

  var hb = document.getElementById('hb');
  function open(v) {
    document.body.classList.toggle('dr-open', v);
    dr.setAttribute('aria-hidden', String(!v));
    hb.setAttribute('aria-expanded', String(v));
  }
  hb.addEventListener('click', function () { open(true); });
  dr.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) return open(false);
    if (e.target.closest('a')) open(false);   // 이동하면서 닫기
  });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') open(false); });
})();
