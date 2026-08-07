/* ==========================================
   PayNest v1
   File : ui.js
   Version : 1.0.0
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

    if (contracts.length === 0) {

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

    const progress = calculatePercentage(

        contract.paidInstallments,

        contract.totalInstallments

    );

    card.innerHTML = `

        <h3>

            ${escapeHtml(contract.customerName)}

        </h3>

        <p>

            ${escapeHtml(contract.product)}

        </p>

        <div class="progress">

            <div
                class="progress-bar"
                style="width:${progress}%">
            </div>

        </div>

        <p>

            งวด

            ${contract.paidInstallments}

            /

            ${contract.totalInstallments}

        </p>

        <p>

            ผ่อน / เดือน

            ${formatCurrency(
                contract.installmentPerMonth
            )}

        </p>

        <p>

            ครบกำหนด

            ${formatDate(
                contract.nextDueDate
            )}

        </p>

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
