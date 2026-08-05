// ======================================
// storage.js
// My Installments V2
// ======================================

const STORAGE_KEY = "my_installments_v2";

// โหลดข้อมูล
function loadContracts() {

    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];

}

// บันทึกข้อมูล
function saveContracts(contracts) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(contracts)
    );

}

// สร้าง ID
function generateId() {

    return Date.now() + Math.floor(Math.random() * 1000);

}

// เพิ่มสัญญา
function addContract(contract) {

    const contracts = loadContracts();

    contract.id = generateId();

    contracts.push(contract);

    saveContracts(contracts);

}

// แก้ไขสัญญา
function updateContract(updated) {

    const contracts = loadContracts();

    const index = contracts.findIndex(
        c => c.id === updated.id
    );

    if (index !== -1) {

        contracts[index] = updated;

        saveContracts(contracts);

    }

}

// ลบสัญญา
function deleteContract(id) {

    const contracts =
        loadContracts().filter(
            c => c.id !== id
        );

    saveContracts(contracts);

}

// ค้นหาสัญญา
function getContract(id) {

    return loadContracts().find(
        c => c.id === id
    );

}