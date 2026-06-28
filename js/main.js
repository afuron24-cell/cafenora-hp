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


// ページ共有ボタン（全ページ共通・footer-copyの上に自動挿入）
(function(){
  var style = document.createElement('style');
  style.textContent = [
    '.share-bar{text-align:center;padding:1.6rem 1rem 1rem;border-top:1px solid rgba(255,255,255,.1);}',
    '.share-bar p{font-size:.72rem;letter-spacing:.12em;color:rgba(255,255,255,.45);margin-bottom:.8rem;}',
    '.share-copy-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.55rem 1.4rem;',
    'border-radius:30px;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.07);',
    'color:rgba(255,255,255,.75);font-size:.8rem;letter-spacing:.1em;cursor:pointer;',
    'transition:background .2s,border-color .2s,color .2s;font-family:inherit;}',
    '.share-copy-btn:hover{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.55);color:#fff;}',
    '.share-copy-btn.copied{background:rgba(80,180,100,.2);border-color:rgba(80,180,100,.6);color:#8fda9f;}',
  ].join('');
  document.head.appendChild(style);

  var fc = document.querySelector('.footer-copy');
  if(!fc) return;

  var bar = document.createElement('div');
  bar.className = 'share-bar';
  bar.innerHTML = '<p>このページをシェア</p>'
    + '<button class="share-copy-btn" id="shareCopyBtn">🔗 URLをコピー</button>';
  fc.parentNode.insertBefore(bar, fc);

  document.getElementById('shareCopyBtn').addEventListener('click', function(){
    var btn = this;
    var url = location.href;
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(url).then(done).catch(fallback);
    } else { fallback(); }
    function done(){
      btn.textContent = '✓ コピーしました';
      btn.classList.add('copied');
      setTimeout(function(){ btn.textContent = '🔗 URLをコピー'; btn.classList.remove('copied'); }, 2000);
    }
    function fallback(){
      var ta = document.createElement('textarea');
      ta.value = url; ta.style.position='fixed'; ta.style.opacity='0';
      document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy'); done(); }catch(e){}
      document.body.removeChild(ta);
    }
  });
})();
// cafenora.jp アクセス計測ビーコン
(function(){
  var p = encodeURIComponent(location.pathname + location.search);
  var pwa = window.matchMedia('(display-mode: standalone)').matches ? '&pwa=1' : '';
  fetch('https://noratool.pythonanywhere.com/pv?p=' + p + pwa).catch(function(){});
})();
