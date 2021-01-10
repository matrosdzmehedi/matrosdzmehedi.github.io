const cacheName = 'v2';



self.addEventListener('install', e => {
    console.log('installed');

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
    e.respondWith(
        fetch(e.request).then(res => {
            const resClone = res.clone();
            caches.open(cacheName).then(cache => {
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    );




});

