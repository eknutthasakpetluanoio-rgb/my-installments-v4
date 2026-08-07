/* ==========================================
   PayNest v1
   File : events.js
   Version : 1.1.0
   Description : Global Event Engine
========================================== */

import {
    loadContracts,
    getContractById,
    deleteContract
} from "./contracts.js";

import {
    updateSummary
} from "./summary.js";

import {
    renderContracts
} from "./ui.js";

import {
    openModal
} from "./modal.js";

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

        removeContract(

            target.dataset.id

        );

        return;

    }

    /* ---------- Edit ---------- */

    if (

        target.classList.contains(

            "edit-btn"

        )

    ) {

        editContract(

            target.dataset.id

        );

        return;

    }

}

/* ---------- Edit ---------- */

function editContract(id) {

    const contract =

        getContractById(id);

    if (!contract) {

        return;

    }

    document.getElementById(

        "customerName"

    ).value = contract.customerName;

    document.getElementById(

        "phone"

    ).value = contract.phone;

    document.getElementById(

        "product"

    ).value = contract.product;

    document.getElementById(

        "totalPrice"

    ).value = contract.totalPrice;

    document.getElementById(

        "downPayment"

    ).value = contract.downPayment;

    document.getElementById(

        "installmentPerMonth"

    ).value = contract.installmentPerMonth;

    document.getElementById(

        "totalInstallments"

    ).value = contract.totalInstallments;

    document.getElementById(

        "startDate"

    ).value = contract.startDate;

    document.getElementById(

        "nextDueDate"

    ).value = contract.nextDueDate;

    document.getElementById(

        "notes"

    ).value = contract.notes;

    /* เก็บ id ไว้ให้ form.js */

    document
        .getElementById(
            "contractForm"
        )
        .dataset.editId = id;

    openModal();

}

/* ---------- Delete ---------- */

function removeContract(id) {

    if (

        !confirm(

            "ลบสัญญานี้ใช่หรือไม่?"

        )

    ) {

        return;

    }

    deleteContract(id);

    refresh();

}

/* ---------- Refresh ---------- */

export function refresh() {

    const contracts =

        loadContracts();

    updateSummary(

        contracts

    );

    renderContracts(

        contracts

    );

}
