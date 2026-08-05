/*==================================
 My Installments V2
==================================*/

const STORAGE_KEY = "installments_v2";

let contracts = JSON.parse(
localStorage.getItem(STORAGE_KEY)
) || [];

const totalPay =
document.getElementById("totalPay");

const contractCount =
document.getElementById("contractCount");

const remainInstallments =
document.getElementById("remainInstallments");

const remainTotal =
document.getElementById("remainTotal");

const paidPercent =
document.getElementById("paidPercent");

const heroProgress =
document.getElementById("heroProgress");

const contractsBox =
document.getElementById("contracts");

const addBtn =
document.getElementById("addBtn");

const fab =
document.getElementById("fab");

const sheet =
document.getElementById("sheet");

const saveBtn =
document.getElementById("saveContract");
/*==================================
 Bottom Sheet
==================================*/

function openSheet() {
  sheet.classList.remove("hidden");
}

function closeSheet() {
  sheet.classList.add("hidden");
}

addBtn.addEventListener("click", openSheet);
fab.addEventListener("click", openSheet);

sheet.addEventListener("click", (e) => {
  if (e.target === sheet) {
    closeSheet();
  }
});

/*==================================
 Save Contract
==================================*/

saveBtn.addEventListener("click", () => {

  const item = {

    id: Date.now(),

    product: document.getElementById("productName").value,

    store: document.getElementById("storeName").value,

    monthly: Number(
      document.getElementById("monthlyPay").value
    ),

    remain: Number(
      document.getElementById("remainPay").value
    ),

    total: Number(
      document.getElementById("totalInstallments").value
    ),

    paid: Number(
      document.getElementById("paidInstallments").value
    ),

    firstDate:
      document.getElementById("firstPayDate").value,

    cycle:
      document.getElementById("payCycle").value

  };

  contracts.push(item);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(contracts)
  );

  render();

  closeSheet();

});
/*==================================
 Render
==================================*/

function render() {

let monthTotal = 0;
let remain = 0;
let paid = 0;
let total = 0;

if (contracts.length === 0) {

contractsBox.innerHTML = `

<div class="empty-state">

<span class="material-symbols-rounded">

inventory_2

</span>

<h3>ยังไม่มีรายการผ่อน</h3>

<p>กดปุ่ม + เพื่อเพิ่มรายการแรก</p>

</div>

`;

totalPay.textContent = "฿0";
remainTotal.textContent = "฿0";
contractCount.textContent = "0 สัญญา";
remainInstallments.textContent = "เหลือ 0 งวด";
paidPercent.textContent = "0%";
heroProgress.style.width = "0%";

return;

}

contractsBox.innerHTML = "";

contracts.forEach(item=>{

monthTotal += item.monthly;
remain += item.remain;
paid += item.paid;
total += item.total;

const percent =
item.total === 0
?0
:Math.round(
(item.paid/item.total)*100
);

contractsBox.innerHTML += `

<div class="summary-card" style="margin-bottom:16px;">

<h3>${item.product}</h3>

<p>${item.store}</p>

<p>ค่างวด ${item.monthly.toLocaleString()} บาท</p>

<p>คงเหลือ ${item.remain.toLocaleString()} บาท</p>

<p>${item.paid}/${item.total} งวด</p>

<div class="hero-progress">

<div
class="hero-progress-bar"
style="width:${percent}%">

</div>

</div>

</div>

`;

});

const payPercent =
total===0
?0
:Math.round((paid/total)*100);

totalPay.textContent =
"฿"+monthTotal.toLocaleString();

remainTotal.textContent =
"฿"+remain.toLocaleString();

contractCount.textContent =
contracts.length+" สัญญา";

remainInstallments.textContent =
"เหลือ "+(total-paid)+" งวด";

paidPercent.textContent =
payPercent+"%";

heroProgress.style.width =
payPercent+"%";

}

/*==================================
 Start
==================================*/

render();
