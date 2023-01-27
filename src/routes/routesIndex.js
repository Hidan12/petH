const express = require("express");
const path = require('path');
const router = express.Router();
const indexController = require("../controllers/indexController");
const productController = require("../controllers/productController")
const multer = require('multer');
const { body } = require("express-validator");

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


//validaciones de express 
const validationCreat = [
    body("email").isEmail().withMessage("ingresar un mail valido"),
    body("frist_name").notEmpty().withMessage("este campo es obligatorio"),
    body("last_name").notEmpty().withMessage("este campo es obligatorio"),
    body("direction").notEmpty().withMessage("este campo es obligatorio"),
    body("town").notEmpty().withMessage("este campo es obligatorio"),
    body("phone_contact").notEmpty().withMessage("este campo es obligatorio"),
    body("password").notEmpty().withMessage("este campo es obligatorio"),
    body('repeat_password').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('la contraseña no cioncide');
        }
        //si pasa la validacion
        return true;
      }),
]



router.get("/", indexController.index);
//login
router.get("/login", indexController.login);
//registro
router.get("/register", indexController.register);
router.post("/register", validationCreat, indexController.registerUpload);
//producto en el carrito
router.get("/productCart", productController.productCart);
//detalles del producto
router.get("/productDetail", productController.productDetail);
//crear producto
router.get("/createProduct", productController.createProduct);
router.post("/createProduct", uploadFile.single('imagenProducto'), productController.create);
//editar un producto
router.get("/editProduct/:idProduct", productController.editProduct);
router.put("/editProduct/:idProduct",uploadFile.single('imagenProducto'), productController.modifyProduct);
//vorrar un producto
router.get("/deleteProduct/:idProduct", productController.deleteProduct);
router.delete("/deleteProduct/:idProduct", productController.delete);

module.exports = router;