let contracts = JSON.parse(localStorage.getItem("contracts")) || [];

const totalPay = document.getElementById("totalPay");
const remainTotal = document.getElementById("remainTotal");
const paidPercent = document.getElementById("paidPercent");
const contractCount = document.getElementById("contractCount");
const contractsBox = document.getElementById("contracts");

const sheet = document.getElementById("sheet");

document.getElementById("addBtn").onclick = openSheet;
document.getElementById("fab").onclick = openSheet;
document.getElementById("closeSheet").onclick = closeSheet;
document.getElementById("saveContract").onclick = saveContract;

function openSheet(){
    sheet.classList.remove("hidden");
}

function closeSheet(){
    sheet.classList.add("hidden");
}

function saveContract(){

    const name=document.getElementById("productName").value.trim();
    const store=document.getElementById("storeName").value.trim();
    const amount=Number(document.getElementById("monthlyPay").value);
    const remain=Number(document.getElementById("remainPay").value);
    const total=Number(document.getElementById("totalInstallments").value);
    const paid=Number(document.getElementById("paidInstallments").value);

    if(!name){
        alert("กรุณากรอกชื่อสินค้า");
        return;
    }

    contracts.push({
        id:Date.now(),
        icon:"📱",
        name,
        store,
        amount,
        remain,
        total,
        paid
    });

    localStorage.setItem("contracts",JSON.stringify(contracts));

    clearForm();

    closeSheet();

    render();

}

function clearForm(){

    productName.value="";
    storeName.value="";
    monthlyPay.value="";
    remainPay.value="";
    totalInstallments.value="";
    paidInstallments.value="0";

}

function render(){

    contractsBox.innerHTML="";

    let totalMonth=0;
    let totalRemain=0;
    let paidAll=0;
    let totalAll=0;

    contracts.forEach(item=>{

        totalMonth+=item.amount;
        totalRemain+=item.remain;
        paidAll+=item.paid;
        totalAll+=item.total;

        const percent=item.total===0?0:
        Math.round(item.paid/item.total*100);

        contractsBox.innerHTML+=`

<div class="contract-card">

<div class="contract-header">

<div class="contract-left">

<div class="contract-icon">

${item.icon}

</div>

<div>

<div class="contract-name">

${item.name}

</div>

<div class="contract-store">

${item.store}

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

<div>

งวด ${item.paid}/${item.total}

</div>

<div>

${item.remain.toLocaleString()} บาท

</div>

</div>

<div class="card-buttons">

<button class="btn btn-primary">

รายละเอียด

</button>

<button
class="btn btn-danger"
onclick="removeContract(${item.id})">

ลบ

</button>

</div>

</div>

`;

    });

    totalPay.textContent=
    totalMonth.toLocaleString()+" บาท";

    remainTotal.textContent=
    totalRemain.toLocaleString()+" บาท";

    contractCount.textContent=
    contracts.length+" รายการ";

    paidPercent.textContent=
    totalAll===0?
    "0%":
    Math.round(paidAll/totalAll*100)+"%";

}

function removeContract(id){

    if(!confirm("ลบรายการนี้?")) return;

    contracts=contracts.filter(c=>c.id!==id);

    localStorage.setItem("contracts",JSON.stringify(contracts));

    render();

}

render();