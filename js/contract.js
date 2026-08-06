/* ===================================
   PayNest v4
   Contract Manager
=================================== */

/* ---------- Create ---------- */

function createContract(data) {

    const contract = {

        id: generateId(),

        name: data.name,

        price: Number(data.price),

        down: Number(data.down || 0),

        months: Number(data.months),

        monthly: Number(data.monthly),

        due: data.due || today(),

        paidMonths: 0,

        paidAmount: 0,

        history: [],

        createdAt: new Date().toISOString()

    };

    addContract(contract);

    return contract;

}

/* ---------- Update ---------- */

function editContract(id, data) {

    const contract = findContract(id);

    if (!contract) return false;

    contract.name = data.name;
    contract.price = Number(data.price);
    contract.down = Number(data.down);
    contract.months = Number(data.months);
    contract.monthly = Number(data.monthly);
    contract.due = data.due;

    return updateContract(id, contract);

}

/* ---------- Remove ---------- */

function removeContract(id) {

    deleteContract(id);

}

/* ---------- Get ---------- */

function getContract(id) {

    return findContract(id);

}

/* ---------- Pay ---------- */

function payInstallment(id) {

    const contract = getContract(id);

    if (!contract) return false;

    if (contract.paidMonths >= contract.months) {

        alert("รายการนี้ชำระครบแล้ว");

        return false;

    }

    contract.paidMonths++;

    contract.paidAmount += contract.monthly;

    contract.history.push({

        month: contract.paidMonths,

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

    if (contract.paidMonths >= contract.months * 0.8) {

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

    contracts.forEach(contract => {

        monthlyTotal += contract.monthly;

        remainingTotal += getRemaining(contract);

    });

    return {

        contracts,

        totalContracts: contracts.length,

        monthlyTotal,

        remainingTotal

    };

}