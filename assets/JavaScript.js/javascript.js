const descrição = document.querySelector("#descrição");
const valor = document.querySelector("#valor");
const tipo = document.querySelector("#tipo");
const tbody = document.querySelector("#tbody");
const btn = document.querySelector("#btn-incluir");

const entradas = document.querySelector("#tela-entradas");
const saidas = document.querySelector("#tela-saídas");
const total = document.querySelector("#tela-total");

let itens;

btn.onclick = () => {
    if( valor.value === " " || tipo.value === " " || descrição.value === " "){
        return alert ("Preencha todos os campos corretamente")
    }

    itens.push({
        descrição: descrição.value,
        valor: Math.abs(valor.value).toFixed(2),
        tipo: tipo.value,
});


    saveItens();

    loadItens();

    descrição.value = "";
    valor.value = "";
};

function deleteItem(index){
    itens.splice(index, 1);
    saveItens();
    loadItens();
}

function insertItem(item, index){
    let tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${item.descrição}</td>
    <td>R$ ${item.valor}</td>
    <td class = "columnType">${
        item.tipo === "Entrada"
            ? '<i class="bx bxs-chevron-up-circle"></i>'
            : '<i class="bx bxs-chevron-down-circle"></i>'
        }</td>
        <td class = "columnAction">
        <button onclick="deleteItem(${index})"><span class="material-symbols-outlined">
        delete
        </span>`;
        

    tbody.appendChild(tr);
}        


function loadItens(){
    itens = getItensBD();
    tbody.innerHTML = "";
    itens.forEach((item, index) => {
        insertItem(item, index);
        });

    getTotals();
}

function getTotals(){
    const amountIncomes = itens
        .filter((item) => item.tipo === "Entrada")
        .map((transaction) => Number(transaction.valor));

    const amountExpenses = itens
        .filter((item) => item.tipo === "Saída")
        .map((transaction) => Number(transaction.valor));
          
    const totalIncomes = amountIncomes
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2);
          
    const totalExpenses = Math.abs(
        amountExpenses.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);
          
    const totalItems = (totalIncomes - totalExpenses).toFixed(2);
          
    entradas.innerHTML = totalIncomes;
    saidas.innerHTML = totalExpenses;
    total.innerHTML = totalItems;
}

const getItensBD = () => JSON.parse(localStorage.getItem("db_itens")) ?? [];
const saveItens = () =>
    localStorage.setItem("db_itens", JSON.stringify(itens));
        
          

loadItens();
