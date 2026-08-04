const LOCKED = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>The Dancing Cup</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#3D1A6E;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.card{background:#FAF6F0;border-radius:16px;padding:40px 28px;text-align:center;max-width:320px;width:100%}
h1{font-size:1.3rem;font-weight:700;color:#2D1155;margin-bottom:10px}
p{font-size:.85rem;color:#9070A0;line-height:1.6}
</style>
</head>
<body>
<div class="card">
  <h1>Coming Soon</h1>
  <p>This app is currently being set up. Please check back soon.</p>
</div>
</body>
</html>`;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if(e.request.mode === 'navigate'){
    e.respondWith(new Response(LOCKED, {headers:{'Content-Type':'text/html'}}));
    return;
  }
  e.respondWith(fetch(e.request).catch(() => new Response('', {status:404})));
});
