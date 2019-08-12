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

    let teste = [];
    let controleTamanho = 1;
    let isTheEnd = false;
    for (let i = 0; i < arr.length; i++) {


        teste.push(montarDiagonalEsqInfDirSupQtde(i, controleTamanho));
        controleTamanho++;

        if (comparadorArrayMultiDimensionalComArraySimples(teste[teste.length - 1], montarDiagonalEsqInfDirSup(data))) {
            isTheEnd = true;
            let controleTamanho = arr.length;
            for (let j = 0; j < arr.length; j++) {

                teste.push(montarDiagonalEsqInfDirSupQtde(j, controleTamanho));
                controleTamanho--;



            }
        }

        if (isTheEnd) break;
    }


    console.table(teste);

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
        // let linha = j === 0 ? iMax : iMax - j;
        let linha = iMax;
        diag_ei_ds.push(array[linha][j]);
        iMax--;
    }

    return diag_ei_ds;
}

function montarDiagonalEsqInfDirSupQtde(indice, qtde) {

    let diag_ei_ds = [];
    let iMax = qtde - 1;

    if (indice === qtde)
        diag_ei_ds.push(data[qtde][indice]);



    for (let i = indice; i < qtde; i++) {
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