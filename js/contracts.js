/* ==========================================
   PayNest v1
   File : contracts.js
   Version : 1.0.0
   Description : Contract Manager
========================================== */

import { loadData, saveData } from "./storage.js";

/* ---------- Load ---------- */

export function loadContracts() {

    const contracts = loadData();

    return contracts.map(contract => ({

        id: contract.id ?? crypto.randomUUID(),

        customerName: contract.customerName ?? contract.shop ?? "",

        phone: contract.phone ?? "",

        product: contract.product ?? "",

        totalPrice: Number(
            contract.totalPrice ?? contract.price ?? 0
        ),

        downPayment: Number(
            contract.downPayment ?? 0
        ),

        installmentPerMonth: Number(
            contract.installmentPerMonth ??
            contract.monthly ??
            0
        ),

        totalInstallments: Number(
            contract.totalInstallments ??
            contract.months ??
            0
        ),

        paidInstallments: Number(
            contract.paidInstallments ?? 0
        ),

        startDate: contract.startDate ?? "",

        nextDueDate: contract.nextDueDate ?? "",

        status: contract.status ?? "active"

    }));

}

/* ---------- Get ---------- */

export function getContracts() {

    return loadData();

}

/* ---------- Add ---------- */

export function addContract(contract) {

    const contracts = loadData();

    contracts.push(contract);

    saveData(contracts);

    return contracts;

}

/* ---------- Update ---------- */

export function updateContract(id, updatedData) {

    const contracts = loadData();

    const index = contracts.findIndex(item => item.id === id);

    if (index === -1) {

        return contracts;

    }

    contracts[index] = {

        ...contracts[index],

        ...updatedData

    };

    saveData(contracts);

    return contracts;

}

/* ---------- Delete ---------- */

export function deleteContract(id) {

    const contracts = loadData();

    const filtered = contracts.filter(item => item.id !== id);

    saveData(filtered);

    return filtered;

}
