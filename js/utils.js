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

        minimumFractionDigits: 0,

        maximumFractionDigits: 0

    }).format(Number(value));

}

/* ---------- Safe Number ---------- */

export function toNumber(value) {

    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : 0;

}

/* ---------- Today ---------- */

export function getToday() {

    return new Date().toISOString().split("T")[0];

}

/* ---------- Percentage ---------- */

export function calculatePercentage(current = 0, total = 0) {

    current = toNumber(current);

    total = toNumber(total);

    if (total <= 0) {

        return 0;

    }

    return Math.min(
        100,
        Math.round((current / total) * 100)
    );

}

/* ---------- Date Format ---------- */

export function formatDate(date) {

    if (!date) {

        return "-";

    }

    return new Intl.DateTimeFormat("th-TH", {

        day: "2-digit",

        month: "short",

        year: "numeric"

    }).format(new Date(date));

}

/* ---------- Deep Copy ---------- */

export function deepCopy(data) {

    return structuredClone(data);

}

/* ---------- Empty ---------- */

export function isEmpty(value) {

    return value === null ||

           value === undefined ||

           value === "";

}
