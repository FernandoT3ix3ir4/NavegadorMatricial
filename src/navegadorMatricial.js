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

    desenharTabela(data);
});

function desenharTabela(array) {

    if (!mapearLinhas(array)) return;

    var pTabelas = document.getElementById("pTabelas");

    while (pTabelas.firstChild) pTabelas.removeChild(pTabelas.firstChild);

    var table = criarElementosHtml("table", pTabelas);

    var titleRow = criarElementosHtml("tr", table);
    criarElementosHtml("th", titleRow);
    for (var j = 0; j < array[0].length; j++) {
        var tituloColuna = criarElementosHtml("th", titleRow);
        tituloColuna.innerHTML = "Col " + (j + 1);
    }

    for (var i = 0; i < array.length; i++) {
        var row = criarElementosHtml("tr", table);

        var tituloLinha = criarElementosHtml("th", row);
        tituloLinha.innerHTML = "Row " + (i + 1);

        for (var j = 0; j < array[i].length; j++) {
            var celula = criarElementosHtml("td", row);
            celula.innerHTML = array[i][j];
            celula.style.background = 'white';
        }
    }
}

function desenharTabelaResultado(array) {

    var pTabelaResultado = document.getElementById("pTabelaResultado");

    if (!pTabelaResultado) return;

    
    while (pTabelaResultado.firstChild) pTabelaResultado.removeChild(pTabelaResultado.firstChild);
    
    var tituloResultado = criarElementosHtml("h1", pTabelaResultado);
    tituloResultado.innerHTML = "::RESULTADO::";

    var table = criarElementosHtml("table", pTabelaResultado);

    var titleRow = criarElementosHtml("tr", table);
    criarElementosHtml("th", titleRow);
    for (var j = 0; j < array[0].length; j++) {
        var tituloColuna = criarElementosHtml("th", titleRow);
        tituloColuna.innerHTML = "Col " + (j + 1);
    }

    for (var i = 0; i < array.length; i++) {
        var row = criarElementosHtml("tr", table);

        var tituloLinha = criarElementosHtml("th", row);
        tituloLinha.innerHTML = "Row " + (i + 1);

        for (var j = 0; j < array[i].length; j++) {
            var celula = criarElementosHtml("td", row);
            celula.innerHTML = array[i][j];
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

    let teste = [];
    let controleColuna = 0;
    for (let i = 0; i < arr.length; i++) {

        let diag_ei_ds = [];
        let controleLinha = i;


        for (let j = 0; j <= i; j++) {
            let linha = controleLinha;

            if (linha < 0) break;

            let coluna = j;
            diag_ei_ds.push(data[linha][coluna]);
            controleLinha--;

            if (coluna == arr.length - 1 && linha < coluna) {

                i = arr.length - 1;
                controleLinha = i;
                j = controleColuna++;
                teste.push(diag_ei_ds);
                diag_ei_ds = [];
            }
        }
        teste.push(diag_ei_ds);
    }


    console.table(teste);
    desenharTabelaResultado(teste)
    return true;
}

function comparadorArrayMultiDimensionalComArraySimples(arrayMulti, arraySimples) {
    let identicos = false;
    for (let i = 0; i < arrayMulti.length; i++) {
        if (arrayMulti[i] === arraySimples[i])
            identicos = true;
        else {

            identicos = false;
            break;
        }

    }

    return identicos;
}

function montarDiagonalEsqSupDirInf(array) {

    let diag_es_di = [];

    for (let i = 0; i < array.length; i++) {

        diag_es_di.push(array[i][i]);
    }

    return diag_es_di;
}

function montarDiagonalEsqSupDirInfQtde(array) {

    let diag_es_di = [];

    for (let i = 0; i < array.length; i++) {

        diag_es_di.push(array[i][i]);
    }

    return diag_es_di;
}

function montarDiagonalEsqInfDirSup(array) {

    let diag_ei_ds = [];
    let iMax = array.length - 1;

    for (let j = 0; j < array.length; j++) {
        let linha = iMax;
        diag_ei_ds.push(array[linha][j]);
        iMax--;
    }

    return diag_ei_ds;
}

function montarDiagonalEsqInfDirSupQtde(indice, qtde) {

    let diag_ei_ds = [];
    let iMax = qtde;

    for (let i = indice; i <= qtde; i++) {
        let linha = iMax;

        let coluna = i;
        diag_ei_ds.push(data[linha][coluna]);
        iMax--;
    }


    return diag_ei_ds;
}

function varredorDiagBaixoParaCima(indice, tamanho) {
    let retorno = [];
    const iMax = tamanho - 1;

    for (let i = indice; i < tamanho; i++) {
        let linha = i === indice ? iMax : iMax - i;
        retorno.push(data[linha][i]);

    }

    return retorno;
}

function geradorNumeros() {
    return Math.floor(Math.random() * 10);
}

function criarElementosHtml(tag, pai) {
    var el = document.createElement(tag);
    pai.appendChild(el);
    return el;
}


function varredorDiagonaisArray(arr) {
    if ((arr || []).length === 0) return;
    const iMax = (arr.length * arr.length) - 1;
    const indiceMaxLinhaEColuna = (arr.length - 1);
    let result = [];
    let primeiraRodada = true;
    let montouDiagonalUltimaLinha = false;


    while (primeiraRodada && result.length < iMax) {
        let arrrr = [];

        for (let i = 0; i < arr.length; i++) {
            let indiceControleLinha = i;
            let indiceControleColuna = 0;
            arrrr = []

            for (let j = 0; j <= i; j++) {

                if (!montouDiagonalUltimaLinha) {
                    if (arr.indexOf((arr[indiceControleLinha][j] || [])) <= iMax &&
                        i <= indiceMaxLinhaEColuna &&
                        j <= indiceMaxLinhaEColuna) {

                        arrrr.push(arr[indiceControleLinha][j]);
                        indiceControleLinha = indiceControleLinha-- < 0 ? 0 : indiceControleLinha--;
                    }

                } else {
                    indiceControleColuna = j + 1;
                    if (Array.prototype.indexOf((arr[indiceControleLinha][indiceControleColuna] || [])) <= iMax &&
                        i <= indiceMaxLinhaEColuna &&
                        j <= indiceMaxLinhaEColuna) {

                        arrrr.push(arr[indiceControleLinha][indiceControleColuna]);
                        indiceControleLinha = indiceControleLinha-- < 0 ? 0 : indiceControleLinha--;
                    }

                }

                console.table(arrrr);
                console.table(montarDiagonalEsqInfDirSup(arr.length));
                if (arrrr === montarDiagonalEsqInfDirSup(arr.length)) {
                    montouDiagonalUltimaLinha = true;
                    j = 0;
                    indiceControleLinha = i;
                }
            }

            result.push(arrrr);
        }

        primeiraRodada = false;
    }
    console.table(result);
}