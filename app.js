// ===============================
// My Installments v2
// app.js
// ===============================

let contracts = JSON.parse(localStorage.getItem("contracts")) || [];

// Dashboard
const totalPay = document.getElementById("totalPay");
const remainTotal = document.getElementById("remainTotal");
const paidPercent = document.getElementById("paidPercent");
const contractCount = document.getElementById("contractCount");

// List
const contractsBox = document.getElementById("contracts");

// Bottom Sheet
const sheet = document.getElementById("sheet");

const addBtn = document.getElementById("addBtn");
const fab = document.getElementById("fab");
const closeBtn = document.getElementById("closeSheet");
const saveBtn = document.getElementById("saveContract");

// ===============================
// Event
// ===============================

addBtn.addEventListener("click", openSheet);
fab.addEventListener("click", openSheet);
closeBtn.addEventListener("click", closeSheet);
saveBtn.addEventListener("click", saveContract);

// ===============================

function openSheet(){

    sheet.classList.remove("hidden");

}

function closeSheet(){

    sheet.classList.add("hidden");

}

function saveData(){

    localStorage.setItem(
        "contracts",
        JSON.stringify(contracts)
    );

}
// ===============================
// Dashboard
// ===============================

function renderDashboard(){

    let monthTotal = 0;
    let remain = 0;
    let paid = 0;
    let total = 0;

    contracts.forEach(item=>{

        monthTotal += Number(item.monthlyPay);

        remain += Number(item.remainPay);

        paid += Number(item.paidInstallments);

        total += Number(item.totalInstallments);

    });

    totalPay.textContent =
        monthTotal.toLocaleString() + " บาท";

    remainTotal.textContent =
        remain.toLocaleString() + " บาท";

    contractCount.textContent =
        contracts.length + " สัญญา";

    if(total===0){

        paidPercent.textContent="0%";

    }else{

        paidPercent.textContent =
        Math.round((paid/total)*100) + "%";

    }

}
// ===============================
// Render Contracts
// ===============================

function renderContracts(){

    contractsBox.innerHTML = "";

    if(contracts.length === 0){

        contractsBox.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">📦</div>
            <h3>ยังไม่มีรายการผ่อน</h3>
            <p>กดปุ่ม + เพื่อเพิ่มรายการแรกของคุณ</p>
        </div>
        `;

        return;
    }

    contracts.forEach(item=>{

        const percent =
        item.totalInstallments == 0
        ? 0
        : Math.round(
            (item.paidInstallments / item.totalInstallments) * 100
        );

        contractsBox.innerHTML += `

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
// ===============================
// Save Contract
// ===============================

function saveContract(){

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

    if(
        productName === "" ||
        monthlyPay <= 0 ||
        totalInstallments <= 0
    ){
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

    render();

    clearForm();

    closeSheet();

}

// ===============================

function clearForm(){

    document.getElementById("productName").value = "";
    document.getElementById("storeName").value = "";
    document.getElementById("monthlyPay").value = "";
    document.getElementById("remainPay").value = "";
    document.getElementById("totalInstallments").value = "";
    document.getElementById("paidInstallments").value = "0";

}

// ===============================

function deleteContract(id){

    if(!confirm("ลบรายการนี้ใช่ไหม?")){

        return;

    }

    contracts = contracts.filter(item => item.id !== id);

    saveData();

    render();

}

// ===============================

function render(){

    renderDashboard();

    renderContracts();

}

// ===============================

render();
// ===============================
// Save Contract
// ===============================

function saveContract() {

    const productName = document.getElementById("productName").value.trim();
    const storeName = document.getElementById("storeName").value.trim();
    const monthlyPay = Number(document.getElementById("monthlyPay").value);
    const remainPay = Number(document.getElementById("remainPay").value);
    const totalInstallments = Number(document.getElementById("totalInstallments").value);
    const paidInstallments = Number(document.getElementById("paidInstallments").value);

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
    render();
    clearForm();
    closeSheet();
}

function clearForm() {

    document.getElementById("productName").value = "";
    document.getElementById("storeName").value = "";
    document.getElementById("monthlyPay").value = "";
    document.getElementById("remainPay").value = "";
    document.getElementById("totalInstallments").value = "";
    document.getElementById("paidInstallments").value = "0";

}
// ===============================
// Delete Contract
// ===============================

function deleteContract(id){

    if(!confirm("ลบรายการนี้ใช่ไหม?")){
        return;
    }

    contracts = contracts.filter(item => item.id !== id);

    saveData();

    render();

}

// ===============================
// Render All
// ===============================

function render(){

    renderDashboard();

    renderContracts();

}

// ===============================
// Start App
// ===============================

render();
// ===============================
// Events
// ===============================

addBtn.addEventListener("click", openSheet);

fab.addEventListener("click", openSheet);

closeBtn.addEventListener("click", closeSheet);

saveBtn.addEventListener("click", saveContract);

// ===============================
// Open / Close Bottom Sheet
// ===============================

function openSheet(){

    sheet.classList.remove("hidden");

}

function closeSheet(){

    sheet.classList.add("hidden");

}

// ===============================
// Local Storage
// ===============================

function saveData(){

    localStorage.setItem(
        "contracts",
        JSON.stringify(contracts)
    );

}

function loadData(){

    const data =
    localStorage.getItem("contracts");

    if(data){

        contracts = JSON.parse(data);

    }

}

// ===============================
// Start App
// ===============================

loadData();

render();
// ===============================
// Render Contracts
// ===============================

function renderContracts(){

    contractsBox.innerHTML = "";

    if(contracts.length === 0){

        contractsBox.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">📦</div>

                <h3>ยังไม่มีรายการผ่อน</h3>

                <p>กดปุ่ม + เพื่อเพิ่มรายการแรกของคุณ</p>

            </div>
        `;

        return;

    }

    contracts.forEach(item=>{

        const percent =
        Math.round(
            (item.paidInstallments / item.totalInstallments) * 100
        );

        contractsBox.innerHTML += `

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

        <div
            class="progress-bar"
            style="width:${percent}%">
        </div>

    </div>

    <div class="contract-info">

        <span>

            ${item.paidInstallments} / ${item.totalInstallments} งวด

        </span>

        <span>

            เหลือ ${Number(item.remainPay).toLocaleString()} บาท

        </span>

    </div>

    <div class="card-buttons">

        <button
            class="btn btn-primary"
            onclick="viewDetail(${item.id})">

            รายละเอียด

        </button>

        <button
            class="btn btn-danger"
            onclick="deleteContract(${item.id})">

            ลบ

        </button>
<!DOCTYPE html>
<html lang="th">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>รายละเอียดสัญญา</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="style.css">

</head>

<body>

<header class="topbar">

    <button class="icon-btn"
        onclick="history.back()">
        ←
    </button>

    <div>

        <h1>รายละเอียด</h1>

        <p>ข้อมูลสัญญา</p>

    </div>

</header>

<main class="detail-page">

<div class="hero-card">

    <div class="contract-icon"
        style="margin:auto;font-size:42px;">

        📱

    </div>

    <h2 id="dProduct">

        vivo V70

    </h2>

    <p id="dStore">

        SABAIRENTAL

    </p>

    <div class="progress">

        <div
            id="detailProgress"
            class="progress-bar">

        </div>

    </div>

    <p id="dPercent">

        0%

    </p>

</div>

<section class="summary-card">

<h3>ข้อมูลสินค้า</h3>

<div class="row">

<span>ชื่อสินค้า</span>

<strong id="name"></strong>

</div>

<div class="row">

<span>ร้านค้า</span>

<strong id="store"></strong>

</div>

<div class="row">

<span>ยอดคงเหลือ</span>

<strong id="remain"></strong>

</div>

<div class="row">

<span>จำนวนงวด</span>

<strong id="installments"></strong>

</div>

</section>

<section class="summary-card">

<h3>ข้อมูลการผ่อน</h3>

<div class="row">

<span>ค่างวดต่อเดือน</span>

<strong id="monthly"></strong>

</div>

<div class="row">

<span>ชำระแล้ว</span>

<strong id="paid"></strong>

</div>

<div class="row">

<span>คงเหลือ</span>

<strong id="left"></strong>

</div>

</section>

<section class="summary-card">

<h3>การชำระ</h3>

<button
class="save-btn"
id="payBtn">

ชำระงวดนี้

</button>

</section>

</main>

<script src="detail.js"></script>

</body>
</html>

    </div>

</div>

`;

    });

}

function viewDetail(id){

    localStorage.setItem(
        "currentContract",
        id
    );

    window.location.href =
    "detail.html";

}
