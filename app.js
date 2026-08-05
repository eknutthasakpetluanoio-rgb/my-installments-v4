// ======================================
// My Installments v1
// app.js
// ======================================

// ---------- Local Storage ----------

let contracts =
JSON.parse(
localStorage.getItem("contracts")
) || [];

// ---------- Dashboard ----------

const totalPay =
document.getElementById("totalPay");

const remainTotal =
document.getElementById("remainTotal");

const paidPercent =
document.getElementById("paidPercent");

const contractCount =
document.getElementById("contractCount");

// ---------- List ----------

const contractsBox =
document.getElementById("contracts");
const alertBox =
document.getElementById("alertBox");
// ---------- Bottom Sheet ----------

const sheet =
document.getElementById("sheet");

const addBtn =
document.getElementById("addBtn");

const fab =
document.getElementById("fab");

const closeBtn =
document.getElementById("closeSheet");

const saveBtn =
document.getElementById("saveContract");

// ======================================
// Event
// ======================================

addBtn.onclick = openSheet;

fab.onclick = openSheet;

closeBtn.onclick = closeSheet;

saveBtn.onclick = saveContract;

// ======================================

function openSheet(){

    sheet.classList.remove("hidden");

}

function closeSheet(){

    sheet.classList.add("hidden");

}

// ======================================

function saveData(){

    localStorage.setItem(

        "contracts",

        JSON.stringify(contracts)

    );

}
// ======================================
// Dashboard
// ======================================

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

    if(total === 0){

        paidPercent.textContent = "0%";

    }else{

        paidPercent.textContent =
            Math.round((paid / total) * 100) + "%";

    }

}

// ======================================
// Render Contracts
// ======================================

function renderContracts(){

    contractsBox.innerHTML = "";

    if(contracts.length === 0){

        contractsBox.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📦</div>
                <h3>ยังไม่มีรายการผ่อน</h3>
                <p>กดปุ่ม + เพื่อเพิ่มรายการแรก</p>
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

                    <div class="contract-icon">📱</div>

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
                    ${item.paidInstallments}/${item.totalInstallments} งวด
                </span>

                <span>
                    ${Number(item.remainPay).toLocaleString()} บาท
                </span>

            </div>

            <div class="card-buttons">

                <button
                    class="btn btn-primary"
                    onclick="viewDetail(${item.id})">

                    รายละเอียด

                </button>

                
<button
    class="btn btn-warning"
    onclick="editContract(${item.id})">

    แก้ไข

</button>
            </div>

        </div>
        `;

    });

}
// ======================================
// Save Contract
// ======================================

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
const firstPayDate =
document.getElementById("firstPayDate").value;

const payCycle =
Number(
document.getElementById("payCycle").value
);

    if(
        productName === "" ||
        monthlyPay <= 0 ||
        totalInstallments <= 0
    ){
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    contracts.push({

    id:Date.now(),

    productName,

    storeName,

    monthlyPay,

    remainPay,

    totalInstallments,

    paidInstallments,

    firstPayDate,

    payCycle

});

    saveData();

    clearForm();

    closeSheet();

    render();

}

// ======================================
// Clear Form
// ======================================

function clearForm(){

    document.getElementById("productName").value = "";

    document.getElementById("storeName").value = "";

    document.getElementById("monthlyPay").value = "";

    document.getElementById("remainPay").value = "";

    document.getElementById("totalInstallments").value = "";

    document.getElementById("paidInstallments").value = "0";

document.getElementById("firstPayDate").value = "";

document.getElementById("payCycle").value = "7";
}

// ======================================
// Delete
// ======================================
function editContract(id){

    const item = contracts.find(c => c.id === id);

    if(!item) return;

    document.getElementById("productName").value = item.productName;
    document.getElementById("storeName").value = item.storeName;
    document.getElementById("monthlyPay").value = item.monthlyPay;
    document.getElementById("remainPay").value = item.remainPay;
    document.getElementById("totalInstallments").value = item.totalInstallments;
    document.getElementById("paidInstallments").value = item.paidInstallments;
    document.getElementById("firstPayDate").value = item.firstPayDate || "";
    document.getElementById("payCycle").value = item.payCycle || 7;

    deleteContract(id);

    openSheet();

}
function deleteContract(id){

    if(!confirm("ลบรายการนี้ใช่ไหม?")){

        return;

    }

    contracts = contracts.filter(item => item.id !== id);

saveData();

openSheet();

}

// ======================================
// Detail
// ======================================

function viewDetail(id){

    localStorage.setItem(

        "currentContract",

        id

    );

    window.location.href = "detail.html";

    // ภายหลังเปลี่ยนเป็น
    // window.location.href = "detail.html";

}

// ======================================
// Render
// ======================================

function render(){

    renderDashboard();

    renderAlerts();

    renderContracts();



}

// ======================================
// Start App
// ======================================
render();

// Alerts...
function renderAlerts(){ ... }

// ======================================
// Render
// ======================================
// ======================================
// Alerts
// ======================================

function renderAlerts(){

    if(!alertBox) return;

    alertBox.innerHTML = "";

    const today = new Date();
    today.setHours(0,0,0,0);

    contracts.forEach(item=>{

        if(item.paidInstallments >= item.totalInstallments){
            return;
        }

        const start = new Date(item.firstPayDate);

        let due = new Date(start);

        const next =
            item.paidInstallments + 1;

        if(item.payCycle == 30){

            due.setMonth(
                due.getMonth() + (next - 1)
            );

        }else{

            due.setDate(
                due.getDate() +
                ((next - 1) * item.payCycle)
            );

        }

        due.setHours(0,0,0,0);

        const diff =
            Math.floor(
                (due - today) / 86400000
            );

        if(diff <= 7){

            let color = "#22c55e";
            let text = "";

            if(diff < 0){

                color = "#ef4444";
                text = `เลยกำหนด ${Math.abs(diff)} วัน`;

            }else if(diff === 0){

                color = "#facc15";
                text = "ครบกำหนดวันนี้";

            }else{

                color = "#3b82f6";
                text = `เหลืออีก ${diff} วัน`;

            }

            alertBox.innerHTML += `
            <div class="contract-card"
            style="border-left:5px solid ${color};margin-bottom:16px">

                <strong>${item.productName}</strong>

                <div style="margin-top:6px">
                    ${text}
                </div>

            </div>
            `;

        }

    });

}
