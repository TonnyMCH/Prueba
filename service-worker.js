const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png'
];

// Instalar el Service Worker y almacenar archivos en caché.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activar el Service Worker y limpiar cachés antiguas.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      )
    )
  );
});

// Interceptar las solicitudes y responder desde la caché.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
