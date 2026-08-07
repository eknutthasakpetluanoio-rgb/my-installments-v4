/* ==========================================
   PayNest v1
   File : ui.js
   Version : 1.0.1
   Description : User Interface Engine
========================================== */

import {
    calculatePercentage,
    formatCurrency,
    formatDate
} from "./utils.js";

/* ---------- Render Contracts ---------- */

export function renderContracts(contracts = []) {

    const contractList =
        document.getElementById("contractList");

    if (!contractList) {

        return;

    }

    contractList.innerHTML = "";

    if (!Array.isArray(contracts) || contracts.length === 0) {

        contractList.innerHTML = `
            <div class="empty-state">
                ยังไม่มีสัญญา
            </div>
        `;

        return;

    }

    contracts.forEach(contract => {

        contractList.appendChild(

            createContractCard(contract)

        );

    });

}

/* ---------- Card ---------- */

function createContractCard(contract) {

    const card =
        document.createElement("article");

    card.className =
        "contract-card fade-in";

    const customerName =
        contract.customerName ??
        contract.shop ??
        "-";

    const product =
        contract.product ?? "-";

    const paidInstallments =
        Number(
            contract.paidInstallments ?? 0
        );

    const totalInstallments =
        Number(
            contract.totalInstallments ??
            contract.months ??
            0
        );

    const installmentPerMonth =
        Number(
            contract.installmentPerMonth ??
            contract.monthly ??
            0
        );

    const nextDueDate =
        contract.nextDueDate ?? "";

    const progress =
        calculatePercentage(

            paidInstallments,

            totalInstallments

        );

    card.innerHTML = `

        <h3>

            ${escapeHtml(customerName)}

        </h3>

        <p>

            ${escapeHtml(product)}

        </p>

        <div class="progress">

            <div
                class="progress-bar"
                style="width:${progress}%">
            </div>

        </div>

        <p>

            งวด
            ${paidInstallments}
            /
            ${totalInstallments}
            งวด

        </p>

        <p>

            ผ่อน / เดือน

            ${formatCurrency(
                installmentPerMonth
            )}

        </p>

        <p>

            ครบกำหนด

            ${
                nextDueDate
                    ? formatDate(nextDueDate)
                    : "-"
            }

        </p>

    `;

    return card;

}

/* ---------- Escape HTML ---------- */

function escapeHtml(value = "") {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
