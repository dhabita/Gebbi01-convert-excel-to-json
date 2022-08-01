let EXTRAX = require("./st");

async function a() {
    let e = await EXTRAX("123.xlsx");
    console.log(e);
}

a();