/* ===================================
   PayNest v1.0
   Dashboard
=================================== */

function renderDashboard() {

    const contracts = loadContracts();

    updateSummary(contracts);

    renderContractList(contracts);

    updateInsight(contracts);

}

/* ---------- Summary ---------- */

function updateSummary(contracts) {

    const monthly = monthlySummary();
    const remain = remainSummary();

    document.getElementById("monthlyTotal").textContent =
        formatCurrency(monthly);

    document.getElementById("remainMoney").textContent =
        formatCurrency(remain);

    document.getElementById("contractCount").textContent =
        contracts.length;

    const totalDebt = contracts.reduce((sum, item) => {
        return sum + (item.price - item.down);
    }, 0);

    const percent = calculateProgress(
        totalDebt,
        remain
    );

    document.getElementById("progressBar").style.width =
        percent + "%";

}

/* ---------- Contract List ---------- */

function renderContractList(contracts) {

    const list =
        document.getElementById("contractList");

    list.innerHTML = "";

    if (contracts.length === 0) {

        list.innerHTML = `
            <div class="contract-card">
                <p>ยังไม่มีรายการผ่อน</p>
            </div>
        `;

        return;
    }

    contracts.forEach(contract => {

        const card = document.createElement("div");

        card.className =
            "contract-card slide-up";

        card.innerHTML = `

            <h4>${contract.name}</h4>

            <p>ค่างวด :
                ${formatCurrency(contract.monthly)}
            </p>

            <p>คงเหลือ :
                ${formatCurrency(contract.remain)}
            </p>

            <div class="progress">

                <div
                    class="progress-bar"
                    style="width:${progress(contract)}%">
                </div>

            </div>

        `;

        list.appendChild(card);

    });

}

/* ---------- Smart Insight ---------- */

function updateInsight(contracts) {

    const text =
        document.getElementById("insight");

    if (contracts.length === 0) {

        text.textContent =
            "เริ่มเพิ่มรายการผ่อนของคุณได้เลย";

        return;

    }

    const nearest = [...contracts]

        .sort((a, b) =>
            new Date(a.due) -
            new Date(b.due)
        )[0];

    text.textContent =
        `รายการ "${nearest.name}" ใกล้ถึงกำหนดชำระวันที่ ${nearest.due}`;

}

/* ---------- Refresh ---------- */

function refreshDashboard() {

    renderDashboard();

}
