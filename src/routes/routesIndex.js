const express = require("express");
const path = require('path');
const router = express.Router();
const indexController = require("../controllers/indexController");
const productController = require("../controllers/productController")
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

router.get("/", indexController.index);
router.get("/login", indexController.login);
router.get("/register", indexController.register);
router.get("/productCart", productController.productCart);
router.get("/productDetail", productController.productDetail);
router.get("/createProduct", productController.createProduct);
router.post("/createProduct", uploadFile.single('imagenProducto'), productController.create);
router.get("/editProduct/:idProduct", productController.editProduct);
router.put("/editProduct/:idProduct",uploadFile.single('imagenProducto'), productController.modifyProduct);
router.get("/deleteProduct/:idProduct", productController.deleteProduct);
router.delete("/deleteProduct/:idProduct", productController.delete);
module.exports = router;