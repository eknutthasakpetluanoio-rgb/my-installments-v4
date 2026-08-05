// ======================================
// detail.js
// ======================================

const contracts =
JSON.parse(localStorage.getItem("contracts")) || [];

const currentId =
Number(localStorage.getItem("currentContract"));

const contract =
contracts.find(item => item.id === currentId);

if(!contract){

    alert("ไม่พบข้อมูลสัญญา");

    history.back();

}

// ===============================
// แสดงข้อมูลด้านบน
// ===============================

document.getElementById("productName").textContent =
contract.productName;

document.getElementById("storeName").textContent =
contract.storeName;

document.getElementById("remainPrice").textContent =
Number(contract.remainPay).toLocaleString() + " บาท";

document.getElementById("paidText").textContent =
contract.paidInstallments +
" / " +
contract.totalInstallments;

document.getElementById("leftText").textContent =
(contract.totalInstallments - contract.paidInstallments)
+ " งวด";

// ===============================
// ตารางงวด
// ===============================

const list =
document.getElementById("installmentList");

list.innerHTML = "";

for(
    let i = 1;
    i <= contract.totalInstallments;
    i++
){

    const paid =
    i <= contract.paidInstallments;

    list.innerHTML += `

<div class="contract-card">

<div class="contract-header">

<div>

<div class="contract-name">

งวดที่ ${i}

</div>

<div class="contract-store">

${paid ? "ชำระแล้ว" : "รอชำระ"}

</div>

</div>

<div>

${Number(contract.monthlyPay).toLocaleString()} บาท

</div>

</div>

</div>

`;

}
