const session = require("express-session");
const path = require('path');
const fs = require('fs');


const rutaUsers = path.join(__dirname, "../database/users.json");
let users = JSON.parse(fs.readFileSync(rutaUsers));
function middlewareCookies(req, res, next) {
    console.log("entro");
    //pregunta si hay una cookie email y si la session email este desactivada
    if (req.cookies.tmp && !req.session.user) {
        //busca el email en la base de datos para verificar que este
        let consultaBD = users.find(u => u.email == req.cookies.tmp);
        //si esta se acctiva la session
        if (consultaBD) {
            req.session.user = {
                email: consultaBD.email,
                frist_name: consultaBD.frist_name,
                last_name: consultaBD.last_name,
                direction: consultaBD.direction,
                town: consultaBD.town,
                phone_contact: consultaBD.phone_contact,
                type: consultaBD.type,
            };
        }
    }else if(req.cookies.perm && !req.session.user){
        return res.render("./users/login", {title:"Login", email: req.cookies.perm, error: {msg: "debe de ingresar nuevamente para acceder"}})
    }
    next();
}
module.exports = middlewareCookies;