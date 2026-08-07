/* ==========================================
   PayNest v1
   File : events.js
   Version : 1.0.0
   Description : Global Event Engine
========================================== */

import {
    loadContracts,
    deleteContract
} from "./contracts.js";

import {
    updateSummary
} from "./summary.js";

import {
    renderContracts
} from "./ui.js";

/* ---------- Setup ---------- */

export function setupEvents() {

    document.addEventListener(

        "click",

        handleClick

    );

}

/* ---------- Click ---------- */

function handleClick(event) {

    const target = event.target;

    /* ---------- Delete ---------- */

    if (

        target.classList.contains(

            "delete-btn"

        )

    ) {

        const id =

            target.dataset.id;

        removeContract(id);

    }

    /* ---------- Edit ---------- */

    if (

        target.classList.contains(

            "edit-btn"

        )

    ) {

        const id =

            target.dataset.id;

        console.log(

            "Edit:",

            id

        );

    }

}

/* ---------- Delete ---------- */

function removeContract(id) {

    const ok = confirm(

        "ลบสัญญานี้ใช่หรือไม่?"

    );

    if (!ok) {

        return;

    }

    deleteContract(id);

    refresh();

}

/* ---------- Refresh ---------- */

function refresh() {

    const contracts =

        loadContracts();

    updateSummary(

        contracts

    );

    renderContracts(

        contracts

    );

}
