const v='lsv2';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request)));
