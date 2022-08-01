let dbb = require("./connect");

//ROUTER SELECT LITE TO PORGRESQL

let db = {};
db.query = async function(sql, params) {
    let b = 1;
    while (sql.includes("?")) {

        //  console.log(sql);
        sql = sql.replace("?", `$${b}`);
        b++;
    }
    let a = await dbb.query(sql, params);
    return a;
};


db.run = async function(sql, params) {
    let b = 1;
    while (sql.includes("?")) {
        sql = sql.replace("?", `$${b}`);
        b++;
    }
    console.log(sql);
    let a = await dbb.none(sql, params);
    return a;
};


module.exports = db;