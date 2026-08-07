/* ==========================================
   PayNest v1
   File : contracts.js
   Version : 1.1.0
   Description : Contract Engine
========================================== */

import { loadData, saveData } from "./storage.js";

import {
    generateId,
    getToday,
    toNumber
} from "./utils.js";

/* ---------- Load ---------- */

export function loadContracts() {

    const contracts = loadData();

    return contracts.map(contract => ({

        id:
            contract.id ?? generateId(),

        customerName:
            contract.customerName ??
            contract.shop ??
            "-",

        phone:
            contract.phone ?? "",

        product:
            contract.product ?? "",

        totalPrice:
            toNumber(
                contract.totalPrice ??
                contract.price ??
                0
            ),

        downPayment:
            toNumber(
                contract.downPayment ?? 0
            ),

        installmentPerMonth:
            toNumber(
                contract.installmentPerMonth ??
                contract.monthly ??
                0
            ),

        totalInstallments:
            toNumber(
                contract.totalInstallments ??
                contract.months ??
                0
            ),

        paidInstallments:
            toNumber(
                contract.paidInstallments ?? 0
            ),

        startDate:
            contract.startDate ?? "",

        nextDueDate:
            contract.nextDueDate ?? "",

        status:
            contract.status ?? "active",

        notes:
            contract.notes ?? "",

        createdAt:
            contract.createdAt ?? "",

        updatedAt:
            contract.updatedAt ?? ""

    }));

}

/* ---------- Get ---------- */

export function getContracts() {

    return loadContracts();

}

/* ---------- Get By Id ---------- */

export function getContractById(id) {

    return loadContracts().find(

        contract => contract.id === id

    ) ?? null;

}

/* ---------- Create ---------- */

export function createContract(data) {

    const contracts = loadContracts();

    const contract = {

        id: generateId(),

        customerName:
            data.customerName ?? "",

        phone:
            data.phone ?? "",

        product:
            data.product ?? "",

        totalPrice:
            toNumber(data.totalPrice),

        downPayment:
            toNumber(data.downPayment),

        installmentPerMonth:
            toNumber(data.installmentPerMonth),

        totalInstallments:
            toNumber(data.totalInstallments),

        paidInstallments: 0,

        startDate:
            data.startDate ?? getToday(),

        nextDueDate:
            data.nextDueDate ?? getToday(),

        status: "active",

        notes:
            data.notes ?? "",

        createdAt:
            getToday(),

        updatedAt:
            getToday()

    };

    contracts.push(contract);

    saveData(contracts);

    return contract;

}

/* ---------- Update ---------- */


export function updateContract(id, data) {

    const contracts = loadContracts();

    const index = contracts.findIndex(

        contract => contract.id === id

    );

    if (index === -1) {

        return null;

    }

    contracts[index] = {

        ...contracts[index],

        ...data,

        updatedAt: getToday()

    };

    saveData(contracts);

    return contracts[index];

}

/* ---------- Delete ---------- */

export function deleteContract(id) {

    const contracts = loadContracts();

    const filtered = contracts.filter(

        contract => contract.id !== id

    );

    saveData(filtered);

    return filtered;

}

/* ---------- Pay Installment ---------- */

export function payInstallment(id) {

    const contracts = loadContracts();

    const index = contracts.findIndex(

        contract => contract.id === id

    );

    if (index === -1) {

        return null;

    }

    const contract = contracts[index];

    if (contract.status === "completed") {

        return contract;

    }

    contract.paidInstallments += 1;

    if (

        contract.paidInstallments >=

        contract.totalInstallments

    ) {

        contract.paidInstallments =
            contract.totalInstallments;

        contract.status =
            "completed";

    }

    else if (contract.nextDueDate) {

        const next = new Date(
            contract.nextDueDate
        );

        next.setMonth(
            next.getMonth() + 1
        );

        contract.nextDueDate =
            next
                .toISOString()
                .split("T")[0];

    }

    contract.updatedAt =
        getToday();

    contracts[index] =
        contract;

    saveData(contracts);

    return contract;

}

/* ---------- Save ---------- */

export function saveContracts(contracts) {

    return saveData(contracts);

}