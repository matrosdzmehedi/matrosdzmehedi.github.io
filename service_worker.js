const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    'main.js'
]



self.addEventListener('install', e => {
    console.log('installed');

    e.waitUntil(caches.open(cacheName)
        .then(cache => {
            console.log('caching file');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    console.log('Activated');
    e.waitUntil(
        caches.keys().then(cacheName => {
            return Promise.all(
                cacheName.map(cache => {
                    if (cache !== cacheName) {
                        console.log('clear old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});


self.addEventListener('fetch', e => {
    console.log('fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

