/* Service Worker mínimo de Nica English Club.
   Hace la app instalable sin guardar nada en caché: todo sigue viniendo de internet,
   así NECLUB, Firebase y el login siempre muestran datos actualizados. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => { /* sin respondWith: el navegador resuelve la petición normalmente */ });
