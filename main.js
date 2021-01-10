if ('serviceWorker' in navigator) {

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('cached_service_worker.js')
            .then(reg => console.log('founded'))
            .catch(err => console.log(`error:${err}`));
    });
}