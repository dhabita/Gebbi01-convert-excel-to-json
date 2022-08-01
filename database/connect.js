require('dotenv').config();
console.log(process.env);

let dbnya = {
    user: process.env.username1,
    pass: process.env.password1,
    host: process.env.host1,
    database: process.env.database1,
    port: process.env.port1,
    ssl: process.env.sslmode1
}





let st = `postgres://${dbnya.user}:${dbnya.pass}@${dbnya.host}:${dbnya.port}/${dbnya.database}`; //?sslmode=${dbnya.ssl}
console.log(st);

const pgp = require('pg-promise')( /* options */ );

// Or you can use it this way
const config = {
    connectionString: st,
    max: 30,
    ssl: { rejectUnauthorized: false }
};
const db = pgp(config);
//db.ssl = { rejectUnauthorized: false };



// db.one('SELECT $1 AS value', 123)
//   .then((data) => {
//     console.log('DATA:', data.value)
//   })
//   .catch((error) => {
//     console.log('ERROR:', error)
//   })

// db.none(`drop table note
// `);
// return;
// db.none(`create table if not exists note
// (   
//     id serial PRIMARY KEY,
// 	ket VARCHAR ( 5000 )  NOT NULL,
//     dat TIMESTAMP
// );
// `);

// db.one('SELECT from note ')
//   .then((data) => {
//     console.log('DATA:', data)
//   })
//   .catch((error) => {
//     console.log('ERROR:', error)
//   })

//  db.none(`insert into note(ket,dat) values('aa',NOW())`);

//   async function tes(){
//       try {
//         let r = await db.any('SELECT * FROM note ', []);
//         console.log(r);

//         return;
//       } catch (error) {
//           console.log(error);

//       }

//   }

//   tes();

module.exports = db;