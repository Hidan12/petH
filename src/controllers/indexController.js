const path = require('path');
const fs = require('fs');

//rutas para acceder a los archivos de la base de datos
const rutaProduct = path.join(__dirname, "../database/product.json");
const rutaCategory = path.join(__dirname, "../database/category.json");

//trae la informacion de la base de dato  y lo parsea
let product = JSON.parse(fs.readFileSync(rutaProduct));
let category = JSON.parse(fs.readFileSync(rutaCategory));


const indexController = {
    index: (req, res) =>{
        res.render("./users/index", {product: product, category: category.filter(p => p.categoria == "categoria"), title:"Pet House"});
    },
    login: (req, res) =>{
        res.render("./users/login", {title:"Login"});
    },

    register: (req, res) =>{
        res.render("./users/register", {title:"registre"});
    }
};
module.exports = indexController;