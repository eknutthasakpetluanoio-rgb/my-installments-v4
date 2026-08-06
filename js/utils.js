/* ===================================
   PayNest Ultimate v1.0
   Utilities
=================================== */

/* ---------- Generate ID ---------- */

function generateId() {

    return "contract-" +
        Date.now() +
        "-" +
        Math.random().toString(36).slice(2, 8);

}

/* ---------- Today ---------- */

function today() {

    return new Date().toISOString().split("T")[0];

}

/* ---------- Currency ---------- */

function formatCurrency(amount) {

    return "฿" + Number(amount || 0).toLocaleString("th-TH", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

}

/* ---------- Remaining ---------- */

function calculateRemaining(price, down, paidAmount) {

    return Math.max(
        0,
        (Number(price) - Number(down)) - Number(paidAmount)
    );

}

/* ---------- Progress ---------- */

function calculateProgress(paidMonths, months) {

    if (!months || months <= 0) {

        return 0;

    }

    return Math.round(
        (paidMonths / months) * 100
    );

}

/* ---------- Clone ---------- */

function clone(data) {

    return JSON.parse(
        JSON.stringify(data)
    );

}

/* ---------- Download JSON ---------- */

function downloadJSON(filename, data) {

    const blob = new Blob(

        [
            JSON.stringify(
                data,
                null,
                2
            )
        ],

        {
            type: "application/json"
        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);

}

/* ---------- Read JSON ---------- */

function readJSON(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => {

            try {

                resolve(
                    JSON.parse(reader.result)
                );

            } catch (error) {

                reject(error);

            }

        };

        reader.onerror = reject;

        reader.readAsText(file);

    });

}

/* ---------- Number ---------- */

function toNumber(value) {

    const number = Number(value);

    return isNaN(number)

        ? 0

        : number;

}

/* ---------- Text ---------- */

function safeText(value) {

    return String(value || "").trim();

}

console.log("✅ utils.js loaded");