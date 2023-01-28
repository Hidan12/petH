const session = require("express-session");

module.exports = {
    active: (req, res, next) =>{
        //verifica si tiene una session activa
        if (req.session.email) res.render("./error/error", { title: "producto", box:  "ya esta activo, no puede logerase de nuevo", img: "sorpres.gif"})
        
        next();
    }
}