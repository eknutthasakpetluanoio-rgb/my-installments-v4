/* ===================================
   PayNest v3.1
   UI Controller
=================================== */

const sheet = document.getElementById("sheet");
const addButton = document.getElementById("addButton");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const form = document.getElementById("contractForm");

let editingId = null;

/* ---------- Open ---------- */

function openSheet() {

    editingId = null;

    form.reset();

    document.getElementById("sheetTitle").textContent =
        "เพิ่มรายการผ่อน";

    sheet.classList.add("show");

}

/* ---------- Close ---------- */

function closeSheet() {

    sheet.classList.remove("show");

}

/* ---------- Save ---------- */

function saveForm() {

    const data = {

        name: document.getElementById("name").value.trim(),

        price: Number(document.getElementById("price").value),

        down: Number(document.getElementById("down").value || 0),

        months: Number(document.getElementById("months").value),

        monthly: Number(document.getElementById("monthly").value),

        due: document.getElementById("due").value

    };

    if (!data.name) {

        alert("กรุณากรอกชื่อสินค้า");

        return;

    }

    if (editingId) {

        editContract(editingId, data);

    } else {

        createContract(data);

    }

    closeSheet();

    renderDashboard();

}

/* ---------- Edit ---------- */

function openEdit(id) {

    const contract = getContract(id);

    if (!contract) return;

    editingId = id;

    document.getElementById("sheetTitle").textContent =
        "แก้ไขรายการ";

    document.getElementById("name").value = contract.name;
    document.getElementById("price").value = contract.price;
    document.getElementById("down").value = contract.down;
    document.getElementById("months").value = contract.months;
    document.getElementById("monthly").value = contract.monthly;
    document.getElementById("due").value = contract.due;

    sheet.classList.add("show");

}

/* ---------- Events ---------- */

addButton?.addEventListener("click", openSheet);

cancelBtn?.addEventListener("click", closeSheet);

saveBtn?.addEventListener("click", saveForm);

sheet?.addEventListener("click", e => {

    if (e.target === sheet) {

        closeSheet();

    }

});

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closeSheet();

    }

});
