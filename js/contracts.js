/* ==========================================
   PayNest v1
   File : contracts.js
   Version : 1.0.0
   Description : Contract Manager
========================================== */

import { loadData, saveData } from "./storage.js";

/* ---------- Load ---------- */

export function loadContracts() {

    return loadData();

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
