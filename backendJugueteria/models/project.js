'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    name: String,
    category: String,
    price: mongoose.Decimal128 ,
    image: String
});

module.exports = mongoose.model('Mi_jugueteria',ProductoSchema);
