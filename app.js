// ===============================
// PayNest v3 - app.js
// ===============================

// ข้อมูลเริ่มต้น
const contracts = [
  {
    id: 1,
    name: "vivo V70",
    monthly: 2230,
    remain: 31220,
    progress: 42
  },
  {
    id: 2,
    name: "Anker Soundcore R50i NC",
    monthly: 130,
    remain: 1560,
    progress: 18
  },
  {
    id: 3,
    name: "Redmi Watch 5 Lite",
    monthly: 265,
    remain: 1860,
    progress: 34
  }
];

// อ้างอิง Element
const totalPay = document.getElementById("monthlyTotal");
const remainMoney = document.getElementById("remainMoney");
const contractCount = document.getElementById("contractCount");
const contractList = document.getElementById("contractList");
const progressBar = document.getElementById("progressBar");
const insight = document.getElementById("insight");

// คำนวณข้อมูล
function updateSummary() {
  const monthlyTotal = contracts.reduce((sum, item) => sum + item.monthly, 0);
  const remainTotal = contracts.reduce((sum, item) => sum + item.remain, 0);

  totalPay.textContent = `฿${monthlyTotal.toLocaleString()}`;
  remainMoney.textContent = `฿${remainTotal.toLocaleString()}`;
  contractCount.textContent = contracts.length;

  progressBar.style.width = "31%";

  insight.textContent = `${contracts[0].name} ครบกำหนดชำระในอีก 3 วัน`;
}

// แสดงรายการผ่อน
function renderContracts() {
  contractList.innerHTML = "";

  contracts.forEach(item => {
    contractList.innerHTML += `
      <div class="contract-card">
        <h4>${item.name}</h4>
        <p>ค่างวด ${item.monthly.toLocaleString()} บาท / เดือน</p>

        <div class="progress">
          <div class="progress-bar" style="width:${item.progress}%"></div>
        </div>

        <p>ชำระแล้ว ${item.progress}%</p>
      </div>
    `;
  });
}

// เริ่มต้น
updateSummary();
renderContracts();
const fab = document.querySelector(".fab");
const modal = document.getElementById("addModal");
const saveBtn = document.getElementById("saveBtn");

fab.onclick = () => {
    modal.classList.add("show");
};

modal.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
};

saveBtn.onclick = () => {

    const name = document.getElementById("name").value;
    const price = Number(document.getElementById("price").value);
    const down = Number(document.getElementById("down").value);
    const months = Number(document.getElementById("months").value);

    if (!name || !price || !months) return;

    contracts.push({
        id: Date.now(),
        name,
        monthly: Math.round((price - down) / months),
        remain: price - down,
        progress: 0
    });

    updateSummary();
    renderContracts();

    modal.classList.remove("show");

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("down").value = "";
    document.getElementById("months").value = "";
};