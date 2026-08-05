// =========================
// My Installments v1
// =========================

let contracts =
JSON.parse(localStorage.getItem("contracts")) || [];

const contractsEl =
document.getElementById("contracts");

const totalPayEl =
document.getElementById("totalPay");

const remainTotalEl =
document.getElementById("remainTotal");

const paidPercentEl =
document.getElementById("paidPercent");

const contractCountEl =
document.getElementById("contractCount");

function saveData(){

    localStorage.setItem(
        "contracts",
        JSON.stringify(contracts)
    );

}

function render(){

    renderDashboard();

    renderContracts();

}
function renderDashboard(){

    let totalPay = 0;
    let totalRemain = 0;
    let totalPaid = 0;
    let totalInstallments = 0;

    contracts.forEach(item=>{

        totalPay += Number(item.monthlyPay || 0);

        totalRemain += Number(item.remainPay || 0);

        totalPaid += Number(item.paidInstallments || 0);

        totalInstallments += Number(item.totalInstallments || 0);

    });

    totalPayEl.textContent =
        totalPay.toLocaleString() + " บาท";

    remainTotalEl.textContent =
        totalRemain.toLocaleString() + " บาท";

    contractCountEl.textContent =
        contracts.length + " สัญญา";

    if(totalInstallments===0){

        paidPercentEl.textContent="0%";

    }else{

        paidPercentEl.textContent =
        Math.round(
            (totalPaid/totalInstallments)*100
        ) + "%";

    }

}
function renderContracts(){

    contractsEl.innerHTML="";

    if(contracts.length===0){

        contractsEl.innerHTML=`
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
        item.totalInstallments==0
        ?0
        :Math.round(
            (item.paidInstallments/item.totalInstallments)*100
        );

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

                <div
                class="progress-bar"
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

        </div>
        `;

    });

}
function openSheet(){

    document
    .getElementById("sheet")
    .classList.remove("hidden");

}

function closeSheet(){

    document
    .getElementById("sheet")
    .classList.add("hidden");

}

function clearForm(){

    document.getElementById("productName").value="";
    document.getElementById("storeName").value="";
    document.getElementById("monthlyPay").value="";
    document.getElementById("remainPay").value="";
    document.getElementById("totalInstallments").value="";
    document.getElementById("paidInstallments").value="0";

}

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

    if(productName===""){

        alert("กรุณากรอกชื่อสินค้า");

        return;

    }

    contracts.push({

        id:Date.now(),

        productName,

        storeName,

        monthlyPay,

        remainPay,

        totalInstallments,

        paidInstallments

    });

    saveData();

    render();

    closeSheet();

    clearForm();

}
function deleteContract(id){

    if(!confirm("ลบรายการนี้ใช่ไหม?")){

        return;

    }

    contracts = contracts.filter(item=>item.id!==id);

    saveData();

    render();

}

document.getElementById("addBtn").onclick = openSheet;

document.getElementById("fab").onclick = openSheet;

document.getElementById("closeSheet").onclick = closeSheet;

document.getElementById("saveContract").onclick = saveContract;

render();