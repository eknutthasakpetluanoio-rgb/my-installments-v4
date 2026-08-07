/* ==========================================
   PayNest v1
   File : app.js
   Version : 1.0.0
   Description : Application Bootstrap
========================================== */

import { loadContracts } from "./contracts.js";
import { updateSummary } from "./summary.js";
import { renderContracts } from "./ui.js";
import { registerPWA } from "./pwa.js";

async function init() {

    console.log("PayNest v1 Starting...");

    const contracts = loadContracts();
alert(JSON.stringify(contracts[0], null, 2));
    updateSummary(contracts);

    renderContracts(contracts);

    await registerPWA();

    console.log("PayNest Ready");

}

document.addEventListener("DOMContentLoaded", init);
