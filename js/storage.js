/* ===================================
   PayNest v3.1
   Storage Manager
=================================== */

const STORAGE_KEY = "paynest.contracts";

/* ---------- Get All ---------- */

function getContracts() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    try {

        return JSON.parse(data);

    } catch (error) {

        console.error("Storage Error:", error);

        return [];

    }

}

/* ---------- Save All ---------- */

function saveContracts(contracts) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(contracts)
    );

}

/* ---------- Add ---------- */

function addContract(contract) {

    const contracts = getContracts();

    contracts.push(contract);

    saveContracts(contracts);

}

/* ---------- Find ---------- */

function findContract(id) {

    return getContracts().find(
        contract => contract.id === id
    );

}

/* ---------- Update ---------- */

function updateContract(id, newData) {

    const contracts = getContracts();

    const index = contracts.findIndex(
        contract => contract.id === id
    );

    if (index === -1) return false;

    contracts[index] = {

        ...contracts[index],

        ...newData

    };

    saveContracts(contracts);

    return true;

}

/* ---------- Delete ---------- */

function deleteContract(id) {

    const contracts = getContracts().filter(
        contract => contract.id !== id
    );

    saveContracts(contracts);

}

/* ---------- Clear ---------- */

function clearContracts() {

    localStorage.removeItem(STORAGE_KEY);

}