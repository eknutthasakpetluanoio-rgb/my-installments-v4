/* ===================================
   PayNest v1.1
   Dashboard
=================================== */

/* ---------- Dashboard ---------- */

function renderDashboard() {

    const contracts = loadContracts();

    updateSummary(contracts);

    updateInsight(contracts);

    renderContractList(contracts);

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

/* ---------- Insight ---------- */

function updateInsight(contracts) {

    const insight =
        document.getElementById("insight");

    if (!contracts.length) {

        insight.textContent =
            "เริ่มเพิ่มรายการผ่อนของคุณได้เลย";

        return;

    }

    const nearest = [...contracts].sort(

        (a, b) =>

            new Date(a.due) -

            new Date(b.due)

    )[0];

    insight.textContent =
        `รายการ "${nearest.name}" ครบกำหนด ${nearest.due}`;

}

/* ---------- Contract List ---------- */

function renderContractList(contracts) {

    const list =
        document.getElementById("contractList");

    list.innerHTML = "";

    if (!contracts.length) {

        list.innerHTML = `

            <div class="contract-card">

                <p>ยังไม่มีรายการผ่อน</p>

            </div>

        `;

        return;

    }

    contracts.forEach(contract => {

        list.appendChild(

            createContractCard(contract)

        );

    });

}

/* ---------- Card ---------- */

function createContractCard(contract) {

    const card =
        document.createElement("div");

    card.className =
        "contract-card slide-up";

    const percent =
        Math.round(progress(contract));

    const remainMonth =
        remainingMonths(contract);

    const badge =
        getStatusBadge(contract);

    card.innerHTML = `

        <div class="card-header">

            <div>

                <h4>${contract.name}</h4>

                <span class="badge ${badge.class}">

                    ${badge.text}

                </span>

            </div>

        </div>

        <div class="progress">

            <div
                class="progress-bar"
                style="width:${percent}%">
            </div>

        </div>

        <p>

            ความคืบหน้า

            <strong>${percent}%</strong>

        </p>

        <p>

            💰 คงเหลือ

            <strong>

                ${formatCurrency(contract.remain)}

            </strong>

        </p>

        <p>

            📅 ครบกำหนด

            <strong>

                ${contract.due}

            </strong>

        </p>

        <p>

            งวดที่เหลือ

            <strong>

                ${remainMonth}

            </strong>

        </p>

        <div class="card-actions">

            <button
                class="edit-btn"
                data-id="${contract.id}">

                ✏️

            </button>

            <button
                class="pay-btn"
                data-id="${contract.id}">

                ✅

            </button>

            <button
                class="delete-btn"
                data-id="${contract.id}">

                🗑️

            </button>

        </div>

    `;

    return card;

}
/* ---------- Status Badge ---------- */

function getStatusBadge(contract) {

    if (contract.remain <= 0) {
        return {
            class: "success",
            text: "ชำระครบ"
        };
    }

    const todayDate = new Date();
    const dueDate = new Date(contract.due);

    const diffDays = Math.ceil(
        (dueDate - todayDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 3) {
        return {
            class: "danger",
            text: "ใกล้ครบกำหนด"
        };
    }

    return {
        class: "warning",
        text: "กำลังผ่อน"
    };

}

/* ---------- Card Events ---------- */

function bindCardEvents() {

    document.querySelectorAll(".pay-btn").forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            payInstallment(id);

            refreshDashboard();

        });

    });

    document.querySelectorAll(".delete-btn").forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            if (confirm("ลบรายการนี้ใช่หรือไม่?")) {

                removeContract(id);

                refreshDashboard();

            }

        });

    });

    document.querySelectorAll(".edit-btn").forEach(button => {

        button.addEventListener("click", () => {

            alert("ระบบแก้ไขจะเพิ่มในเวอร์ชันถัดไป");

        });

    });

}

/* ---------- Refresh ---------- */

function refreshDashboard() {

    renderDashboard();

    bindCardEvents();

}
