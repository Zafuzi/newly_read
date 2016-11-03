const static_v1 = [
    '/',
    '/login',
    '/Home',
    '/Home/Category',
    '/Home/Category/?category=business',
    '/Home/Category/?category=entertainment',
    '/Home/Category/?category=general',
    '/Home/Category/?category=gaming',
    '/Home/Category/?category=music',
    '/Home/Category/?category=science',
    '/Home/Category/?category=sport',
    '/Home/Category/?category=technology',

    '/lib/scripts/Vendor/jquery-3.1.1.min.js',
    '/lib/scripts/index.js'
];
self.addEventListener('install', function (event) {
    // pre cache a load of stuff:
    event.waitUntil(
      caches.open('myapp-static-v1').then(function (cache) {
          return cache.addAll(static_v1);
      })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.match(event.request).then(function (cachedResponse) {
          return cachedResponse || fetch(event.request);
      })
    );
});
self.addEventListener('activate', function (event) {
    // You're good to go!
});