/* ===================================
   PayNest v1.1
   Bottom Sheet Manager
=================================== */

/* ---------- Elements ---------- */

const sheet = document.getElementById("sheet");
const addButton = document.getElementById("addButton");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");

/* ---------- State ---------- */

let editingId = null;

/* ---------- Open ---------- */

function openSheet() {

    if (!sheet) return;

    sheet.classList.add("show");

}

/* ---------- Close ---------- */

function closeSheet() {

    if (!sheet) return;

    sheet.classList.remove("show");

    clearForm();

}

/* ---------- Edit ---------- */

function editForm(id) {

    const contract = getContract(id);

    if (!contract) return;

    editingId = id;

    document.getElementById("name").value = contract.name;
    document.getElementById("price").value = contract.price;
    document.getElementById("down").value = contract.down;
    document.getElementById("months").value = contract.months;
    document.getElementById("monthly").value = contract.monthly;
    document.getElementById("due").value = contract.due;

    openSheet();

}

/* ---------- Read Form ---------- */

function getFormData() {

    return {

        name: document.getElementById("name").value.trim(),

        price: Number(
            document.getElementById("price").value
        ),

        down: Number(
            document.getElementById("down").value
        ),

        months: Number(
            document.getElementById("months").value
        ),

        monthly: Number(
            document.getElementById("monthly").value
        ),

        due:
            document.getElementById("due").value

    };

}

/* ---------- Clear ---------- */

function clearForm() {

    document.getElementById("name").value = "";

    document.getElementById("price").value = "";

    document.getElementById("down").value = "";

    document.getElementById("months").value = "";

    document.getElementById("monthly").value = "";

    document.getElementById("due").value = "";

    editingId = null;

}
/* ---------- Validate ---------- */

function validateForm(data) {

    if (!data.name) {

        alert("กรุณากรอกชื่อสินค้า");

        return false;

    }

    if (data.price <= 0) {

        alert("กรุณากรอกราคาสินค้า");

        return false;

    }

    if (data.down < 0) {

        alert("เงินดาวน์ต้องไม่น้อยกว่า 0");

        return false;

    }

    if (data.months <= 0) {

        alert("จำนวนงวดต้องมากกว่า 0");

        return false;

    }

    return true;

}

/* ---------- Save ---------- */

function saveForm() {

    const data = getFormData();

    if (!validateForm(data)) {

        return;

    }

    if (editingId) {

        editContract(editingId, data);

    } else {

        createNewContract(data);

    }

    refreshDashboard();

    closeSheet();

}

/* ---------- Events ---------- */

if (addButton) {

    addButton.addEventListener("click", openSheet);

}

if (cancelBtn) {

    cancelBtn.addEventListener("click", closeSheet);

}

if (saveBtn) {

    saveBtn.addEventListener("click", saveForm);

}

/* ปิดเมื่อแตะพื้นหลัง */

if (sheet) {

    sheet.addEventListener("click", (event) => {

        if (event.target === sheet) {

            closeSheet();

        }

    });

}

/* ปิดเมื่อกด ESC */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeSheet();

    }

});
