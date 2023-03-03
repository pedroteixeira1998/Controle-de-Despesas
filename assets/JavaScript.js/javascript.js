const descrição = document.querySelector("#descrição");
const valor = document.querySelector("#valor");
const tipo = document.querySelector("#tipo");
const tbody = document.querySelector("#tbody");
const btn = document.querySelector("#btn-incluir");

const entradas = document.querySelector("#tela-entradas");
const saidas = document.querySelector("#tela-saídas");
const total = document.querySelector("#total");

let itens;

btn.onclick = () => {
    if( valor.value === "" || tipo.value === "" || descrição.value === ""){
        return alert ("Preencha todos os campos corretamente")
    }

    itens.push({
        descrição: descrição.value,
        valor: Math.abs(amount.value).toFixed(2),
        tipo: tipo.value,
});
}

saveItens();

loadItens();

descrição.value = "";
valor.value = "";

function deleteItem(index){
    itens.splice(index, 1);
    saveItens();
    loadItens();
}
