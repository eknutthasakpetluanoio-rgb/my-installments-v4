/* ===================================
   PayNest Premium v1.0
   App Controller
=================================== */

"use strict";

/* ==========================
   Elements
========================== */

const fab = document.getElementById("addContractBtn");
const bottomSheet = document.getElementById("bottomSheet");
const backdrop = document.getElementById("backdrop");
const closeSheetBtn = document.getElementById("closeSheet");

/* ==========================
   Sheet
========================== */

function openSheet() {

    backdrop.classList.add("show");
    bottomSheet.classList.add("show");

}

function closeSheet() {

    backdrop.classList.remove("show");
    bottomSheet.classList.remove("show");

}

/* ==========================
   Events
========================== */

if (fab) {

    fab.addEventListener("click", openSheet);

}

if (closeSheetBtn) {

    closeSheetBtn.addEventListener("click", closeSheet);

}

if (backdrop) {

    backdrop.addEventListener("click", closeSheet);

}

/* ==========================
   ESC Support
========================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeSheet();

    }

});
