// v5 - no caching, always network
const CACHES_TO_DELETE = ['dancing-cup-v1','dancing-cup-v2','dancing-cup-v3','dancing-cup-v4'];
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => clients.claim())
  );
});
self.addEventListener('fetch', e => {
  // Always go to network, no caching
  e.respondWith(fetch(e.request));
});
