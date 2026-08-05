// ===========================
// My Installments V4 - data.js
// ===========================

const contracts = {
  vivo: {
    id: "vivo",
    icon: "📱",
    name: "vivo V70",
    contract: "SBR0001339",

    installmentAmount: 2230,
    totalInstallments: 14,

    dates: [
      "15/08/2569",
      "15/09/2569",
      "15/10/2569",
      "15/11/2569",
      "15/12/2569",
      "15/01/2570",
      "15/02/2570",
      "15/03/2570",
      "15/04/2570",
      "15/05/2570",
      "15/06/2570",
      "15/07/2570",
      "15/08/2570",
      "15/09/2570"
    ]
  },

  watch: {
    id: "watch",
    icon: "⌚",
    name: "Redmi Watch 5 Lite",
    contract: "WATCH0001",

    installmentAmount: 265,
    totalInstallments: 12,

    dates: [
      "01/08/2569",
      "08/08/2569",
      "15/08/2569",
      "22/08/2569",
      "29/08/2569",
      "05/09/2569",
      "12/09/2569",
      "19/09/2569",
      "26/09/2569",
      "03/10/2569",
      "10/10/2569",
      "17/10/2569"
    ]
  },

  soundcore: {
    id: "soundcore",
    icon: "🎧",
    name: "Soundcore R60i NC",
    contract: "R600001",

    installmentAmount: 130,
    totalInstallments: 12,

    dates: [
      "01/08/2569",
      "08/08/2569",
      "15/08/2569",
      "22/08/2569",
      "29/08/2569",
      "05/09/2569",
      "12/09/2569",
      "19/09/2569",
      "26/09/2569",
      "03/10/2569",
      "10/10/2569",
      "17/10/2569"
    ]
  }
};

// ===========================
// ฟังก์ชันกลาง
// ===========================

function getPaidList(id) {
  return JSON.parse(localStorage.getItem("paid_" + id)) || [];
}

function getPaidCount(id) {
  return getPaidList(id).length;
}

function getRemainAmount(id) {
  const c = contracts[id];

  return (
    (c.totalInstallments - getPaidCount(id)) *
    c.installmentAmount
  );
}

function getProgress(id) {
  const c = contracts[id];

  return Math.round(
    (getPaidCount(id) / c.totalInstallments) * 100
  );
}

function getTotalRemain() {

  let total = 0;

  Object.keys(contracts).forEach(id => {
    total += getRemainAmount(id);
  });

  return total;

}

function getTotalContracts() {

  return Object.keys(contracts).length;

}