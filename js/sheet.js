/* ===================================
   PayNest v1.0
   Bottom Sheet
=================================== */

const sheet = document.getElementById("sheet");
const addButton = document.getElementById("addButton");
const cancelBtn = document.getElementById("cancelBtn");
/* ---------- Edit Mode ---------- */

let editingId = null;
const saveBtn = document.getElementById("saveBtn");

/* ---------- Open ---------- */

function openSheet() {

    sheet.classList.add("show");

}

/* ---------- Close ---------- */

function closeSheet() {

    sheet.classList.remove("show");

    clearForm();

}

/* ---------- Form ---------- */

function getFormData() {

    return {

        name: document.getElementById("name").value.trim(),

        price: Number(document.getElementById("price").value),

        down: Number(document.getElementById("down").value),

        months: Number(document.getElementById("months").value),

        monthly: Number(document.getElementById("monthly").value),

        due: document.getElementById("due").value

    };

}

function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("down").value = "";
    document.getElementById("months").value = "";
    document.getElementById("monthly").value = "";
    document.getElementById("due").value = "";
editingId = null;
}
function editForm(id){

    const contract = getContract(id);

    if(!contract) return;

    editingId = id;

    document.getElementById("name").value = contract.name;

    document.getElementById("price").value = contract.price;

    document.getElementById("down").value = contract.down;

    document.getElementById("months").value = contract.months;

    document.getElementById("monthly").value = contract.monthly;

    document.getElementById("due").value = contract.due;

    openSheet();

}
/* ---------- Save ---------- */

function saveForm() {

    const data = getFormData();

    if (!data.name) {

        alert("กรุณากรอกชื่อสินค้า");

        return;

    }

    if (data.price <= 0) {

        alert("กรุณากรอกราคา");

        return;

    }

    if (data.months <= 0) {

        alert("กรุณากรอกจำนวนงวด");

        return;

    }

    if(editingId){

    editContract(editingId,data);

    editingId = null;

}else{

    createNewContract(data);

}

refreshDashboard();

closeSheet();

}

/* ---------- Event ---------- */

addButton.addEventListener("click", openSheet);

cancelBtn.addEventListener("click", closeSheet);

saveBtn.addEventListener("click", saveForm);

/* ปิดเมื่อแตะพื้นหลัง */

sheet.addEventListener("click", (event) => {

    if (event.target === sheet) {

        closeSheet();

    }

});
