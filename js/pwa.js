/* ==========================================
   PayNest v1
   File : pwa.js
   Version : 1.0.0
   Description : Progressive Web App
========================================== */

/* ---------- Register ---------- */

export async function registerPWA() {

    if (!("serviceWorker" in navigator)) {

        console.warn(
            "Service Worker Not Supported"
        );

        return;

    }

    try {

        const registration =
            await navigator.serviceWorker.register(
                "./sw.js"
            );

        console.log(

            "Service Worker Registered",

            registration.scope

        );

    } catch (error) {

        console.error(

            "Service Worker Register Error",

            error

        );

    }

}
