/* ===================================
   PayNest Ultimate
   Calendar
=================================== */

function getTodayContracts() {

    const todayDate = today();

    return getContracts().filter(

        contract => contract.due === todayDate

    );

}

function getContractsByMonth(month) {

    return getContracts().filter(contract =>

        contract.due.startsWith(month)

    );

}

function getUpcomingContracts(days = 7) {

    const now = new Date();

    return getContracts().filter(contract => {

        const due = new Date(contract.due);

        const diff =

            (due - now) /

            86400000;

        return diff >= 0 && diff <= days;

    });

}