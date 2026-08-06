/* ===================================
   PayNest v4
   Storage
=================================== */

const STORAGE_KEY = "paynest.contracts";

function getContracts() {

    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];

}

function saveContracts(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}

function addContract(contract){

    const data = getContracts();

    data.push(contract);

    saveContracts(data);

}

function updateContract(id,newData){

    const data = getContracts();

    const index = data.findIndex(item=>item.id===id);

    if(index===-1) return false;

    data[index]=newData;

    saveContracts(data);

    return true;

}

function deleteContract(id){

    const data=getContracts().filter(item=>item.id!==id);

    saveContracts(data);

}

function findContract(id){

    return getContracts().find(item=>item.id===id);

}
