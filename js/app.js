/* ===================================
   PayNest v1.0
   App Entry
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    // โหลด Dashboard
    refreshDashboard();

    // กำหนดวันที่เริ่มต้น
    const dueInput = document.getElementById("due");

    if (dueInput && !dueInput.value) {
        dueInput.value = today();
    }

    console.log("✅ PayNest v1.0 Started");

});