/* ===================================
   PayNest v1.0
   Contract Manager
=================================== */

/**
 * สร้างรายการผ่อนใหม่
 */
function createContract(data) {

    const monthly = data.monthly && Number(data.monthly) > 0
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

        createdAt: today()

    };

}

/**
 * เพิ่มรายการใหม่
 */
function createNewContract(data) {

    const contract = createContract(data);

    addContract(contract);

    return contract;

}

/**
 * แก้ไขข้อมูล
 */
function editContract(id, data) {

    return updateContract(id, data);

}

/**
 * ลบรายการ
 */
function removeContract(id) {

    deleteContract(id);

}

/**
 * ชำระ 1 งวด
 */
function payInstallment(id) {

    const contract = getContract(id);

    if (!contract) return;

    if (contract.remain <= 0) return;

    contract.remain -= contract.monthly;

    if (contract.remain < 0) {

        contract.remain = 0;

    }

    contract.paidMonths++;

    updateContract(id, contract);

}

/**
 * จำนวนงวดที่เหลือ
 */
function remainingMonths(contract) {

    if (contract.monthly <= 0) return 0;

    return Math.ceil(

        contract.remain /

        contract.monthly

    );

}

/**
 * เปอร์เซ็นต์ความคืบหน้า
 */
function progress(contract) {

    return calculateProgress(

        contract.price - contract.down,

        contract.remain

    );

}

/**
 * ยอดที่ต้องจ่ายเดือนนี้
 */
function monthlySummary() {

    const contracts = loadContracts();

    return contracts.reduce(

        (sum, item) => {

            if (item.remain > 0) {

                sum += item.monthly;

            }

            return sum;

        },

        0

    );

}

/**
 * ยอดคงเหลือทั้งหมด
 */
function remainSummary() {

    const contracts = loadContracts();

    return contracts.reduce(

        (sum, item) => {

            return sum + item.remain;

        },

        0

    );

}
