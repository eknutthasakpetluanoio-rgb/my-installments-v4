/* ==========================================
   PayNest v1
   File : sw.js
   Version : 1.0.0
========================================== */

const CACHE_NAME = "paynest-v1";

const ASSETS = [
    "./",
    "./index.html",
    "./css/variables.css",
    "./css/reset.css",
    "./css/layout.css",
    "./css/components.css",
    "./css/animations.css",
    "./css/responsive.css",
    "./css/style.css",
    "./js/app.js",
    "./js/contracts.js",
    "./js/storage.js",
    "./js/summary.js",
    "./js/ui.js",
    "./js/utils.js",
    "./js/pwa.js"
];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => cache.addAll(ASSETS))

    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            )

        )

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response =>

                response || fetch(event.request)

            )

    );

});
