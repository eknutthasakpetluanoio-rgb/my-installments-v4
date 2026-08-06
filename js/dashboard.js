/* ===================================
   PayNest v3.1
   Dashboard
=================================== */

/* ---------- Elements ---------- */

const contractList = document.getElementById("contractList");
const monthlyTotal = document.getElementById("monthlyTotal");
const remainMoney = document.getElementById("remainMoney");
const contractCount = document.getElementById("contractCount");
const progressBar = document.getElementById("progressBar");
const insight = document.getElementById("insight");
const searchInput = document.getElementById("searchInput");

/* ---------- Render ---------- */

function renderDashboard(keyword = "") {

    const dashboard = getDashboardData();

    let contracts = dashboard.contracts;

    if (keyword) {

        contracts = contracts.filter(contract =>
            contract.name
                .toLowerCase()
                .includes(keyword.toLowerCase())
        );

    }

    monthlyTotal.textContent =
        formatCurrency(dashboard.monthlyTotal);

    remainMoney.textContent =
        formatCurrency(dashboard.remainingTotal);

    contractCount.textContent =
        dashboard.totalContracts;

    renderProgress(dashboard);

    renderInsight(dashboard);

    renderContracts(contracts);

}

/* ---------- Progress ---------- */

function renderProgress(data) {

    if (!data.totalContracts) {

        progressBar.style.width = "0%";

        return;

    }

    let total = 0;

    data.contracts.forEach(contract => {

        total += getProgress(contract);

    });

    progressBar.style.width =
        (total / data.totalContracts) + "%";

}

/* ---------- Insight ---------- */

function renderInsight(data) {

    if (!data.totalContracts) {

        insight.textContent =
            "เริ่มเพิ่มรายการผ่อนของคุณได้เลย";

        return;

    }

    insight.textContent =
        `คุณมี ${data.totalContracts} รายการที่กำลังผ่อน`;

}

/* ---------- Card ---------- */

function createCard(contract) {

    const status = getStatus(contract);

    return `
    <div class="contract-card slide-up">

        <h4>${contract.name}</h4>

        <p>
            <span>ค่างวด</span>
            <strong>${formatCurrency(contract.monthly)}</strong>
        </p>

        <p>
            <span>คงเหลือ</span>
            <strong>${formatCurrency(getRemaining(contract))}</strong>
        </p>

        <p>
            <span>งวด</span>
            <strong>${contract.paidMonths}/${contract.months}</strong>
        </p>

        <div class="badge ${status.className}">
            ${status.text}
        </div>

        <div class="card-actions">

            <button class="btn btn-primary"
                onclick="payInstallment('${contract.id}');renderDashboard();">
                ชำระ
            </button>

            <button class="btn btn-secondary"
                onclick="openEdit('${contract.id}')">
                แก้ไข
            </button>

            <button class="btn btn-danger"
                onclick="removeItem('${contract.id}')">
                ลบ
            </button>

        </div>

    </div>
    `;
}

/* ---------- Render Cards ---------- */

function renderContracts(contracts) {

    if (!contracts.length) {

        contractList.innerHTML = `

<div class="empty-state">

<span class="material-symbols-rounded">

inventory_2

</span>

<h3>ยังไม่มีรายการ</h3>

<p>กดปุ่ม + เพื่อเริ่มสร้างรายการผ่อน</p>

</div>

`;

        return;

    }

    contractList.innerHTML =
        contracts.map(createCard).join("");

}

/* ---------- Search ---------- */

if (searchInput) {

    searchInput.addEventListener("input", event => {

        renderDashboard(event.target.value);

    });

}