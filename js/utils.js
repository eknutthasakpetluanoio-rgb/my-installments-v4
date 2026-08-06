/* ===================================
   PayNest v1.0
   Utils
=================================== */

/**
 * แปลงตัวเลขเป็นสกุลเงินบาท
 * ตัวอย่าง: 12500 -> ฿12,500
 */
function formatCurrency(amount) {
    const value = Number(amount) || 0;

    return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
        maximumFractionDigits: 0
    }).format(value);
}

/**
 * สร้าง ID ไม่ซ้ำ
 */
function generateId() {
    return Date.now().toString(36) +
           Math.random().toString(36).substring(2, 8);
}

/**
 * คำนวณค่างวด
 */
function calculateMonthly(price, down, months) {

    price = Number(price);
    down = Number(down);
    months = Number(months);

    if (months <= 0) return 0;

    return Math.ceil((price - down) / months);

}

/**
 * จำกัดค่า
 */
function clamp(value, min, max) {

    return Math.min(
        Math.max(value, min),
        max
    );

}

/**
 * เปอร์เซ็นต์ Progress
 */
function calculateProgress(total, remain) {

    if (total <= 0) return 0;

    const paid = total - remain;

    return clamp(
        (paid / total) * 100,
        0,
        100
    );

}

/**
 * วันที่ปัจจุบัน
 */
function today() {

    return new Date()
        .toISOString()
        .split("T")[0];

}

/**
 * เพิ่มจำนวนเดือน
 */
function addMonths(dateString, months) {

    const date = new Date(dateString);

    date.setMonth(
        date.getMonth() + months
    );

    return date
        .toISOString()
        .split("T")[0];

}
