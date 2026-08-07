/* ==========================================
   PayNest v1
   File : app.js
   Version : 1.2.0
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

import {
    setupModal
} from "./modal.js";

import {
    setupForm
} from "./form.js";

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

    setupForm();

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

