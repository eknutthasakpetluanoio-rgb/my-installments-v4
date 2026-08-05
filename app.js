/*==================================
 My Installments V4
==================================*/

const STORAGE_KEY = "contracts";

let contracts =
JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let editingId = null;

/*==================================
 Hero
==================================*/

const totalPay =
document.getElementById("totalPay");

const remainTotal =
document.getElementById("remainTotal");

const paidPercent =
document.getElementById("paidPercent");

const contractCount =
document.getElementById("contractCount");

const remainInstallments =
document.getElementById("remainInstallments");

const heroProgress =
document.getElementById("heroProgress");

/*==================================
 Layout
==================================*/

const contractsBox =
document.getElementById("contracts");

const alertBox =
document.getElementById("alertBox");

/*==================================
 Buttons
==================================*/

const addBtn =
document.getElementById("addBtn");

const fab =
document.getElementById("fab");

const sheet =
document.getElementById("sheet");

const closeSheet =
document.getElementById("closeSheet");

const saveBtn =
document.getElementById("saveContract");

/*==================================
 Inputs
==================================*/

const productName =
document.getElementById("productName");

const storeName =
document.getElementById("storeName");

const monthlyPay =
document.getElementById("monthlyPay");

const remainPay =
document.getElementById("remainPay");

const totalInstallments =
document.getElementById("totalInstallments");

const paidInstallments =
document.getElementById("paidInstallments");

const firstPayDate =
document.getElementById("firstPayDate");

const payCycle =
document.getElementById("payCycle");

/*==================================
 Bottom Sheet
==================================*/

function openSheet(){

    sheet.classList.remove("hidden");

}

function closeSheetUI(){

    sheet.classList.add("hidden");

    editingId = null;

    resetForm();

}

addBtn.onclick = openSheet;

if(fab){

    fab.onclick = openSheet;

}

closeSheet.onclick = closeSheetUI;

sheet.onclick = e=>{

    if(e.target===sheet){

        closeSheetUI();

    }

};

/*==================================
 Storage
==================================*/

function saveStorage(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(contracts)

    );

}

/*==================================
 Reset Form
==================================*/

function resetForm(){

    productName.value = "";

    storeName.value = "";

    monthlyPay.value = "";

    remainPay.value = "";

    totalInstallments.value = "";

    paidInstallments.value = 0;

    firstPayDate.value = "";

    payCycle.value = 30;

}

/*==================================
 Save Contract
==================================*/

saveBtn.onclick = ()=>{

    if(

        productName.value.trim()==="" ||

        monthlyPay.value===""

    ){

        alert("กรุณากรอกข้อมูลให้ครบ");

        return;

    }

    const item={

        id:editingId || Date.now(),

        productName:productName.value,

        storeName:storeName.value,

        monthlyPay:Number(monthlyPay.value),

        remainPay:Number(remainPay.value),

        totalInstallments:Number(totalInstallments.value),

        paidInstallments:Number(paidInstallments.value),

        firstPayDate:firstPayDate.value,

        payCycle:Number(payCycle.value)

    };
    if(editingId){

        const index =
        contracts.findIndex(
            c => c.id === editingId
        );

        if(index !== -1){

            contracts[index] = item;

        }

    }else{

        contracts.push(item);

    }

    saveStorage();

    closeSheetUI();

    render();

};

/*==================================
 Delete
==================================*/

function deleteContract(id){

    if(!confirm("ลบรายการนี้ ?")){

        return;

    }

    contracts = contracts.filter(

        item => item.id !== id

    );

    saveStorage();

    render();

}

/*==================================
 Edit
==================================*/

function editContract(id){

    const item = contracts.find(

        c => c.id === id

    );

    if(!item){

        return;

    }

    editingId = item.id;

    productName.value =
    item.productName;

    storeName.value =
    item.storeName;

    monthlyPay.value =
    item.monthlyPay;

    remainPay.value =
    item.remainPay;

    totalInstallments.value =
    item.totalInstallments;

    paidInstallments.value =
    item.paidInstallments;

    firstPayDate.value =
    item.firstPayDate;

    payCycle.value =
    item.payCycle;

    openSheet();

}

/*==================================
 Summary
==================================*/

function updateSummary(

    monthTotal,

    remain,

    paid,

    total

){

    const percent =

    total > 0

    ?

    Math.round(

    (paid / total) * 100

    )

    :

    0;

    totalPay.textContent =
    "฿" +
    monthTotal.toLocaleString();

    remainTotal.textContent =
    "฿" +
    remain.toLocaleString();

    paidPercent.textContent =
    percent + "%";

    contractCount.textContent =
    contracts.length + " สัญญา";

    remainInstallments.textContent =
    "เหลือ " +
    (total - paid) +
    " งวด";

    heroProgress.style.width =
    percent + "%";

}
/*==================================
 Render
==================================*/

function render(){

    let monthTotal = 0;
    let remain = 0;
    let paid = 0;
    let total = 0;

    contractsBox.innerHTML = "";
    alertBox.innerHTML = "";

    if(contracts.length === 0){

        contractsBox.innerHTML = `
        <div class="empty-state">
            <span class="material-symbols-rounded">
                inventory_2
            </span>

            <h3>ยังไม่มีรายการผ่อน</h3>

            <p>กดปุ่ม + เพื่อเพิ่มรายการแรก</p>
        </div>`;

        updateSummary(0,0,0,0);

        return;

    }

    contracts.forEach(item=>{

        monthTotal += item.monthlyPay;
        remain += item.remainPay;
        paid += item.paidInstallments;
        total += item.totalInstallments;

        const percent =
        item.totalInstallments > 0
        ?
        Math.round(
        (item.paidInstallments /
        item.totalInstallments)*100
        )
        :
        0;

        const card =
        document.createElement("div");

        card.className =
        "contract-card";

        card.innerHTML = `

<h3>${item.productName}</h3>

<p>${item.storeName}</p>

<p>
ค่างวด
${item.monthlyPay.toLocaleString()}
บาท / เดือน
</p>

<p>
ยอดคงเหลือ
${item.remainPay.toLocaleString()}
บาท
</p>

<div class="hero-progress">

<div
class="hero-progress-bar"
style="width:${percent}%">

</div>

</div>

<p style="margin-top:10px">

${item.paidInstallments}

/

${item.totalInstallments}

งวด

</p>

<div class="card-actions">

<button class="btn btn-primary detail-btn">

รายละเอียด

</button>

<button class="btn btn-secondary edit-btn">

แก้ไข

</button>

<button class="icon-btn delete-btn">

<span class="material-symbols-rounded">

delete

</span>

</button>

</div>

`;

        card.querySelector(".detail-btn").onclick = (e)=>{

    e.stopPropagation();

    localStorage.setItem(
        "currentContract",
        item.id
    );

    location.href="detail.html";

};

        card.querySelector(
        ".edit-btn"
        ).addEventListener(
        "click",
        e=>{

            e.stopPropagation();

            editContract(item.id);

        });

        card.querySelector(
        ".delete-btn"
        ).addEventListener(
        "click",
        e=>{

            e.stopPropagation();

            deleteContract(item.id);

        });

        contractsBox.appendChild(card);

    });

    updateSummary(

        monthTotal,

        remain,

        paid,

        total

    );

}

/*==================================
 Start
==================================*/

render();