const CACHE='__CACHE__';
const PRECACHE=/* precache */ [];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(PRECACHE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('one-step-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith('/sample-mobile-pwa/')||url.pathname.startsWith('/sample-mobile-pwa/rn/')||url.pathname.startsWith('/sample-mobile-pwa/flutter/'))return;
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).catch(()=>event.request.mode==='navigate'?caches.match('/sample-mobile-pwa/'):Response.error())));
});
