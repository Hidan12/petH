const session = require("express-session");
const path = require('path');
const fs = require('fs');


const rutaUsers = path.join(__dirname, "../database/users.json");
let users = JSON.parse(fs.readFileSync(rutaUsers));

function middlewareCookies(req, res, next) {
    // if (req.cookies.email != undefined && req.session.email == undefined) {
    //     let consultaBD = users.find(u => u.email == req.body.email);
    //     if (consultaBD) {
    //         req.session.email = consultaBD.email;
    //     }
    // }
    console.log("entro");
    next()
    
}
module.exports = middlewareCookies;