/* ===================================
   PayNest v3.1
   Utils
=================================== */

/* ---------- Currency ---------- */

function formatCurrency(value) {

    const number = Number(value || 0);

    return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
        maximumFractionDigits: 0
    }).format(number);

}

/* ---------- Number ---------- */

function formatNumber(value) {

    return new Intl.NumberFormat("th-TH").format(Number(value || 0));

}

/* ---------- Date ---------- */

function formatDate(date) {

    if (!date) return "-";

    return new Date(date).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

}

/* ---------- Generate ID ---------- */

function generateId() {

    return crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(36) +
          Math.random().toString(36).slice(2);

}

/* ---------- Progress ---------- */

function calculateProgress(paid, total) {

    if (!total || total <= 0) return 0;

    return Math.min(
        100,
        Math.round((paid / total) * 100)
    );

}

/* ---------- Remaining ---------- */

function calculateRemaining(price, down, paid) {

    return Math.max(
        0,
        Number(price) - Number(down) - Number(paid)
    );

}

/* ---------- Today's Date ---------- */

function today() {

    return new Date().toISOString().split("T")[0];

}

/* ---------- Query ---------- */

function $(selector) {

    return document.querySelector(selector);

}

function $$(selector) {

    return document.querySelectorAll(selector);

}
