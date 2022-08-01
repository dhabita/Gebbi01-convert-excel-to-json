let config = require("../config");

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
const A = () => {
    const view = async(req, res) => {




        // console.log(req);
        let pathn = req.originalUrl;
        let pp = pathn.replace('/', "");
        if (pathn == "/") {
            pp = ""


            res.render('index.ejs', {
                title: "Ninebot.io",
                description: "Automatic Binance Trading Bot",

            })
            return;
        }
        pathn = pathn.replace(/[&\\#,+()$~%.'":*<>{}]/g, '');
        console.log(pathn);
        path = pathn.replace(".html", "");


        if (pathn.split("?").length > 0)
            path = pathn.split("?")[0];

        if (path == "/") path = "index";
        path = path.replace(".html", "");
        path = path.replace("/", "");
        // path = pathn.replace("auth/", "");
        // let pa = path;
        // console.log(path);




        path += ".ejs";


        res.render(path, {
            title: capitalize(pp) + " - Ninebot.io",
            description: capitalize(pp) + " - Ninebot.io",
            SERVER: config.apiserver

        })
    }




    return { view };
}

module.exports = A;