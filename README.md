# Controle de Despesas
## Descrição do Projeto
Página para controle de despesas. 

## Desenvolvido com:
![68747470733a2f2f696d672e736869656c64732e696f2f62616467652f48544d4c352d4533344632363f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465](https://user-images.githubusercontent.com/124098830/223829120-654e580a-c083-46aa-9622-8d51ff350025.svg)
![68747470733a2f2f696d672e736869656c64732e696f2f62616467652f435353332d3135373242363f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465](https://user-images.githubusercontent.com/124098830/223829151-c0de003b-cab3-4139-a934-75411d5b4fd0.svg)
![68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d3332333333303f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c](https://user-images.githubusercontent.com/124098830/223829167-af007dc5-c90c-48d4-9a57-404665cf80cf.svg)

## Funcionalidades.

✅ Visualização de Entradas;

🛠️ Permanência de dados da configuração utilizando localStorage;

❗ Visualização de Saídas;

🟧 Visualização de Totais.

# Estrutura HTML

```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Css.css/display.css ">
    <link rel="stylesheet" href="Css.css/input.css">
    <link rel="stylesheet" href="Css.css/table.css">
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />  
    <title>Controle de Despesas</title>
</head>
<body>
    <section class="Display">
        <div class = "Display__Entradas">
            Entradas:R$
            <span class="Display__Entradas__span" id="tela-entradas">0.00</span>
        </div>
        <div class = "Display__Saídas">
            Saídas:R$
            <span id="tela-saídas">0.00</span>
        </div>
        <div class = "Display__Total">
            Total:R$
            <span id="tela-total">0.00</span>
        </div>
    </section>
    <section class = "Input">
        <div class="Input__Label">
            <label for="">Descrição:</label>
            <input type="text" class="Input__Label__input" id="descrição">
        </div>
        <div class="Input__Label">
            <label for="">Valor:</label>
            <input type="number" class="Input__Label__input" id="valor">
        </div>
        <div class="Input__Label">
            <label for="tipo">Tipo:</label>
            <select name="Tipo" id="tipo" class="Input__Label__input" >
                <option value="Entrada">Entrada</option>
                <option value="Saída">Saída</option>
            </select>
        </div>
    </section>
    <div class="divBtn">
        <button type="submit" class="divBtn__Btn" id="btn-incluir">INCLUIR</button>
    </div>
    <main class="divTable">
        <table>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th class="columnAmount">Valor</th>
                    <th class="columnType">Tipo</th>
                    <th class="columnAction"></th>
                </tr>
            </thead>
            <tbody id="tbody"></tbody>
        </table>   
    </main> 
    <script src="JavaScript.js/javascript.js"></script>
     
</body>
</html>                    
```
## Estrutura JavaScript



```
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
```

## Acesse

https://pedroteixeira1998.github.io/Controle-de-Despesas/

## Fotos

![WhatsApp Image 2023-03-08 at 16 45 34](https://user-images.githubusercontent.com/124098830/223831149-c1904613-2aba-4d62-89f6-502b98d75572.jpeg)

![WhatsApp Image 2023-03-08 at 16 45 23](https://user-images.githubusercontent.com/124098830/223831166-4b794b3e-d55d-4fec-af8e-298ee73bfa9c.jpeg)

## Autor

Linkedin: https://www.linkedin.com/in/pedro-teixeira-51a75b265/

GitHub: https://github.com/pedroteixeira1998

