const fs = require("fs");
const path = require("path");

module.exports = {
    parse: (ruta) => JSON.parse(fs.readFileSync(ruta)),

    write: (ruta, array) =>  fs.writeFileSync(ruta, JSON.stringify(array, null, 2)),

    creatObjt: (body) => {
        let obj = {};
        for (let b in body) obj[b] = body[b];
        return obj; 
    }

    

}