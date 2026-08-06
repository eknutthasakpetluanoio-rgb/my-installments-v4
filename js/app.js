/* ===================================
   PayNest v4
   App
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    renderDashboard();

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

    if ("serviceWorker" in navigator) {

        navigator.serviceWorker

            .register("./service-worker.js")

            .catch(console.error);

    }

    console.log("✅ PayNest v4 Ready");

});