/* ===================================
   PayNest Ultimate v1.0
   Contract Manager
=================================== */

/* ---------- Create ---------- */

function createContract(data) {

    const contract = {

        id: generateId(),

        name: safeText(data.name),

        shop: safeText(data.shop),

        price: toNumber(data.price),

        down: toNumber(data.down),

        months: toNumber(data.months),

        monthly: toNumber(data.monthly),

        due: data.due || today(),

        paidMonths: 0,

        paidAmount: 0,

        history: [],

        createdAt: new Date().toISOString()

    };

    addContract(contract);

    return contract;

}

/* ---------- Read ---------- */

function getContract(id) {

    return findContract(id);

}

/* ---------- Update ---------- */

function editContract(id, data) {

    const contract = getContract(id);

    if (!contract) {

        return false;

    }

    contract.name = safeText(data.name);

    contract.shop = safeText(data.shop);

    contract.price = toNumber(data.price);

    contract.down = toNumber(data.down);

    contract.months = toNumber(data.months);

    contract.monthly = toNumber(data.monthly);

    contract.due = data.due;

    return updateContract(id, contract);

}

/* ---------- Delete ---------- */

function removeContract(id) {

    deleteContract(id);

}

/* ---------- Pay ---------- */

function payInstallment(id) {

    const contract = getContract(id);

    if (!contract) {

        return false;

    }

    if (contract.paidMonths >= contract.months) {

        alert("ชำระครบแล้ว");

        return false;

    }

    contract.paidMonths++;

    contract.paidAmount += contract.monthly;

    contract.history.push({

        installment: contract.paidMonths,

        amount: contract.monthly,

        date: today()

    });

    updateContract(id, contract);

    return true;

}

/* ---------- Remaining ---------- */

function getRemaining(contract) {

    return calculateRemaining(

        contract.price,

        contract.down,

        contract.paidAmount

    );

}

/* ---------- Progress ---------- */

function getProgress(contract) {

    return calculateProgress(

        contract.paidMonths,

        contract.months

    );

}

/* ---------- Status ---------- */

function getStatus(contract) {

    if (contract.paidMonths >= contract.months) {

        return {

            text: "ชำระครบ",

            className: "success"

        };

    }

    if (contract.paidMonths >= Math.ceil(contract.months * 0.8)) {

        return {

            text: "ใกล้ครบ",

            className: "warning"

        };

    }

    return {

        text: "กำลังผ่อน",

        className: "primary"

    };

}

/* ---------- Dashboard ---------- */

function getDashboardData() {

    const contracts = getContracts();

    let monthlyTotal = 0;

    let remainingTotal = 0;

    let paidAmount = 0;

    let totalAmount = 0;

    contracts.forEach(contract => {

        monthlyTotal += contract.monthly;

        remainingTotal += getRemaining(contract);

        paidAmount += contract.paidAmount;

        totalAmount += (contract.price - contract.down);

    });

    return {

        contracts,

        totalContracts: contracts.length,

        monthlyTotal,

        remainingTotal,

        paidAmount,

        totalAmount,

        paidPercent:

            totalAmount > 0

                ? Math.round((paidAmount / totalAmount) * 100)

                : 0

    };

}

console.log("✅ contract.js loaded");