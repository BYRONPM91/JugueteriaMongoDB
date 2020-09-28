'use strict'
var ContactoModel = require('../models/contacto');
const { exists } = require('../models/contacto');

var controller={
    saveContacto:function(req, res){
        var contactoModel = new ContactoModel();
        var params=req.body;
        contactoModel.nombre = params.nombre;
        contactoModel.apellido = params.apellido;
        contactoModel.email = params.email;
        contactoModel.comentario = params.comentario;

        contactoModel.save((err, contactoStored)=>{
            if(err) return res.status(500).send({message:'Error al guardar'});
            if(!contactoStored) return res.status(404).send({message:'No se ha podido guardar el contacto'});
            return res.status(200).send({project: contactoStored});
        });
    },
}

module.exports = controller;
