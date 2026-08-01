const CACHE = 'dancing-cup-v3';
const KEEP = ['dancing-cup-v3'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/'])));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => !KEEP.includes(k)).map(k => caches.delete(k))
    )).then(() => clients.claim())
  );
});
self.addEventListener('fetch', e => {
  // Don't cache — always fetch fresh
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
