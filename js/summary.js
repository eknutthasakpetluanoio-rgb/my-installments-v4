/* ==========================================
   PayNest v1
   File : summary.js
   Version : 1.0.0
   Description : Dashboard Summary
========================================== */

import { formatCurrency } from "./utils.js";

/* ---------- Update Summary ---------- */

export function updateSummary(contracts = []) {

    const monthlyIncomeElement = document.getElementById("monthlyIncome");
    const todayIncomeElement = document.getElementById("todayIncome");
    const totalIncomeElement = document.getElementById("totalIncome");
    const overdueCountElement = document.getElementById("overdueCount");
    const contractCountElement = document.getElementById("contractCount");

    let monthlyIncome = 0;
    let todayIncome = 0;
    let totalIncome = 0;
    let overdueCount = 0;

    const today = new Date().toISOString().split("T")[0];

    contracts.forEach(contract => {

        totalIncome += Number(contract.totalPrice || 0);

        if (contract.status === "overdue") {
            overdueCount++;
        }

        if (contract.nextDueDate === today) {
            todayIncome += Number(contract.installmentPerMonth || 0);
        }

        monthlyIncome +=
            Number(contract.installmentPerMonth || 0);

    });

    if (monthlyIncomeElement) {
        monthlyIncomeElement.textContent =
            formatCurrency(monthlyIncome);
    }

    if (todayIncomeElement) {
        todayIncomeElement.textContent =
            formatCurrency(todayIncome);
    }

    if (totalIncomeElement) {
        totalIncomeElement.textContent =
            formatCurrency(totalIncome);
    }

    if (overdueCountElement) {
        overdueCountElement.textContent =
            overdueCount;
    }

    if (contractCountElement) {
        contractCountElement.textContent =
            contracts.length;
    }

}


