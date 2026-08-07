/* ===================================
   PayNest Premium v1.0
   App Controller
=================================== */

"use strict";

/* ==========================
   Elements
========================== */

const fab = document.getElementById("addContractBtn");
const bottomSheet = document.getElementById("bottomSheet");
const backdrop = document.getElementById("backdrop");
const closeSheetBtn = document.getElementById("closeSheet");

/* ==========================
   Sheet
========================== */

function openSheet() {

    backdrop.classList.add("show");
    bottomSheet.classList.add("show");

}

function closeSheet() {

    backdrop.classList.remove("show");
    bottomSheet.classList.remove("show");

}

/* ==========================
   Events
========================== */

if (fab) {

    fab.addEventListener("click", openSheet);

}

if (closeSheetBtn) {

    closeSheetBtn.addEventListener("click", closeSheet);

}

if (backdrop) {

    backdrop.addEventListener("click", closeSheet);

}

/* ==========================
   ESC Support
========================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeSheet();

    }

});

/* ==========================
   Form
========================== */

const contractForm = document.getElementById("contractForm");
const contractContainer = document.getElementById("contractContainer");

let contracts = JSON.parse(localStorage.getItem("paynest_contracts")) || [];

/* ==========================
   Save
========================== */

function saveContracts() {

    localStorage.setItem(
        "paynest_contracts",
        JSON.stringify(contracts)
    );

}

/* ==========================
   Render
========================== */

function renderContracts() {

    if (contracts.length === 0) {

        contractContainer.innerHTML = `
        <div class="empty-state">
            <i class="fa-regular fa-folder-open"></i>
            <h3>ยังไม่มีสัญญา</h3>
            <p>กดปุ่ม + เพื่อเพิ่มสัญญาแรก</p>
        </div>
        `;

        return;

    }

    contractContainer.innerHTML = "";

    contracts.forEach((item, index) => {

        contractContainer.innerHTML += `

        <article class="glass contract-card">

            <div class="contract-info">

                <h3>${item.product}</h3>

                <p>${item.shop}</p>

            </div>

            <div class="contract-price">

                <strong>฿${Number(item.monthly).toLocaleString()}</strong>

                <small>${item.months} งวด</small>

            </div>

        </article>

        `;

    });

}

/* ==========================
   Submit
========================== */

if (contractForm) {

contractForm.addEventListener("submit",(e)=>{

e.preventDefault();

const product=document.getElementById("productName").value;

const shop=document.getElementById("shopName").value;

const price=document.getElementById("price").value;

const months=document.getElementById("months").value;

const monthly=document.getElementById("monthly").value;

contracts.push({

product,

shop,

price,

months,

monthly

});

saveContracts();

renderContracts();

contractForm.reset();

closeSheet();

});

}

/* ==========================
   Start
========================== */

renderContracts();
