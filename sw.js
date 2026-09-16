const CACHE_VERSION = 'ark-os-v42-core-6';
const CORE_ASSETS = [
  './',
  './index.html',
  './index.css?v=42-core-6',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './public/images/harbour-exchange.png',
  './public/images/harbour-interface.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await Promise.allSettled(CORE_ASSETS.map(asset => cache.add(asset)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, {cache: 'no-cache'});
        if (response.ok) {
          const cache = await caches.open(CACHE_VERSION);
          cache.put(request, response.clone()).catch(() => {});
        }
        return response;
      } catch (error) {
        return (await caches.match(request)) || (await caches.match('./index.html')) || (await caches.match('./'));
      }
    })());
    return;
  }

  if (url.pathname.endsWith('/index.css') || url.pathname.endsWith('/manifest.webmanifest')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, {cache: 'no-cache'});
        if (response.ok) {
          const cache = await caches.open(CACHE_VERSION);
          cache.put(request, response.clone()).catch(() => {});
        }
        return response;
      } catch (error) {
        return (await caches.match(request)) || new Response('', {status: 504, statusText: 'Offline'});
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    const network = fetch(request).then(response => {
      if (response && response.ok) {
        caches.open(CACHE_VERSION).then(cache => cache.put(request, response.clone())).catch(() => {});
      }
      return response;
    }).catch(() => null);
    return cached || (await network) || new Response('', {status: 504, statusText: 'Offline'});
  })());
});
