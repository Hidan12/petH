const express = require("express");
const path = require('path');
const router = express.Router();
//controladores
const indexController = require("../controllers/indexController");
const productController = require("../controllers/productController")

//validaciones de express 
const { body } = require("express-validator");

const valit = require("../middlewares/validator");
//const middlewareCookies = require("../middlewares/middlewareCookies");




//tratamiento de archivos

const multer = require('multer');
const directorioImg = path.join(__dirname, "../../public/img/product")


//configurando en donde se va a guardar los archivos
const storage = multer.diskStorage({
    //direccion en donde se guarda
    destination: (req, file, cb) =>{
        cb(null, directorioImg)
    },
    //nombre con el que se guarda el archivo
    filename: (req, file, cb) =>{
        const fileName = 'product' + Date.now() + path.extname(file.originalname)
        cb(null, fileName);
    }
});

const uploadFile = multer({storage});






router.get("/" ,indexController.index);
//login
router.get("/login", indexController.login);
router.post("/login", valit.login, indexController.inLogin)
//registro
router.get("/register", indexController.register);
router.post("/register", valit.register, indexController.registerUpload);
//producto en el carrito
router.get("/productCart", productController.productCart);
//detalles del producto
router.get("/productDetail", productController.productDetail);
//crear producto
router.get("/createProduct", productController.createProduct);
router.post("/createProduct", uploadFile.single('imagenProducto'), productController.create);
//editar un producto
router.get("/editProduct/:idProduct", productController.editProduct);
router.put("/editProduct/:idProduct", uploadFile.single('imagenProducto'), productController.modifyProduct);
//vorrar un producto
router.get("/deleteProduct/:idProduct", productController.deleteProduct);
router.delete("/deleteProduct/:idProduct", productController.delete);

module.exports = router;