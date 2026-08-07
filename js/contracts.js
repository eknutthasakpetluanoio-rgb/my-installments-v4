/* ==========================================
   PayNest v1
   File : contracts.js
   Version : 1.0.0
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

    return loadData();

}

/* ---------- Get ---------- */

export function getContracts() {

    return loadData();

}

/* ---------- Get By Id ---------- */

export function getContractById(id) {

    return loadData().find(

        contract => contract.id === id

    ) ?? null;

}

/* ---------- Create ---------- */

export function createContract(data) {

    const contracts = loadData();

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

        paidInstallments:0,

        startDate:
            data.startDate ?? getToday(),

        nextDueDate:
            data.nextDueDate ?? getToday(),

        status:"active",

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

export function updateContract(id,data){

    const contracts = loadData();

    const index = contracts.findIndex(

        contract => contract.id === id

    );

    if(index === -1){

        return null;

    }

    contracts[index] = {

        ...contracts[index],

        ...data,

        updatedAt:getToday()

    };

    saveData(contracts);

    return contracts[index];

}

/* ---------- Delete ---------- */

export function deleteContract(id){

    const contracts = loadData();

    const filtered = contracts.filter(

        contract => contract.id !== id

    );

    saveData(filtered);

    return filtered;

}

/* ---------- Save ---------- */

export function saveContracts(contracts){

    return saveData(contracts);

}
