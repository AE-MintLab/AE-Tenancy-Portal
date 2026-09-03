// Simple offline service worker for PWA support
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // Let network handle requests standardly
});
