/* ==========================================
   PayNest v1
   File : storage.js
   Version : 1.0.0
   Description : Local Storage Manager
========================================== */

const STORAGE_KEY = "paynest_contracts";

/* ---------- Load ---------- */

export function loadData() {

    try {

        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return [];
        }

        return JSON.parse(data);

    } catch (error) {

        console.error("Load Error:", error);

        return [];

    }

}

/* ---------- Save ---------- */

export function saveData(contracts) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(contracts)
        );

        return true;

    } catch (error) {

        console.error("Save Error:", error);

        return false;

    }

}

/* ---------- Clear ---------- */

export function clearData() {

    localStorage.removeItem(STORAGE_KEY);

}
