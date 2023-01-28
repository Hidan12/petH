const session = require("express-session");

module.exports = {
    active: (req, res, next) =>{
        //verifica si tiene una session activa
        if (req.session.email) res.send("ya esta activo, no puede logerase de nuevo");
        
        next();
    }
}