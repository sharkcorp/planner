const CACHE = 'planner-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Не кэшируем Supabase запросы
  if (e.request.url.includes('supabase.co')) return;
  
  // Для навигации всегда отдаём index.html
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch('/planner/index.html'));
    return;
  }
  
  // Остальное — из сети
  e.respondWith(fetch(e.request));
});
