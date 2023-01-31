const session = require("express-session");

module.exports = {
    active: (req, res, next) =>{
        //verifica si tiene una session activa
        if (req.session.email) return res.render("./error/error", { title: "producto", box:  "ya esta activo, no puede logerase de nuevo", img: "sorpres.gif"})
        else{
            next();
        }
    },
    checkIsActiveUser: (req, res, next) => {
        if (!req.session.email) return res.render("./users/login", {title:"Login", error: {msg: "necesita estar logeado para acceder"}})
        else{
            next();
        }
    }
}