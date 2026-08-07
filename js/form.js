/* ==========================================
   PayNest v1
   File : form.js
   Version : 2.0.0
   Description : Contract Form Engine
========================================== */

import {
    createContract,
    updateContract,
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

        submitContract

    );

}

/* ---------- Submit ---------- */

function submitContract(event) {

    event.preventDefault();

    const form =

        document.getElementById(
            "contractForm"
        );

    const editId =

        form.dataset.editId;

    const data =

        getFormData();

    if (

        !validate(data)

    ) {

        return;

    }

    if (editId) {

        updateContract(

            editId,

            data

        );

    }

    else {

        createContract(

            data

        );

    }

    refresh();

    reset();

    delete form.dataset.editId;

    closeModal();

}

/* ---------- Form Data ---------- */

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
                value("installmentPerMonth")
            ),

        totalInstallments:
            Number(
                value("totalInstallments")
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
function validate(data) {

    if (!data.customerName) {

        alert(
            "กรุณากรอกชื่อลูกค้า"
        );

        return false;

    }

    if (!data.product) {

        alert(
            "กรุณากรอกสินค้า"
        );

        return false;

    }

    if (data.totalPrice <= 0) {

        alert(
            "กรุณากรอกราคาสินค้า"
        );

        return false;

    }

    if (data.installmentPerMonth <= 0) {

        alert(
            "กรุณากรอกค่างวด"
        );

        return false;

    }

    if (data.totalInstallments <= 0) {

        alert(
            "กรุณากรอกจำนวนงวด"
        );

        return false;

    }

    return true;

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

/* ---------- Reset ---------- */

function reset() {

    const form =

        document.getElementById(
            "contractForm"
        );

    form.reset();

    delete form.dataset.editId;

}

/* ---------- Helper ---------- */

function value(id) {

    return document
        .getElementById(id)
        ?.value
        ?.trim() ?? "";

}
