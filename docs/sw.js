const CACHE='one-step-b7cf9e7003c6';
const PRECACHE=["/sample-mobile-pwa/","/sample-mobile-pwa/assets/index-BEiEQCIL.css","/sample-mobile-pwa/assets/index-CSM9fa1K.js","/sample-mobile-pwa/assets/p-BBsseItU-CkH9fcX7.js","/sample-mobile-pwa/assets/p-BWbz71uB-D7UWfsPJ.js","/sample-mobile-pwa/assets/p-CRb2xRCz-BSda-frt.js","/sample-mobile-pwa/assets/p-D7-vHX0A-COmTaSwt.js","/sample-mobile-pwa/assets/p-DaojW_d_-DHnX9VbL.js","/sample-mobile-pwa/assets/p-Ds5vN3iu-B0GWHNFN.js","/sample-mobile-pwa/assets/p-D_U0pDe5-DFW9Lqk9.js","/sample-mobile-pwa/icons/icon-192.png","/sample-mobile-pwa/icons/icon-512.png","/sample-mobile-pwa/index.html","/sample-mobile-pwa/manifest.webmanifest","/sample-mobile-pwa/mark.svg"];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(PRECACHE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('one-step-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith('/sample-mobile-pwa/')||url.pathname.startsWith('/sample-mobile-pwa/rn/')||url.pathname.startsWith('/sample-mobile-pwa/flutter/'))return;
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).catch(()=>event.request.mode==='navigate'?caches.match('/sample-mobile-pwa/'):Response.error())));
});
