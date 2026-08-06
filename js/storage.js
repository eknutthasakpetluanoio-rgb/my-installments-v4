/* ===================================
   PayNest v1.0
   Storage
=================================== */

const STORAGE_KEY = "paynest_contracts";

/**
 * โหลดข้อมูลทั้งหมด
 */
function loadContracts() {

    try {

        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return [];
        }

        return JSON.parse(data);

    } catch (error) {

        console.error("Load Error :", error);

        return [];

    }

}

/**
 * บันทึกข้อมูลทั้งหมด
 */
function saveContracts(contracts) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(contracts)
        );

        return true;

    } catch (error) {

        console.error("Save Error :", error);

        return false;

    }

}

/**
 * เพิ่มรายการใหม่
 */
function addContract(contract) {

    const contracts = loadContracts();

    contracts.push(contract);

    saveContracts(contracts);

}

/**
 * อัปเดตรายการ
 */
function updateContract(id, newData) {

    const contracts = loadContracts();

    const index = contracts.findIndex(
        item => item.id === id
    );

    if (index === -1) return false;

    contracts[index] = {
        ...contracts[index],
        ...newData
    };

    saveContracts(contracts);

    return true;

}

/**
 * ลบรายการ
 */
function deleteContract(id) {

    const contracts = loadContracts();

    const filtered = contracts.filter(
        item => item.id !== id
    );

    saveContracts(filtered);

}

/**
 * ค้นหารายการ
 */
function getContract(id) {

    const contracts = loadContracts();

    return contracts.find(
        item => item.id === id
    );

}

/**
 * ล้างข้อมูลทั้งหมด
 */
function clearContracts() {

    localStorage.removeItem(STORAGE_KEY);

}
