/* ==========================================
   PayNest v1
   File : pwa.js
   Version : 1.0.1
   Description : Progressive Web App
========================================== */

/* ---------- Register ---------- */

export async function registerPWA() {

    if (!("serviceWorker" in navigator)) {

        return;

    }

    try {

        // ลบ Service Worker เก่าทั้งหมด
        const registrations =
            await navigator.serviceWorker.getRegistrations();

        for (const registration of registrations) {

            await registration.unregister();

        }

        // ล้าง Cache ทั้งหมด
        const cacheNames = await caches.keys();

        await Promise.all(

            cacheNames.map(name => caches.delete(name))

        );

        console.log("Old Service Worker Removed");

    } catch (error) {

        console.error(

            "PWA Reset Error",

            error

        );

    }

}
