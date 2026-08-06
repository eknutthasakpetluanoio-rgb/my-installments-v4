/* ===================================
   PayNest v3.1
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

/* ---------- Edit ---------- */

function editContract(id, data) {

    return updateContract(id, {

        name: data.name,

        price: Number(data.price),

        down: Number(data.down),

        months: Number(data.months),

        monthly: Number(data.monthly),

        due: data.due

    });

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

    let monthly = 0;

    let remaining = 0;

    contracts.forEach(contract => {

        monthly += contract.monthly;

        remaining += getRemaining(contract);

    });

    return {

        contracts,

        totalContracts: contracts.length,

        monthlyTotal: monthly,

        remainingTotal: remaining

    };

}