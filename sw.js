const CACHE_NAME = 'cafenora-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/cafe.html',
  '/events.html',
  '/access.html',
  '/contact.html',
  '/css/style.css',
  '/images/hero.jpg',
  '/images/icon-192.png',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // ナビゲーションリクエスト: ネット優先、失敗時キャッシュ
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request) || caches.match('/index.html'))
    );
    return;
  }
  // その他: キャッシュ優先
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
