const { body } = require("express-validator");

module.exports = {
    register: [
        body("email").isEmail().trim().normalizeEmail().withMessage("ingresar un mail valido"),
        body("frist_name").notEmpty().trim().withMessage("este campo es obligatorio"),
        body("last_name").notEmpty().trim().withMessage("este campo es obligatorio"),
        body("direction").notEmpty().trim().withMessage("este campo es obligatorio"),
        body("town").notEmpty().trim().withMessage("este campo es obligatorio"),
        body("phone_contact").notEmpty().withMessage("este campo es obligatorio"),
        body("password").notEmpty().withMessage("este campo es obligatorio"),
        body("repeat_password").custom((value, {req}) =>{
            if(value != req.body.password){
                throw new Error('la contraseña no coincide');
            }else{
                return true;
            }
        })
    ],
    login: [
        body("email").isEmail().trim().normalizeEmail().withMessage("ingresar un mail valido")

    ]
}