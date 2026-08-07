/* ==========================================
   PayNest v1
   File : app.js
   Version : 1.3.0
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

import {
    setupEvents
} from "./events.js";

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

    setupEvents();

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
