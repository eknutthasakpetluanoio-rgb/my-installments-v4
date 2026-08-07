/* ==========================================
   PayNest v1
   File : app.js
   Version : 1.0.2
   Description : Application Bootstrap
========================================== */

import {
    loadContracts
} from "./contracts.js";

import {
    updateSummary
} from "./summary.js";

import {
    renderContracts
} from "./ui.js";

import {
    registerPWA
} from "./pwa.js";

/* ---------- Modal ---------- */

function setupModal() {

    const fab =
        document.getElementById("fab");

    const modal =
        document.getElementById("contractModal");

    const close =
        document.getElementById("closeModal");

    const form =
        document.getElementById("contractForm");

    if (
        !fab ||
        !modal ||
        !close
    ) {

        return;

    }

    /* ---------- Open ---------- */

    fab.addEventListener(

        "click",

        () => {

            modal.classList.remove(

                "hidden"

            );

        }

    );

    /* ---------- Close ---------- */

    close.addEventListener(

        "click",

        () => {

            modal.classList.add(

                "hidden"

            );

        }

    );

    /* ---------- Click Outside ---------- */

    modal.addEventListener(

        "click",

        event => {

            if (

                event.target === modal

            ) {

                modal.classList.add(

                    "hidden"

                );

            }

        }

    );

    /* ---------- Form ---------- */

    if (form) {

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                alert(

                    "Sprint 1B ขั้นต่อไปจะเชื่อมระบบบันทึกข้อมูล"

                );

            }

        );

    }

}

/* ---------- Init ---------- */

async function init() {

    console.log(

        "PayNest v1 Starting..."

    );

    const contracts =
        loadContracts();

    updateSummary(
        contracts
    );

    renderContracts(
        contracts
    );

    setupModal();

    await registerPWA();

    console.log(

        "PayNest Ready"

    );

}

/* ---------- Start ---------- */

document.addEventListener(

    "DOMContentLoaded",

    init

);
