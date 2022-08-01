let conf = require("./config");
var express = require("express");
const bp = require('body-parser');
const cookieParser = require("cookie-parser");
var app = express();
var path = require("path");
const port = conf.port;
const expressLayouts = require('express-ejs-layouts');
var timeout = require('connect-timeout');
app.use(timeout('10s'));
const rateLimit = require("express-rate-limit");
const mapRoutes = require('express-routes-mapper');
let viewrouters = require('./routes/viewRouters');
let approuters = require('./routes/apiRouters');

const fetch = require('node-fetch');

const cors = require('cors');
let environment = 'production';
environment = "";


// let farmapi = require('./farm_backend');

// var allowedOrigins = [
//     '<%= SERVER %>',
//     'https://ninebot.io'
// ];
// if (environment == 'production') {
//     app.use(cors({
//         origin: function(origin, callback) {
//             console.log(origin);
//             //if (!origin) return callback(null, true);
//             if (allowedOrigins.indexOf(origin) === -1) {
//                 var msg = 'The CORS policy for this site does not ' +
//                     'allow access from the specified Origin.';
//                 return callback(msg, false);
//             }
//             return callback(null, true);
//         }
//     }));
// } else
//     app.use(cors());


// parsing the request bodys
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(cookieParser());


const limiter = rateLimit({
    windowMs: 1 * 30 * 1000, // 15 minutes
    max: 2000 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.use(function(req, res, next) {
    var err = null;
    try {
        decodeURIComponent(req.path)
    } catch (e) {
        err = e;
    }
    if (err) {
        res.render('app-404', {
            title: "Content not found",
            description: "Content not found"
        });
    }
    next();
});




app.use(express.static(__dirname + "/static/"));

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



function errorHandler(err, req, res, next) {
    console.log("Oops");
    res.render('app-404', {
        title: "Content not found",
        description: "Content not found"

    });
}

app.use(errorHandler);


// app.use("/swap", function(req, res) {
//     res.render('abc/app/swap', {
//         title: "Swap NBG",
//         description: "Swap NBG from DAPP",
//         SERVER: conf.apiserver
//     });
// });

app.use("/farmapi", function(req, res) {
    // return res.send(farmapi);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(farmapi));
});

// app.use("/serok", function(req, res) {
//     res.render('abc/app/serok', {
//         title: "Swap NBG",
//         description: "Swap NBG from DAPP",
//         SERVER: conf.apiserver
//     });
// });



const dd = mapRoutes(viewrouters, 'controllers/');
const cc = mapRoutes(approuters, 'controllers/');



app.use('/api', cc);
app.use('/', dd);

app.use("*", function(req, res) {
    res.render('app-404', {
        title: "Content not found",
        description: "Content not found",
        SERVER: conf.apiserver
    });
});



app.listen(port, () => console.info(`App listen on port ${port}`));


//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