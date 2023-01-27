const path = require('path');
const fs = require('fs');

//rutas para acceder a los archivos de la base de datos
const rutaProduct = path.join(__dirname, "../database/product.json");
const rutaCategory = path.join(__dirname, "../database/category.json");

//trae la informacion de la base de dato  y lo parsea
let product = JSON.parse(fs.readFileSync(rutaProduct));
let category = JSON.parse(fs.readFileSync(rutaCategory));

const productController = {
    productCart: (req, res) =>{
        res.render("./products/productCart", {title:"productCart"});
    },
    productDetail: (req, res) =>{
        res.render("./products/productDetail", {title:"productDetail"});
    },
    createProduct: (req, res) =>{
        res.render("./products/produc", {
            title:"createProduct",
            type:"create",
            box: product[0], 
            category: category.filter( c => c.categoria == "categoria"),
            typeOfPets: category.filter( c => c.categoria == "tipo_mascota"),
            actions: "/createProduct"
           
        });
    },
    create: (req, res) => {
        let id = product[product.length - 1].id + 1
        if(!req.file){
            return res.send("no se cargo ninguna imagen por favor regrese al formulario y carge una imagen")
        };
        let newProduct = {
            id: id,
            nombre: req.body.nombre,
            tipo_mascota: req.body.tipo_mascota,
            categoria:req.body.categoria,
            marca: req.body.marca,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            precio: req.body.precio,
            descuento: req.body.descuento,
            img: "/img/product/" + req.file.filename
        };
        product.push(newProduct);
        
        fs.writeFileSync(rutaProduct, JSON.stringify(product, null, 2));
        res.redirect("/");
    },
    editProduct: (req, res) =>{
        const idProduct = req.params.idProduct;
        const producto = product.find( p => p.id == idProduct && !p.borrado)
        if(producto){
            res.render("./products/produc", {
                title:"editProduct",
                type:"edit", 
                box: producto, 
                category: category.filter( c => c.categoria == "categoria"), 
                typeOfPets: category.filter( c => c.categoria == "tipo_mascota"),
                actions: "/editProduct/" + idProduct + "?_method=PUT"
            });
        }else{
                res.send("Producto no encontrado")
            }
    },
    modifyProduct: (req, res) =>{
        const idProduct = req.params.idProduct;
        const modify = product.find(m => m.id == idProduct);
        if (req.body.nombre) modify.nombre = req.body.nombre;
        if (req.body.tipo_mascota)modify.tipo_mascota = req.body.tipo_mascota;
        if (req.body.marca)modify.marca = req.body.marca;
        if (req.body.descripcion) modify.descripcion = req.body.descripcion;
        if (req.body.categoria) modify.categoria = req.body.categoria;
        if (req.body.precio) modify.precio = req.body.precio;
        if (req.body.descuento) modify.descuento = req.body.descuento;
        if (req.file) modify.img = "/img/product/" + req.file.filename
    
        fs.writeFileSync(rutaProduct, JSON.stringify(product, null, 2));
        res.send(modify);
        
    },
    deleteProduct: (req, res) =>{
        const idProduct = req.params.idProduct;
        const producto = product.find( p => p.id == idProduct && !p.borrado)
        
        if(producto){
            res.render("./products/deleteProduct", {
                pro: producto, 
                category: category.filter( c => c.categoria == "categoria"), 
                typeOfPets: category.filter( c => c.categoria == "tipo_mascota"),
                title:"borrarProduct"
            });
        }else{
                res.send("Producto no encontrado")
            }
    },
    delete: (req, res) =>{
        const idProduct = req.params.idProduct;
        const productoEliminado = product.find( p => p.id == idProduct);
        productoEliminado.borrado = true;
        fs.writeFileSync(rutaProduct, JSON.stringify(product, null, 2));
        res.redirect("/");
    },
}
module.exports = productController;