/* ===================================
   PayNest Ultimate v1.0
   UI Manager
=================================== */

const sheet =
document.getElementById("sheet");

const addButton =
document.getElementById("addButton");

const cancelBtn =
document.getElementById("cancelBtn");

const saveBtn =
document.getElementById("saveBtn");

let editingId = null;

/* ---------- Open ---------- */

function openSheet() {

    editingId = null;

    document.getElementById("sheetTitle").textContent =
        "เพิ่มสัญญา";

    clearForm();

    sheet.classList.add("show");

}

/* ---------- Close ---------- */

function closeSheet() {

    sheet.classList.remove("show");

    clearForm();

}

/* ---------- Clear ---------- */

function clearForm() {

    const form =
        document.getElementById("contractForm");

    if (form) {

        form.reset();

    }

    document.getElementById("down").value = 0;

}

/* ---------- Edit ---------- */

function editItem(id) {

    const contract =
        getContract(id);

    if (!contract) {

        return;

    }

    editingId = id;

    document.getElementById("sheetTitle").textContent =
        "แก้ไขสัญญา";

    document.getElementById("name").value =
        contract.name;

    document.getElementById("shop").value =
        contract.shop || "";

    document.getElementById("price").value =
        contract.price;

    document.getElementById("down").value =
        contract.down;

    document.getElementById("months").value =
        contract.months;

    document.getElementById("monthly").value =
        contract.monthly;

    document.getElementById("due").value =
        contract.due;

    sheet.classList.add("show");

}

/* ---------- Save ---------- */

function saveForm() {

    const data = {

        name:
            safeText(
                document.getElementById("name").value
            ),

        shop:
            safeText(
                document.getElementById("shop").value
            ),

        price:
            toNumber(
                document.getElementById("price").value
            ),

        down:
            toNumber(
                document.getElementById("down").value
            ),

        months:
            toNumber(
                document.getElementById("months").value
            ),

        monthly:
            toNumber(
                document.getElementById("monthly").value
            ),

        due:
            document.getElementById("due").value

    };

    if (!data.name) {

        alert("กรุณากรอกชื่อสินค้า");

        return;

    }

    if (!data.price) {

        alert("กรุณากรอกราคา");

        return;

    }

    if (!data.months) {

        alert("กรุณากรอกจำนวนงวด");

        return;

    }

    if (!data.monthly) {

        alert("กรุณากรอกค่างวด");

        return;

    }

    if (editingId) {

        editContract(
            editingId,
            data
        );

    }

    else {

        createContract(data);

    }

    renderDashboard();

    closeSheet();

}

/* ---------- Events ---------- */

addButton?.addEventListener(

    "click",

    openSheet

);

cancelBtn?.addEventListener(

    "click",

    closeSheet

);

saveBtn?.addEventListener(

    "click",

    saveForm

);

sheet?.addEventListener(

    "click",

    event => {

        if (event.target === sheet) {

            closeSheet();

        }

    }

);

document.addEventListener(

    "keydown",

    event => {

        if (event.key === "Escape") {

            closeSheet();

        }

    }

);

console.log("✅ ui.js loaded");