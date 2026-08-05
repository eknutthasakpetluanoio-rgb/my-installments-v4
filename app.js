/*==================================
 My Installments V2
==================================*/

const STORAGE_KEY = "installments_v2";

/* ---------- Data ---------- */

let contracts =
JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

/* ---------- Hero ---------- */

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

/* ---------- Layout ---------- */

const contractsBox =
document.getElementById("contracts");

const alertBox =
document.getElementById("alertBox");

/* ---------- Buttons ---------- */

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

/* ---------- Inputs ---------- */

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

function openSheet() {
  sheet.classList.remove("hidden");
}

function closeSheetUI() {
  sheet.classList.add("hidden");
}

addBtn.addEventListener("click", openSheet);
fab.addEventListener("click", openSheet);

closeSheet.addEventListener("click", closeSheetUI);

sheet.addEventListener("click", (e) => {
  if (e.target === sheet) {
    closeSheetUI();
  }
});

/*==================================
 Save
==================================*/

saveBtn.addEventListener("click", () => {

  if (
    productName.value.trim() === "" ||
    monthlyPay.value === ""
  ) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  const item = {

    id: Date.now(),

    product: productName.value,

    store: storeName.value,

    monthly: Number(monthlyPay.value),

    remain: Number(remainPay.value),

    total: Number(totalInstallments.value),

    paid: Number(paidInstallments.value),

    firstDate: firstPayDate.value,

    cycle: Number(payCycle.value)

  };
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
        <span class="material-symbols-rounded">inventory_2</span>
        <h3>ยังไม่มีรายการผ่อน</h3>
        <p>กดปุ่ม + เพื่อเพิ่มรายการแรก</p>
      </div>
    `;

    totalPay.textContent = "฿0";
    remainTotal.textContent = "฿0";
    paidPercent.textContent = "0%";
    contractCount.textContent = "0 สัญญา";
    remainInstallments.textContent = "เหลือ 0 งวด";
    heroProgress.style.width = "0%";

    return;
  }

  contractsBox.innerHTML = "";

  contracts.forEach(item => {

    monthTotal += item.monthly;
    remain += item.remain;
    paid += item.paid;
    total += item.total;

    const percent =
      item.total > 0
        ? Math.round((item.paid / item.total) * 100)
        : 0;

    const card = document.createElement("div");

    card.className = "contract-card";

    card.innerHTML = `
      <h3>${item.product}</h3>

      <p>${item.store}</p>

      <p>ค่างวด ${item.monthly.toLocaleString()} บาท / เดือน</p>

      <p>ยอดคงเหลือ ${item.remain.toLocaleString()} บาท</p>

      <div class="hero-progress">
        <div
          class="hero-progress-bar"
          style="width:${percent}%">
        </div>
      </div>

      <p style="margin-top:10px">
        ${item.paid} / ${item.total} งวด
      </p>
    `;

    contractsBox.appendChild(card);

  });

  const allPercent =
    total > 0
      ? Math.round((paid / total) * 100)
      : 0;

  totalPay.textContent =
    "฿" + monthTotal.toLocaleString();

  remainTotal.textContent =
    "฿" + remain.toLocaleString();

  paidPercent.textContent =
    allPercent + "%";

  contractCount.textContent =
    contracts.length + " สัญญา";

  remainInstallments.textContent =
    "เหลือ " + (total - paid) + " งวด";

  heroProgress.style.width =
    allPercent + "%";

}

/*==================================
 Start
==================================*/

render();
  contracts.push(item);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(contracts)
  );

  productName.value = "";
  storeName.value = "";
  monthlyPay.value = "";
  remainPay.value = "";
  totalInstallments.value = "";
  paidInstallments.value = "0";
  firstPayDate.value = "";
  payCycle.value = "30";

  closeSheetUI();

  render();

});
/*==================================
 Render
==================================*/

function render(){

    let monthTotal=0;
    let remain=0;
    let paid=0;
    let total=0;

    contractsBox.innerHTML="";
    alertBox.innerHTML="";

    if(contracts.length===0){

        contractsBox.innerHTML=`
        <div class="empty-state">
            <span class="material-symbols-rounded">
                inventory_2
            </span>
            <h3>ยังไม่มีรายการผ่อน</h3>
            <p>กดปุ่ม + เพื่อเพิ่มรายการแรก</p>
        </div>`;

        totalPay.textContent="฿0";
        remainTotal.textContent="฿0";
        paidPercent.textContent="0%";
        contractCount.textContent="0 สัญญา";
        remainInstallments.textContent="เหลือ 0 งวด";
        heroProgress.style.width="0%";

        return;
    }

    contracts.forEach(item=>{

        monthTotal+=item.monthlyPay;
        remain+=item.remainPay;
        paid+=item.paidInstallments;
        total+=item.totalInstallments;

        const percent=
        item.totalInstallments
        ?
        Math.round(
        (item.paidInstallments/item.totalInstallments)*100
        )
        :
        0;

        const card=document.createElement("div");

        card.className="contract-card";

        card.innerHTML=`

<h3>${item.productName}</h3>

<p>${item.storeName}</p>

<p>
ค่างวด
${item.monthlyPay.toLocaleString()}
บาท / เดือน
</p>

<div class="hero-progress">

<div class="hero-progress-bar"
style="width:${percent}%">

</div>

</div>

<p style="margin-top:10px">

${item.paidInstallments}

/

${item.totalInstallments}

งวด

</p>

<div style="
display:flex;
gap:10px;
margin-top:16px;
">

<button
class="icon-btn edit-btn">

<span class="material-symbols-rounded">

edit

</span>

</button>

<button
class="icon-btn delete-btn">

<span class="material-symbols-rounded">

delete

</span>

</button>

</div>

`;

        card.onclick=()=>{

            localStorage.setItem(
                "currentContract",
                item.id
            );

            location.href="detail.html";

        };

        card
        .querySelector(".edit-btn")
        .onclick=(e)=>{

            e.stopPropagation();

            editingId=item.id;

            productName.value=item.productName;
            storeName.value=item.storeName;
            monthlyPay.value=item.monthlyPay;
            remainPay.value=item.remainPay;
            totalInstallments.value=item.totalInstallments;
            paidInstallments.value=item.paidInstallments;
            firstPayDate.value=item.firstPayDate;
            payCycle.value=item.payCycle;

            openSheet();

        };

        card
        .querySelector(".delete-btn")
        .onclick=(e)=>{

            e.stopPropagation();

            if(!confirm("ลบรายการนี้ ?")) return;

            contracts=
            contracts.filter(
            x=>x.id!==item.id
            );

            saveStorage();

            render();

        };

        contractsBox.appendChild(card);

    });

    const allPercent=
    total
    ?
    Math.round((paid/total)*100)
    :
    0;

    totalPay.textContent=
    "฿"+
    monthTotal.toLocaleString();

    remainTotal.textContent=
    "฿"+
    remain.toLocaleString();

    paidPercent.textContent=
    allPercent+"%";

    contractCount.textContent=
    contracts.length+" สัญญา";

    remainInstallments.textContent=
    "เหลือ "+
    (total-paid)+
    " งวด";

    heroProgress.style.width=
    allPercent+"%";

}

/*==================================
 Start
==================================*/

render();