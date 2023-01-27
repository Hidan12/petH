const express = require("express");
const path = require("path");
const router = require("./routes/routesIndex")
const methodOverride = require("method-override");

const app = express();

//capturar la informacion de un formulario que se envia por post
app.use(express.urlencoded({extended:false}));

app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');


app.listen(process.env.PORT || 3000, ()=>{
    console.log("servidor activo en el puerto 3000");
});
app.use("/", router)