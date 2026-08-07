/* ==========================================
   PayNest v1
   File : summary.js
   Version : 1.0.0
   Description : Dashboard Engine
========================================== */

import {

    formatCurrency,
    getToday,
    toNumber

} from "./utils.js";

/* ---------- Update Summary ---------- */

export function updateSummary(contracts = []) {

    const monthlyIncomeElement =
        document.getElementById("monthlyIncome");

    const todayIncomeElement =
        document.getElementById("todayIncome");

    const totalIncomeElement =
        document.getElementById("totalIncome");

    const overdueCountElement =
        document.getElementById("overdueCount");

    const contractCountElement =
        document.getElementById("contractCount");

    const today = getToday();

    let monthlyIncome = 0;

    let todayIncome = 0;

    let totalIncome = 0;

    let overdueCount = 0;

    contracts.forEach(contract => {

        totalIncome +=
            toNumber(contract.totalPrice);

        monthlyIncome +=
            toNumber(contract.installmentPerMonth);

        if (
            contract.nextDueDate === today
        ) {

            todayIncome +=
                toNumber(
                    contract.installmentPerMonth
                );

        }

        if (
            contract.status === "overdue"
        ) {

            overdueCount++;

        }

    });

    setText(

        monthlyIncomeElement,

        formatCurrency(monthlyIncome)

    );

    setText(

        todayIncomeElement,

        formatCurrency(todayIncome)

    );

    setText(

        totalIncomeElement,

        formatCurrency(totalIncome)

    );

    setText(

        overdueCountElement,

        overdueCount

    );

    setText(

        contractCountElement,

        contracts.length

    );

}

/* ---------- Helper ---------- */

function setText(element, value) {

    if (!element) {

        return;

    }

    element.textContent = value;

}
