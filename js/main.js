// =============================================
// cafe nora main.js
// =============================================

// navをbody直下に移動（header内のstacking contextから脱出させる）
const nav = document.getElementById('nav');
if (nav) document.body.appendChild(nav);

// バックドロップを動的生成
const backdrop = document.createElement('div');
backdrop.className = 'nav-backdrop';
document.body.appendChild(backdrop);

// ハンバーガーメニュー
const menuBtn = document.getElementById('menuBtn');

function openMenu() {
  nav.classList.add('open');
  backdrop.classList.add('open');
  menuBtn.classList.add('active');
  menuBtn.setAttribute('aria-label', 'メニューを閉じる');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  nav.classList.remove('open');
  backdrop.classList.remove('open');
  menuBtn.classList.remove('active');
  menuBtn.setAttribute('aria-label', 'メニューを開く');
  document.body.style.overflow = '';
}

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });
  backdrop.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

// スクロールでヘッダーにshadow追加
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// スクロールアニメーション
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );
  fadeEls.forEach((el) => observer.observe(el));
} else {
  fadeEls.forEach((el) => el.classList.add('visible'));
}


// cafenora.jp アクセス計測ビーコン
(function(){
  var p = encodeURIComponent(location.pathname + location.search);
  fetch('https://noratool.pythonanywhere.com/pv?p=' + p).catch(function(){});
})();
