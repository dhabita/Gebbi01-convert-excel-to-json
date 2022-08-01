const excelToJson = require('convert-excel-to-json');

let E = async function(f) {
    const result = excelToJson({
        sourceFile: f
    });

    // console.log(result);
    let filled = result.Sheet1[0];
    let keyHeader = Object.keys(filled);
    let headerLength = keyHeader.length;
    let sheetLength = result.Sheet1.length;

    // console.log(filled);
    // console.log(sheetLength);

    let filledAll = [];
    for (let i = 0; i < sheetLength; i++) {
        filledAll[i] = []
        for (let g = 0; g < headerLength; g++) {
            filledAll[i][g] = result.Sheet1[i][keyHeader[g]];
            if (typeof(filledAll[i][g]) == "undefined") filledAll[i][g] = "";
        }
    }
    return filledAll;
}

module.exports = E;