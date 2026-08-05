// โหลดข้อมูล
let contracts = JSON.parse(localStorage.getItem("contracts")) || [];

// ข้อมูลตัวอย่างครั้งแรก
if (contracts.length === 0) {
    contracts = [
        {
            id: Date.now(),
            name: "vivo V70",
            amount: 2230,
            remain: 31220,
            paid: 30,
            total: 44
        },
        {
            id: Date.now() + 1,
            name: "Redmi Watch 5 Lite",
            amount: 265,
            remain: 3180,
            paid: 0,
            total: 12
        }
    ];
    save();
}

const contractsBox = document.getElementById("contracts");

function save() {
    localStorage.setItem("contracts", JSON.stringify(contracts));
}

function render() {

    contractsBox.innerHTML = "";

    let totalPay = 0;
    let remainTotal = 0;
    let paid = 0;
    let total = 0;

    contracts.forEach((item, index) => {

        totalPay += item.amount;
        remainTotal += item.remain;
        paid += item.paid;
        total += item.total;

        contractsBox.innerHTML += `
        <div class="contract-card">
            <h2>💳 ${item.name}</h2>

            <p>ผ่อนเดือนละ ${item.amount.toLocaleString()} บาท</p>

            <p>คงเหลือ ${item.remain.toLocaleString()} บาท</p>

            <p>งวด ${item.paid}/${item.total}</p>

            <button onclick="removeContract(${index})">
                ลบ
            </button>
        </div>
        `;

    });

    document.getElementById("totalPay").textContent =
        totalPay.toLocaleString() + " บาท";

    document.getElementById("remainTotal").textContent =
        remainTotal.toLocaleString() + " บาท";

    document.getElementById("contractCount").textContent =
        contracts.length + " สัญญา";

    let percent = 0;

    if (total > 0) {
        percent = Math.round((paid / total) * 100);
    }

    document.getElementById("paidPercent").textContent =
        percent + "%";

    save();

}

window.removeContract = function(index){

    if(confirm("ลบรายการนี้ใช่ไหม?")){

        contracts.splice(index,1);

        render();

    }

}

function addContract(){

    const name = prompt("ชื่อสินค้า");

    if(!name) return;

    const amount = Number(prompt("ยอดผ่อนต่อเดือน"));

    const remain = Number(prompt("ยอดคงเหลือ"));

    const total = Number(prompt("จำนวนงวดทั้งหมด"));

    contracts.push({

        id: Date.now(),

        name,

        amount,

        remain,

        paid:0,

        total

    });

    render();

}

document.getElementById("addBtn").onclick = addContract;
document.getElementById("fab").onclick = addContract;

render();