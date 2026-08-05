// =========================
// PayNest v2.0.0 Alpha
// =========================

const contracts = [
{
id:1,
name:"vivo V70",
store:"SABAIRENTAL",
monthly:2230,
total:16,
paid:2,
remaining:31220,
icon:"smartphone"
},

{
id:2,
name:"Anker Soundcore R50i NC",
store:"Pay House",
monthly:130,
total:12,
paid:2,
remaining:1300,
icon:"headphones"
},

{
id:3,
name:"Redmi Watch 5 Lite",
store:"ป้าบุ๋ม",
monthly:265,
total:12,
paid:4,
remaining:2120,
icon:"watch"
}

];

const list = document.getElementById("contracts");

let totalMonthly = 0;
let remainMoney = 0;
let paidInstallments = 0;
let totalInstallments = 0;

contracts.forEach(item=>{

totalMonthly += item.monthly;

remainMoney += item.remaining;

paidInstallments += item.paid;

totalInstallments += item.total;

const percent =
(item.paid/item.total)*100;

list.innerHTML += `

<div class="contract-card glass">

<div style="
display:flex;
align-items:center;
gap:16px;
">

<div class="logo">

<span class="material-symbols-rounded">

${item.icon}

</span>

</div>

<div>

<h3>${item.name}</h3>

<p>${item.store}</p>

</div>

</div>

<div class="progress"
style="margin-top:18px;">

<div
style="
width:${percent}%;
height:100%;
background:white;
border-radius:20px;
">
</div>

</div>

<div
style="
display:flex;
justify-content:space-between;
margin-top:14px;
font-size:14px;
">

<span>฿${item.monthly}/เดือน</span>

<span>${item.paid}/${item.total} งวด</span>

</div>

</div>

`;

});

document.getElementById("totalPay").textContent =
"฿"+totalMonthly.toLocaleString();

document.getElementById("remainMoney").textContent =
"฿"+remainMoney.toLocaleString();

document.getElementById("contractCount").textContent =
contracts.length+" สัญญา";

document.getElementById("remainCount").textContent =
"เหลือ "+(totalInstallments-paidInstallments)+" งวด";

document.getElementById("paidPercent").textContent =
Math.round((paidInstallments/totalInstallments)*100)+"%";

document.getElementById("progressBar").style.width =
Math.round((paidInstallments/totalInstallments)*100)+"%";
