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
const canvas =
document.getElementById("progressCircle");

const ctx =
canvas.getContext("2d");

const percent =
contract.paidInstallments /
contract.totalInstallments;

// พื้นหลัง
ctx.lineWidth = 10;
ctx.strokeStyle = "#374151";

ctx.beginPath();
ctx.arc(55,55,40,0,Math.PI*2);
ctx.stroke();

// วงเปอร์เซ็นต์
ctx.strokeStyle = "#4f7cff";

ctx.beginPath();
ctx.arc(
55,
55,
40,
-Math.PI/2,
(percent*2*Math.PI)-Math.PI/2
);
ctx.stroke();

// ตัวเลข
ctx.fillStyle = "#ffffff";
ctx.font = "bold 20px Prompt";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText(
Math.round(percent*100)+"%",
55,
55
);
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
const today = new Date();

today.setHours(0,0,0,0);
dueDate.setHours(0,0,0,0);

const diffDay = Math.floor(
    (dueDate - today) / 86400000
);

let statusColor = "#9ca3af";
let dueStatus = "";

if (paid) {

    dueStatus = "✅ ชำระแล้ว";

} else if (diffDay < 0) {

    dueStatus = `🔴 เลยกำหนด ${Math.abs(diffDay)} วัน`;

} else if (diffDay === 0) {

    dueStatus = "🟡 ครบกำหนดวันนี้";

} else {

    dueStatus = `⏳ เหลืออีก ${diffDay} วัน`;

}
if (paid) {
    statusColor = "#22c55e";
} else if (diffDay < 0) {
    statusColor = "#ef4444";
} else if (diffDay <= 3) {
    statusColor = "#facc15";
}
    list.innerHTML += `

    <div class="contract-card"
style="border-left:5px solid ${statusColor}">

        <div class="contract-header">

            <div>

                <div class="contract-name">
                    งวดที่ ${i}
                </div>

                
<div class="contract-store">

<div style="margin-top:6px;font-size:13px;opacity:.8">

📅 ${dueText}

<br>

<span style="
color:${statusColor};
font-weight:600;
">

${dueStatus}

</span>

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