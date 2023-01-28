const path = require('path');
const fs = require('fs');
const { validationResult, body, cookie } = require("express-validator");
//bcryptjs
const bcrypt = require("bcryptjs");
const session = require('express-session');

//rutas para acceder a los archivos de la base de datos
const rutaProduct = path.join(__dirname, "../database/product.json");
const rutaCategory = path.join(__dirname, "../database/category.json");
const rutaUsers = path.join(__dirname, "../database/users.json");

//trae la informacion de la base de dato  y lo parsea
let product = JSON.parse(fs.readFileSync(rutaProduct));
let category = JSON.parse(fs.readFileSync(rutaCategory));

let users = JSON.parse(fs.readFileSync(rutaUsers));

//base para crear ejs
const baseRegister = {
    frist_name: "",
    last_name: "",                
    direction: "",
    town: "",
    email: "",
    phone_contact: 0,
    password: "",
    repeat_password: ""
};


const indexController = {
    index: (req, res) =>{
        res.render("./users/index", {product: product, category: category.filter(p => p.categoria == "categoria"), title:"Pet House"});
    },
    login: (req, res) =>{
        res.render("./users/login", {title:"Login"});
    },
    inLogin: (req, res) =>{

        //trae las validaciones echas en la ruta
        const resultValidation = validationResult(req);
        
        //se fija si hay errores y si lo hay muestra la vista del login y indica el error
        if(resultValidation.errors.length > 0 ){
            return res.render("./users/login", {title:"Login", error: resultValidation.mapped()})
        }
        
        //busca el usuario en la base de datos
        let consultaBD = users.find(u => u.email == req.body.email)
        
        //si no lo encuentra vuelve a la vista y muestra el error
        if (consultaBD == undefined) {
            return res.render("./users/login", {title:"Login", error:{msg:"no tenemos registro"}})
        }else if (!bcrypt.compareSync(req.body.password, consultaBD.password)) {  // se fija si la contraseña es igual a la base de datos
            return res.render("./users/login", {title:"Login", error: {msg:"no tenemos registro"}})
        }else{ //si pasa las anteriores verificacion ingresa al sitio
            req.session.email = consultaBD.email;
            
            if (req.body.recordarPasword) {
                //se crea una cooki para guardar el usuario para poder logearse de nuevo
                res.cookie('email', consultaBD.email, {maxAge: 60000 *  2})
                console.log("entro al check");
            }
            
            
            res.redirect("/")
        }
    },

    register: (req, res) =>{
        res.render("./users/register", {title:"registre", box: baseRegister});
    },
    registerUpload: (req, res) =>{
        const resultValidation = validationResult(req);
        
        if(resultValidation.errors.length > 0 ) {
            return res.render("./users/register",{title:"registre", error: resultValidation.mapped(), box: req.body});
        }
        else{
            const newUser = {
                id:  users + 1,
                frist_name: req.body.frist_name,
                last_name: req.body.last_name,                
                direction: req.body.direction,
                town: req.body.town,
                email: req.body.email,
                phone_contact: req.body.phone_contact,
                password: bcrypt.hashSync(req.body.password, 10),
                type:"cliente"
            }
            users.push(newUser);
            fs.writeFileSync(rutaUsers, JSON.stringify(users, null, 2));
            res.redirect("/");
        } 
    }
};
module.exports = indexController;