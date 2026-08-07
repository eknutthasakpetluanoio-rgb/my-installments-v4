/* ==========================================
   PayNest v1
   File : pwa.js
   Version : 1.0.0
   Description : PWA Registration
========================================== */

export async function registerPWA() {

    if (!("serviceWorker" in navigator)) {

        return;

    }

    try {

        await navigator.serviceWorker.register("./sw.js");

        console.log("Service Worker Registered");

    } catch (error) {

        console.error(
            "Service Worker Error:",
            error
        );

    }

}
