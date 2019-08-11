var data = [];

btnGerarMatriz.addEventListener("click", function () {
    var inputRows = document.getElementById("inputRow");
    var inputCols = document.getElementById("inputCol");
    data = [];

    for (let i = 0; i < inputRows.value; i++) {
        let arr = [];
        for (let j = 0; j < inputCols.value; j++) {
            arr.push(geradorNumeros());

        }
        data.push(arr);
    }

    desenharTabela();
    // console.table(data);
});

function desenharTabela() {


    if (!mapearLinhas(data)) return;

    var pTabelas = document.getElementById("pTabelas");


    while (pTabelas.firstChild) pTabelas.removeChild(pTabelas.firstChild);

    var table = criarElementosHtml("table", pTabelas);

    var titleRow = criarElementosHtml("tr", table);
    criarElementosHtml("th", titleRow);
    for (var j = 0; j < data[0].length; j++) {
        var tituloColuna = criarElementosHtml("th", titleRow);
        tituloColuna.innerHTML = "Col " + (j + 1);
    }

    for (var i = 0; i < data.length; i++) {
        var row = criarElementosHtml("tr", table);

        var tituloLinha = criarElementosHtml("th", row);
        tituloLinha.innerHTML = "Row " + (i + 1);

        for (var j = 0; j < data[i].length; j++) {
            var celula = criarElementosHtml("td", row);
            // console.log(data[i][j]);

            celula.innerHTML = data[i][j];
            celula.style.background = 'white';
        }
    }
}

function mapearLinhas(arr) {
    if ((arr || []).length == 0 || (arr[0] || []).length == 0) {
        alert("Matriz inválida FDP! Você sabe o que é uma matriz!?");
        return false;
    }

    if ((arr || []).length !== (arr[0] || []).length) {
        alert("Essa matriz não é quadrada....Não sou obrigado.")
        return false;
    }

    // Region so para exemplificar
    console.log("Diagona Esquerda Superior -> Direita Inferior");

    console.table(montarDiagonalEsqSupDirInf(arr.length));

    console.log("Diagona Esquerda Inferior -> Direita Superior");
    console.table(montarDiagonalEsqInfDirSup(arr.length));

    return true;
}

function montarDiagonalEsqSupDirInf(qtdeCols) {

    let diag_es_di = [];

    let escalador = 1;
    for (let i = 0; i < qtdeCols; i++) {
        if (i === 0)
            diag_es_di.push(i);
        else {
            diag_es_di.push((+diag_es_di[i - 1] + escalador) + (qtdeCols));
        }
    }

    return diag_es_di;
}



function montarDiagonalEsqInfDirSup(qtdeCols) {

    let diag_ei_ds = [];

    let iMax = (qtdeCols) - 1;

    for (let i = 0; i < qtdeCols; i++) {
        if (i === 0) {
            diag_ei_ds.push((qtdeCols * qtdeCols) - qtdeCols);
            continue;
        }

        diag_ei_ds.push((+diag_ei_ds[i - 1] - iMax));
    }

    return diag_ei_ds;
}

function geradorNumeros() {
    return Math.floor(Math.random() * 10);
}

function criarElementosHtml(tag, pai) {
    var el = document.createElement(tag);
    pai.appendChild(el);
    return el;
}