/* ==========================================
   PayNest v1
   File : app.js
   Version : 1.0.1
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

    if (
        !fab ||
        !modal ||
        !close
    ) {

        return;

    }

    fab.addEventListener(

        "click",

        () => {

            modal.classList.remove(

                "hidden"

            );

        }

    );

    close.addEventListener(

        "click",

        () => {

            modal.classList.add(

                "hidden"

            );

        }

    );

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

}

/* ---------- Init ---------- */

async function init() {
console.log("init ทำงานแล้ว");
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