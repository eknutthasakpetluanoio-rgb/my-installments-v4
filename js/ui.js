/* ==========================================
   PayNest v1
   File : ui.js
   Version : 1.1.0
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

    if (
        !Array.isArray(contracts) ||
        contracts.length === 0
    ) {

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
        "-";

    const product =
        contract.product ??
        "-";

    const paidInstallments =
        Number(
            contract.paidInstallments ?? 0
        );

    const totalInstallments =
        Number(
            contract.totalInstallments ?? 0
        );

    const installmentPerMonth =
        Number(
            contract.installmentPerMonth ?? 0
        );

    const progress =
        calculatePercentage(

            paidInstallments,

            totalInstallments

        );

    card.innerHTML = `

        <h3>${escapeHtml(customerName)}</h3>

        <p>${escapeHtml(product)}</p>

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
                contract.nextDueDate
                ? formatDate(
                    contract.nextDueDate
                  )
                : "-"
            }
        </p>

        <div class="contract-actions">

    <button
        class="pay-btn"
        data-id="${contract.id}">

        💰 รับเงิน

    </button>

    <button
        class="edit-btn"
        data-id="${contract.id}">

        ✏️ แก้ไข

    </button>

    <button
        class="delete-btn"
        data-id="${contract.id}">

        🗑️ ลบ

    </button>

</div>

    `;

    return card;

}

/* ---------- Escape HTML ---------- */

function escapeHtml(value = "") {

    return String(value)

        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}
