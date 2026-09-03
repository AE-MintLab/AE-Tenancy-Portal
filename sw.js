const CACHE_NAME = 'ae-tenancy-portal-v1';

const APP_FILES = [
    './',
    './index.html',
    './manifest.json',
    './logo.png'
];

self.addEventListener('install', (event) => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then((cache) => {
                return cache.addAll(APP_FILES);
            })

            .then(() => {
                return self.skipWaiting();
            })

    );

});


self.addEventListener('activate', (event) => {

    event.waitUntil(

        caches.keys()

            .then((cacheNames) => {

                return Promise.all(

                    cacheNames

                        .filter(
                            (name) => name !== CACHE_NAME
                        )

                        .map(
                            (name) => caches.delete(name)
                        )

                );

            })

            .then(() => {

                return self.clients.claim();

            })

    );

});


self.addEventListener('fetch', (event) => {

    event.respondWith(

        fetch(event.request)

            .catch(() => {

                return caches.match(event.request);

            })

    );

});
