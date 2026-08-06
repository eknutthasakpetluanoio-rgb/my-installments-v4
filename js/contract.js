/* ===================================
   PayNest v1.1
   Contract Manager
=================================== */

/* ---------- Create ---------- */

function createContract(data) {

    const monthly = data.monthly > 0
        ? Number(data.monthly)
        : calculateMonthly(
            data.price,
            data.down,
            data.months
        );

    return {

        id: generateId(),

        name: data.name,

        price: Number(data.price),

        down: Number(data.down),

        months: Number(data.months),

        monthly: monthly,

        remain: Number(data.price) - Number(data.down),

        paidMonths: 0,

        due: data.due || today(),

        createdAt: today(),

        history: []

    };

}

/* ---------- Add ---------- */

function createNewContract(data) {

    const contract = createContract(data);

    addContract(contract);

    return contract;

}

/* ---------- Edit ---------- */

function editContract(id, newData) {

    return updateContract(id, newData);

}

/* ---------- Delete ---------- */

function removeContract(id) {

    deleteContract(id);

}

/* ---------- Pay ---------- */

function payInstallment(id) {

    const contract = getContract(id);

    if (!contract) return;

    if (contract.remain <= 0) return;

    contract.remain -= contract.monthly;

    if (contract.remain < 0) {

        contract.remain = 0;

    }

    contract.paidMonths++;

    contract.history.push({

        date: today(),

        amount: contract.monthly

    });

    contract.due = addMonths(

        contract.due,

        1

    );

    updateContract(id, contract);

}

/* ---------- Remaining Months ---------- */

function remainingMonths(contract) {

    if (contract.monthly <= 0) return 0;

    return Math.ceil(

        contract.remain /

        contract.monthly

    );

}

/* ---------- Progress ---------- */

function progress(contract) {

    return calculateProgress(

        contract.price - contract.down,

        contract.remain

    );

}

/* ---------- Dashboard Summary ---------- */

function monthlySummary() {

    return loadContracts()

        .filter(item => item.remain > 0)

        .reduce(

            (sum, item) =>

                sum + item.monthly,

            0

        );

}

function remainSummary() {

    return loadContracts()

        .reduce(

            (sum, item) =>

                sum + item.remain,

            0

        );

}
