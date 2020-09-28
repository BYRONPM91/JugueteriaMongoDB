'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactoSchema = Schema({
    nombre: String,
    apellido: String,
    comentario: String,
    email: String,
});

module.exports = mongoose.model('Contacto',ContactoSchema);
