/* ==========================================
   PayNest v1
   File : app.js
   Version : 1.0.0
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

/* ---------- Init ---------- */

async function init() {

    console.log(

        "PayNest v1 Starting..."

    );

    const contracts = loadContracts();

    updateSummary(contracts);

    renderContracts(contracts);

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
