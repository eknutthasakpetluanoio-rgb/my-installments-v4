/* ===================================
   PayNest v3.1
   App Entry
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Render ---------- */

    renderDashboard();

    /* ---------- Theme ---------- */

    const themeButton = document.getElementById("themeButton");

    const savedTheme = localStorage.getItem("paynest.theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }

    themeButton?.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        localStorage.setItem(

            "paynest.theme",

            document.body.classList.contains("dark")
                ? "dark"
                : "light"

        );

    });

    /* ---------- Service Worker ---------- */

    if ("serviceWorker" in navigator) {

        navigator.serviceWorker
            .register("./service-worker.js")
            .catch(error => {

                console.log("Service Worker:", error);

            });

    }

    console.log("✅ PayNest v3.1 Ready");

});