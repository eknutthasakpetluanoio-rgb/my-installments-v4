const contracts = [
  {
  id:"vivo",
  icon:"📱",
  name:"vivo V70",
  contract:"SBR0001339",
  amount:"2,230 บาท / เดือน",
  remain:"31,220 บาท",
  installments:"14 งวด",
  status:"🟠 รอชำระ"
},

  {
    id:"watch",
    icon:"⌚",
    name:"Redmi Watch 5 Lite",
    contract:"ยอดคงเหลือ 3,180 บาท",
    amount:"265 บาท / สัปดาห์",
    remain:"3,180 บาท",
    installments:"12 งวด",
    status:"🟠 รอชำระ"
  },

  {
    id:"soundcore",
    icon:"🎧",
    name:"Soundcore R60i NC",
    contract:"ยอดคงเหลือ 1,300 บาท",
    amount:"130 บาท / สัปดาห์",
    remain:"1,300 บาท",
    installments:"12 งวด",
    status:"🟠 รอชำระ"
  }
];

document.getElementById("totalPay").textContent = "2,625 บาท";
document.getElementById("contractCount").textContent = contracts.length + " สัญญา";

const contractsDiv = document.getElementById("contracts");

contracts.forEach(item => {

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h2>${item.icon} ${item.name}</h2>

    <p>${item.contract}</p>

    <p><strong>ยอดผ่อน</strong><br>${item.amount}</p>

    <p><strong>ยอดคงเหลือ</strong><br>${item.remain}</p>

    <p><strong>จำนวนงวด</strong><br>${item.installments}</p>

    <p>${item.status}</p>

    <button class="btn"
onclick="location.href='detail.html?id=${item.id}'">
ดูรายละเอียด
</button>
  `;

  contractsDiv.appendChild(card);

});
