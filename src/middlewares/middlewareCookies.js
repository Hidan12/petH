const session = require("express-session");
const path = require('path');
const fs = require('fs');


const rutaUsers = path.join(__dirname, "../database/users.json");
let users = JSON.parse(fs.readFileSync(rutaUsers));

function middlewareCookies(req, res, next) {
    //pregunta si hay una cookie email y si la session email este desactivada
    if (req.cookies.email != undefined && !req.session.email) {
        //busca el email en la base de datos para verificar que este
        let consultaBD = users.find(u => u.email == req.cookies.email);
        //si esta se acctiva la session
        if (consultaBD) {
            req.session.email = consultaBD.email;
        }
    }
    next();
}
module.exports = middlewareCookies;