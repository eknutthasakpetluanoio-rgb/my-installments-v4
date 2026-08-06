/* ===================================
   PayNest Ultimate
   Backup
=================================== */

function exportBackup() {

    exportContracts();

}

async function importBackup(file) {

    const success =

        await importContracts(file);

    if (success) {

        renderDashboard();

        alert("นำเข้าข้อมูลสำเร็จ");

    }

}

function autoBackup() {

    localStorage.setItem(

        "paynest.auto.backup",

        JSON.stringify(

            getContracts()

        )

    );

}

function restoreAutoBackup() {

    const data = localStorage.getItem(

        "paynest.auto.backup"

    );

    if (!data) return;

    saveContracts(

        JSON.parse(data)

    );

}