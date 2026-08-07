/* ==========================================
   PayNest v1
   File : storage.js
   Version : 1.0.0
   Description : Local Storage Layer
========================================== */

const STORAGE_KEY = "paynest_contracts";

/* ---------- Load ---------- */

export function loadData() {

    try {

        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {

            return [];

        }

        const data = JSON.parse(raw);

        return Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        console.error(
            "Storage Load Error:",
            error
        );

        return [];

    }

}

/* ---------- Save ---------- */

export function saveData(data = []) {

    try {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(data)

        );

        return true;

    } catch (error) {

        console.error(
            "Storage Save Error:",
            error
        );

        return false;

    }

}

/* ---------- Clear ---------- */

export function clearData() {

    try {

        localStorage.removeItem(STORAGE_KEY);

        return true;

    } catch (error) {

        console.error(
            "Storage Clear Error:",
            error
        );

        return false;

    }

}

/* ---------- Exists ---------- */

export function hasData() {

    return loadData().length > 0;

}

/* ---------- Count ---------- */

export function countData() {

    return loadData().length;

}
