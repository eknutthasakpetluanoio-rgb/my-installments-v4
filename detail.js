const contracts = {
  vivo: {
    name: "📱 vivo V70",
    contract: "SBR0001339",
    remain: 31220,
    installmentAmount: 2230,
    totalInstallments: 14,
    paidInstallments: 1,
    dates: [
      "15/08/2569","15/09/2569","15/10/2569","15/11/2569",
      "15/12/2569","15/01/2570","15/02/2570","15/03/2570",
      "15/04/2570","15/05/2570","15/06/2570","15/07/2570",
      "15/08/2570","15/09/2570"
    ]
  },

  watch: {
    name: "⌚ Redmi Watch 5 Lite",
    contract: "WATCH0001",
    remain: 3180,
    installmentAmount: 265,
    totalInstallments: 12,
    paidInstallments: 0,
    dates: [
      "01/08/2569","08/08/2569","15/08/2569","22/08/2569",
      "29/08/2569","05/09/2569","12/09/2569","19/09/2569",
      "26/09/2569","03/10/2569","10/10/2569","17/10/2569"
    ]
  },

  soundcore: {
    name: "🎧 Soundcore R60i NC",
    contract: "R600001",
    remain: 1300,
    installmentAmount: 130,
    totalInstallments: 12,
    paidInstallments: 0,
    dates: [
      "01/08/2569","08/08/2569","15/08/2569","22/08/2569",
      "29/08/2569","05/09/2569","12/09/2569","19/09/2569",
      "26/09/2569","03/10/2569","10/10/2569","17/10/2569"
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id") || "vivo";

const contract = contracts[id];

if (!contract) {

    document.getElementById("productName").textContent =
    "ไม่พบข้อมูล";

    throw new Error("Contract Not Found");

}
const storageKey = "paid_" + id;

const paidList =
JSON.parse(localStorage.getItem(storageKey)) || [];

const paidCount = Math.max(
    contract.paidInstallments,
    paidList.length
);

const remainAmount =
contract.remain -
(paidList.length * contract.installmentAmount);

const progress =
Math.round(
(paidCount / contract.totalInstallments) * 100
);

document.getElementById("productName").textContent =
contract.name;

document.getElementById("contractNumber").textContent =
"เลขสัญญา : " + contract.contract;

document.getElementById("remainAmount").textContent =
remainAmount.toLocaleString() + " บาท";

document.getElementById("progressText").textContent =
progress + "%";

document.getElementById("progressBar").style.width =
progress + "%";


const list = document.getElementById("scheduleList");

contract.dates.forEach((date,index)=>{

    const paidList = JSON.parse(localStorage.getItem("paid_"+id)) || [];

const paid =
index < contract.paidInstallments ||
paidList.includes(index);

    list.innerHTML += `
    <div class="card">

        <h3>งวดที่ ${index+1}</h3>

        <p><strong>กำหนดชำระ</strong><br>${date}</p>

        <p><strong>ยอด</strong><br>${data.installmentAmount.toLocaleString()} บาท</p>

        <button
class="btn"
${paid ? "disabled" : ""}
onclick="payInstallment(${index})">

${paid ? "✅ ชำระแล้ว" : "💳 ชำระเงิน"}

</button>

    </div>
    `;
});


function payInstallment(index){

    if(!confirm(`ยืนยันชำระงวดที่ ${index+1} ?`)) return;

    const key = "paid_" + id;

    let paidList = JSON.parse(localStorage.getItem(key)) || [];

    if(!paidList.includes(index)){
        paidList.push(index);
    }

    localStorage.setItem(key, JSON.stringify(paidList));

    location.reload();

}
