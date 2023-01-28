const express = require("express");
const path = require("path");
const router = require("./routes/routesIndex")
const methodOverride = require("method-override");
const session = require("express-session")


const app = express();

//capturar la informacion de un formulario que se envia por post
app.use(express.urlencoded({extended:false}));

app.use(express.json());


//session
app.use(session({
    secret : 'petH',
    resave :false,
    saveUninitialized: true
}));
//para poder trabajar con metodos override (como por ej delete o put)
app.use(methodOverride('_method'));

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');


app.listen(process.env.PORT || 3000, ()=>{
    console.log("servidor activo en el puerto 3000");
});
app.use("/", router)