/* ===================================
   PayNest Ultimate v1.0
   Statistics
=================================== */

function getStatistics() {

    const contracts = getContracts();

    let totalPrice = 0;
    let totalDown = 0;
    let totalPaid = 0;
    let totalRemaining = 0;
    let totalMonthly = 0;
    let completed = 0;
    let active = 0;

    contracts.forEach(contract => {

        totalPrice += Number(contract.price);

        totalDown += Number(contract.down);

        totalPaid += Number(contract.paidAmount);

        totalRemaining += getRemaining(contract);

        totalMonthly += Number(contract.monthly);

        if (contract.paidMonths >= contract.months) {

            completed++;

        } else {

            active++;

        }

    });

    return {

        contracts: contracts.length,

        active,

        completed,

        totalPrice,

        totalDown,

        totalPaid,

        totalRemaining,

        totalMonthly,

        progress:

            totalPrice === 0

                ? 0

                : Math.round(

                    (totalPaid /

                        (totalPrice - totalDown)

                    ) * 100

                )

    };

}

/* ---------- Console ---------- */

function printStatistics() {

    console.table(

        getStatistics()

    );

}