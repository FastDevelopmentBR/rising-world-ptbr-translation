function readLanguageFile(languageCode) {
    var fs = require('fs')
    var path = require('path')

    var filePath = path.join(__dirname, '..', `${languageCode}.json`);

    var fileData = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return JSON.parse(fileData);
}

function iterate(list1, list2) {
    var keys = Object.keys(list1);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (typeof list1[key] === 'string') {
            totalStrings++;

            if ((list1[key] !== list2[key]) && (list2[key] !== undefined && list2[key] !== "")) {
                translatedCounter++;
                if (debug) console.log(`${JSON.stringify(list1[key])} => ${JSON.stringify(list2[key])}`);
            }
        } else {
            iterate(list1[key], list2[key])
        }
    }
}

let translatedCounter = 0,
    totalStrings = 0,
    debug = false;

// Calcula quantidade de itens traduzidos
// - Possui uma margem de erro, pois não considera como traduzido itens que sejam iguais em ambas as linguas.
// - Não considera nenhuma informação do babelEdit, como a variável de aprovado.
function init() {
    let originalLanguage = 'en'
    let translatedLanguage = 'pt-br'

    let originalLanguageData = readLanguageFile(originalLanguage)
    let translatedLanguageData = readLanguageFile(translatedLanguage)

    iterate(originalLanguageData, translatedLanguageData)

    console.log('Quantidade de strings traduzidas: ', translatedCounter);
    console.log('Porcentagem de strings traduzidas: ', ((translatedCounter / totalStrings) * 100).toFixed(0), '%');
}

init()