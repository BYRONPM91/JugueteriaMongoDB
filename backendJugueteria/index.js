'use strict'

var mongoose=require('mongoose');//cargar el modulo del mongoose
//luego crearemos el app.js
var app=require('./app');
const port=3705;
mongoose.promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/jugueteria')
    .then(()=>{
        console.log("Conexión a la bdd establecida con éxito....");
        app.listen(port,()=>{
            console.log("Servidor corriendo correctamente en el url: localhost:" + port);
        })
    })
    .catch(err=>console.log(err));