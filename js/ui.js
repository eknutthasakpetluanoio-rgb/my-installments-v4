/* ==========================================
   PayNest v1
   File : ui.js
   Version : 1.0.0
   Description : User Interface Renderer
========================================== */
import { calculatePercentage } from "./utils.js";
/* ---------- Render Contracts ---------- */

export function renderContracts(contracts = []) {

    const contractList = document.getElementById("contractList");

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

        const progress = calculatePercentage(
    contract.paidInstallments,
    contract.totalInstallments
);

        const card = document.createElement("article");

        card.className = "contract-card fade-in";

        card.innerHTML = `
            <h3>${contract.customerName}</h3>

            <p>${contract.product}</p>

            <div class="progress">
                <div
                    class="progress-bar"
                    style="width:${progress}%">
                </div>
            </div>

            <p>
                ${contract.paidInstallments}
                /
                ${contract.totalInstallments}
                งวด
            </p>
        `;

        contractList.appendChild(card);

    });

}

