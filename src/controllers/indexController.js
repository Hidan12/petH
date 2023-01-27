const path = require('path');
const fs = require('fs');
const { validationResult } = require("express-validator")

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

    register: (req, res) =>{
        res.render("./users/register", {title:"registre", box: baseRegister});
    },
    registerUpload: (req, res) =>{
        const resultValidation = validationResult(req);
        
        if(resultValidation.length > 0) {
            console.log(req.body);
            return res.render("./users/register",{title:"registre", error: resultValidation.mapped(), box: req.body});
        }
        else{
            console.log("prroooooooooooo");
            const newUser = {
                frist_name: req.body.frist_name,
                last_name: req.body.last_name,                
                direction: req.body.direction,
                town: req.body.town,
                email: req.body.email,
                phone_contact: req.body.phone_contact,
                password: req.body.password
            }
            users.push(newUser);
            fs.writeFileSync(rutaUsers, JSON.stringify(users, null, 2));
            res.redirect("/");
        } 
    }
};
module.exports = indexController;