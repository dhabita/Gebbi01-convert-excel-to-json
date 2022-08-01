 let config = require("../config");

 let con2 = require("../lite");

 function capitalize(string) {
     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
 }


 var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

 function isEmailValid(email) {
     if (!email)
         return false;

     if (email.length > 50)
         return false;

     var valid = emailRegex.test(email);
     if (!valid)
         return false;

     // Further checking of some things regex can't handle
     var parts = email.split("@");
     if (parts[0].length > 64)
         return false;

     var domainParts = parts[1].split(".");
     if (domainParts.some(function(part) { return part.length > 63; }))
         return false;

     return true;
 }


 const A = () => {

     const tes = async(req, res) => {

         let user = req.params;

         let t = await con2.query(`select count(id) from users`, []);


         return res.status(200).json({
             status: false,
             message: t
         });

     }


     const list = async(req, res) => {

         let limit = req.params["limit"];
         let page = req.params["page"];

         if (limit > 1000) limit = 1000;

         let t = await con2.query(`select * from user_telegram order by id asc offset ? limit ?`, [page * limit, limit]);


         return res.status(200).json({
             status: false,
             data: t
         });

     }

     const add = async(req, res) => {

         let body = req.body;



         return res.status(200).json({
             status: false,
             message: "done"
         });

     }

     const userbyemail = async(req, res) => {

         let body = req.body;

         if ("email" in body) {

         } else
             return res.status(200).json({
                 status: false,
                 message: "Required Email Address"
             });



         if (!isEmailValid(body.email)) {
             return res.status(200).json({
                 status: false,
                 message: "Email Address not Valid"
             });
         }

         body.email = body.email.toLowerCase();

         let a = await bsc.new();
         let addr = a.address;
         let key = a.privateKey;

         let t = await con2.query(`select id,wallet from users where email = ?`, [body.email]);
         if (t.length == 0) {
             con2.run(`insert into users (email,wallet,pr) values(?,?,?)`, [body.email, addr, key]);
         } else {
             if (t[0].wallet.length < 20) {
                 con2.run(`update   users set  wallet=?,pr=? where email=?`, [addr, key, body.email]);
             }
         }

         t = await con2.query(`select reward,email,id,wallet,balance_token from users where email = ?`, [body.email]);

         return res.status(200).json({
             status: true,
             data: t[0]
         });

     }













     return { tes, userbyemail, add, list };
 }

 module.exports = A;