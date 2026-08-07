/* ==========================================
   PayNest v1
   File : form.js
   Version : 1.0.0
   Description : Contract Form Engine
========================================== */

import {
    createContract,
    loadContracts
} from "./contracts.js";

import {
    updateSummary
} from "./summary.js";

import {
    renderContracts
} from "./ui.js";

import {
    closeModal
} from "./modal.js";

/* ---------- Setup ---------- */

export function setupForm() {

    const form =
        document.getElementById(
            "contractForm"
        );

    if (!form) {

        return;

    }

    form.addEventListener(

        "submit",

        handleSubmit

    );

}

/* ---------- Submit ---------- */

function handleSubmit(event) {

    event.preventDefault();

    const data =
        getFormData();

    if (
        !validateForm(data)
    ) {

        return;

    }

    createContract(data);

    refreshUI();

    resetForm();

    closeModal();

}

/* ---------- Get Form ---------- */

function getFormData() {

    return {

        customerName:

            value("customerName"),

        phone:

            value("phone"),

        product:

            value("product"),

        totalPrice:

            Number(
                value("totalPrice")
            ),

        downPayment:

            Number(
                value("downPayment")
            ),

        installmentPerMonth:

            Number(
                value(
                    "installmentPerMonth"
                )
            ),

        totalInstallments:

            Number(
                value(
                    "totalInstallments"
                )
            ),

        startDate:

            value("startDate"),

        nextDueDate:

            value("nextDueDate"),

        notes:

            value("notes")

    };

}

/* ---------- Validate ---------- */

function validateForm(data) {

    if (

        !data.customerName ||

        !data.product ||

        data.totalPrice <= 0 ||

        data.installmentPerMonth <= 0 ||

        data.totalInstallments <= 0

    ) {

        alert(

            "กรุณากรอกข้อมูลให้ครบ"

        );

        return false;

    }

    return true;

}

/* ---------- Refresh ---------- */

function refreshUI() {

    const contracts =
        loadContracts();

    updateSummary(
        contracts
    );

    renderContracts(
        contracts
    );

}

/* ---------- Reset ---------- */

function resetForm() {

    document
        .getElementById(
            "contractForm"
        )
        ?.reset();

}

/* ---------- Helper ---------- */

function value(id) {

    return document
        .getElementById(id)
        ?.value
        ?.trim() ?? "";

}
