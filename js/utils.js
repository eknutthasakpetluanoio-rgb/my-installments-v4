/* ===================================
   PayNest v4
   Utilities
=================================== */

function generateId() {
    return "id-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
}

function today() {
    return new Date().toISOString().split("T")[0];
}

function formatCurrency(amount) {
    return "฿" + Number(amount || 0).toLocaleString("th-TH");
}

function calculateRemaining(price, down, paidAmount) {
    return Math.max(0, (price - down) - paidAmount);
}

function calculateProgress(paidMonths, months) {
    if (!months) return 0;
    return Math.round((paidMonths / months) * 100);
}

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}