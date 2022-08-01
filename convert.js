let EXTRAX = require("./st");
const con2 = require('./lite');



async function a() {
    let e = await EXTRAX("./xlxs/dlaunch.xlsx");


    for (let a = 0; a < e.length; a++) {
        let ea = e[a];

        if (ea[3].length > 5 && ea[3].indexOf("bot") < 0) //have username
        {


            let u = await con2.query("select * from user_telegram where username = ?", [ea[3]]);
            if (u.length == 0) {
                // console.log(ea[3])
                con2.run("insert into user_telegram (dari,username,first,last,phone) values(?,?,?,?,?)", [ea[0], ea[3], ea[1], ea[2], ea[4]]);
            }
        }


    }



    // let d = await con2.query("select * from users_telegram limit 1", []);
    // console.log(d);
}

a();