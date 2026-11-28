// 늘 새 판을 먼저 받고, 통신이 안 되면 마지막으로 본 판을 보여 준다.
const C = 'panjeong-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request, {cache: 'no-store'}).then(r => {
    const c = r.clone(); caches.open(C).then(x => x.put(e.request, c)); return r;
  }).catch(() => caches.match(e.request)));
});
