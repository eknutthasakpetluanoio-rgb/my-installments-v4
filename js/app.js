/* ===================================
   PayNest Ultimate v1.0
   App
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Theme ---------- */

    const themeButton =
        document.getElementById("themeButton");

    const savedTheme =
        localStorage.getItem("paynest.theme");

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

    /* ---------- Dashboard ---------- */

    renderDashboard();

    /* ---------- Auto Monthly ---------- */

    const monthlyInput =
        document.getElementById("monthly");

    const priceInput =
        document.getElementById("price");

    const downInput =
        document.getElementById("down");

    const monthsInput =
        document.getElementById("months");

    function calculateMonthly() {

        const price =
            Number(priceInput?.value || 0);

        const down =
            Number(downInput?.value || 0);

        const months =
            Number(monthsInput?.value || 0);

        if (!months) return;

        monthlyInput.value = Math.ceil(

            (price - down) / months

        );

    }

    priceInput?.addEventListener(

        "input",

        calculateMonthly

    );

    downInput?.addEventListener(

        "input",

        calculateMonthly

    );

    monthsInput?.addEventListener(

        "input",

        calculateMonthly

    );

    /* ---------- Service Worker ---------- */

    if ("serviceWorker" in navigator) {

        navigator.serviceWorker

            .register("./service-worker.js")

            .then(() => {

                console.log("✅ Service Worker Registered");

            })

            .catch(error => {

                console.error(error);

            });

    }

    console.log("🚀 PayNest Ultimate Ready");

});