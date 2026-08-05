// app.js v1
// ระบบพื้นฐานของ My Installments

let contracts = JSON.parse(localStorage.getItem("contracts")) || [];

const contractsEl = document.getElementById("contracts");
const totalPayEl = document.getElementById("totalPay");
const remainTotalEl = document.getElementById("remainTotal");
const paidPercentEl = document.getElementById("paidPercent");
const contractCountEl = document.getElementById("contractCount");

function saveData() {
    localStorage.setItem("contracts", JSON.stringify(contracts));
}

function renderDashboard() {

    let totalPay = 0;
    let totalRemain = 0;
    let paid = 0;
    let total = 0;

    contracts.forEach(item => {
        totalPay += Number(item.monthlyPay);
        totalRemain += Number(item.remainPay);
        paid += Number(item.paidInstallments);
        total += Number(item.totalInstallments);
    });

    totalPayEl.textContent =
        totalPay.toLocaleString() + " บาท";

    remainTotalEl.textContent =
        totalRemain.toLocaleString() + " บาท";

    contractCountEl.textContent =
        contracts.length + " สัญญา";

    if(total===0){
        paidPercentEl.textContent="0%";
    }else{
        paidPercentEl.textContent=
        Math.round((paid/total)*100)+"%";
    }

}
function renderContracts() {

    contractsEl.innerHTML = "";

    if (contracts.length === 0) {

        contractsEl.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">📦</div>
            <h3>ยังไม่มีรายการผ่อน</h3>
            <p>กดปุ่ม + เพื่อเพิ่มรายการแรกของคุณ</p>
        </div>
        `;

        return;
    }

    contracts.forEach(item => {

        const percent = item.totalInstallments === 0
            ? 0
            : Math.round((item.paidInstallments / item.totalInstallments) * 100);

        contractsEl.innerHTML += `

<div class="contract-card">

    <div class="contract-header">

        <div class="contract-left">

            <div class="contract-icon">
                📱
            </div>

            <div>

                <div class="contract-name">
                    ${item.productName}
                </div>

                <div class="contract-store">
                    ${item.storeName}
                </div>

            </div>

        </div>

    </div>

    <div class="progress">

        <div class="progress-bar"
             style="width:${percent}%">
        </div>

    </div>

    <div class="contract-info">

        <span>
            งวด ${item.paidInstallments}/${item.totalInstallments}
        </span>

        <span>
            ${Number(item.remainPay).toLocaleString()} บาท
        </span>

    </div>

    <div class="card-buttons">

        <button class="btn btn-primary">
            รายละเอียด
        </button>

        <button
        class="btn btn-danger"
        onclick="deleteContract(${item.id})">
            ลบ
        </button>

    </div>

</div>

`;

    });

}
function saveContract() {

    const productName =
        document.getElementById("productName").value.trim();

    const storeName =
        document.getElementById("storeName").value.trim();

    const monthlyPay =
        Number(document.getElementById("monthlyPay").value);

    const remainPay =
        Number(document.getElementById("remainPay").value);

    const totalInstallments =
        Number(document.getElementById("totalInstallments").value);

    const paidInstallments =
        Number(document.getElementById("paidInstallments").value);

    if (
        productName === "" ||
        monthlyPay <= 0 ||
        totalInstallments <= 0
    ) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    contracts.push({

        id: Date.now(),

        productName,

        storeName,

        monthlyPay,

        remainPay,

        totalInstallments,

        paidInstallments

    });

    saveData();

    renderDashboard();

    renderContracts();

    closeSheet();

    clearForm();

}
function clearForm(){

    document.getElementById("productName").value="";
    document.getElementById("storeName").value="";
    document.getElementById("monthlyPay").value="";
    document.getElementById("remainPay").value="";
    document.getElementById("totalInstallments").value="";
    document.getElementById("paidInstallments").value="0";

}
function deleteContract(id){

    if(!confirm("ลบรายการนี้ใช่ไหม?")) return;

    contracts = contracts.filter(item=>item.id!==id);

    saveData();

    renderDashboard();

    renderContracts();

}
renderDashboard();
renderContracts();
