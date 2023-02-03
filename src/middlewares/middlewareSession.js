const session = require("express-session");

module.exports = {
    active: (req, res, next) =>{
        //verifica si tiene una session activa
        if (req.session.user) return res.redirect("/")
        else{
            next();
        }
    },
    checkIsActiveUser: (req, res, next) => {
        if (!req.session.user) return res.render("./users/login", {title:"Login", error: {msg: "necesita estar logeado para acceder"}})
        else{
            next();
        }
    }
}