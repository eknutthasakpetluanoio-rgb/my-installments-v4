/* ==========================================
   PayNest v1
   File : utils.js
   Version : 1.0.0
   Description : Utility Functions
========================================== */

/* ---------- Generate ID ---------- */

export function generateId() {

    return crypto.randomUUID();

}

/* ---------- Currency ---------- */

export function formatCurrency(value = 0) {

    return new Intl.NumberFormat("th-TH", {

        style: "currency",

        currency: "THB",

        minimumFractionDigits: 0

    }).format(Number(value));

}

/* ---------- Date ---------- */

export function getToday() {

    return new Date().toISOString().split("T")[0];

}

/* ---------- Percentage ---------- */

export function calculatePercentage(current, total) {

    if (total <= 0) {

        return 0;

    }

    return Math.min(
        100,
        Math.round((current / total) * 100)
    );

}

/* ---------- Safe Number ---------- */

export function toNumber(value) {

    const number = Number(value);

    return Number.isNaN(number)
        ? 0
        : number;

}
