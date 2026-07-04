// Service worker mínimo — necessário para o navegador oferecer
// a opção de "Instalar aplicativo" / "Adicionar à tela de início".
const CACHE_NAME = 'familia-volei-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

// Estratégia simples: tenta a rede primeiro, cai para o cache se offline.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((resp) => {
        const respClone = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, respClone));
        return resp;
      })
      .catch(() => caches.match(event.request))
  );
});
