// ======================================
// detail.js
// ======================================

const contracts =
JSON.parse(localStorage.getItem("contracts")) || [];

const currentId =
Number(localStorage.getItem("currentContract"));

const contract =
contracts.find(item => item.id === currentId);

if (!contract) {
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
`${contract.paidInstallments} / ${contract.totalInstallments}`;

document.getElementById("leftText").textContent =
`${contract.totalInstallments - contract.paidInstallments} งวด`;

document.getElementById("monthlyPayText").textContent =
Number(contract.monthlyPay).toLocaleString() + " บาท";

document.getElementById("totalInstallmentsText").textContent =
contract.totalInstallments + " งวด";

// ===============================
// สร้างรายการงวด
// ===============================

const list =
document.getElementById("installmentList");
const startDate =
new Date(contract.firstPayDate);

const payCycle =
Number(contract.payCycle || 7);

list.innerHTML = "";

for (let i = 1; i <= contract.totalInstallments; i++) {

    const paid =
        i <= contract.paidInstallments;

    const current =
        i === contract.paidInstallments + 1;
const dueDate = new Date(startDate);

if (payCycle === 30) {
    dueDate.setMonth(
        dueDate.getMonth() + (i - 1)
    );
} else {
    dueDate.setDate(
        dueDate.getDate() + ((i - 1) * payCycle)
    );
}


const dueText =
dueDate.toLocaleDateString("th-TH");
    list.innerHTML += `

    <div class="contract-card">

        <div class="contract-header">

            <div>

                <div class="contract-name">
                    งวดที่ ${i}
                </div>

                
<div class="contract-store">

${paid ? "✅ ชำระแล้ว" : "⏳ รอชำระ"}

<div style="margin-top:6px;font-size:13px;opacity:.8">

📅 ${dueText}

</div>

</div>
            </div>

            <div>
                ${Number(contract.monthlyPay).toLocaleString()} บาท
            </div>

        </div>

        ${
            (!paid && current)
            ?
            `
            <button
                class="btn btn-primary"
                onclick="payInstallment()">

                ชำระงวดนี้

            </button>
            `
            :
            ""
        }

    </div>

    `;
}
// ===============================
// ชำระงวด
// ===============================

function payInstallment(){

    if(
        contract.paidInstallments >=
        contract.totalInstallments
    ){
        return;
    }

    // เพิ่มจำนวนงวดที่ชำระ
    contract.paidInstallments++;

    // ลดเงินคงเหลือ
    contract.remainPay =
        Math.max(
            0,
            contract.remainPay - contract.monthlyPay
        );

    // อัปเดตข้อมูลใน contracts
    const index =
        contracts.findIndex(
            item => item.id === contract.id
        );

    if(index !== -1){

        contracts[index] = contract;

    }

    // บันทึก LocalStorage
    localStorage.setItem(
        "contracts",
        JSON.stringify(contracts)
    );

    // รีโหลดหน้า
    location.reload();

}