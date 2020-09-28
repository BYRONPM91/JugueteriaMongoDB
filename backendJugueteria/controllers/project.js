'use strict'
var ProductoModel = require('../models/project');
var fs = require('fs');
var path= require('path');
const { exists } = require('../models/project');

var controller={
    home:function(req,res){
        return res.status(200).send({
            message:"Soy la home"
        });
    },
    test:function(req,res){
        return res.status(200).send({
            message:"Soy la pagina test"
        });
    },
    saveProducto:function(req, res){
        var productoModel = new ProductoModel();
        var params=req.body;
        productoModel.name = params.name;
        productoModel.category = params.category;
        productoModel.price = params.price;
        productoModel.image = null;

        productoModel.save((err, productoStored)=>{
            if(err) return res.status(500).send({message:'Error al guardar'});
            if(!productoStored) return res.status(404).send({message:'No se ha podido guardar el proyecto'});
            return res.status(200).send({project: productoStored});
        });
    },
    getProducto:function(req, res){
        const productoId = req.params.id;
        if(productoId === null) return res.status(404).send({message:'El proyecto no existe'});
        ProductoModel.findById(productoId,(err, producto)=>{
            if(err) return res.status(500).send({message:'Error al devolver los datos'});
            if(!producto) return res.status(404).send({message:'El proyecto no existe'});
            return res.status(200).send({project: producto});
        });
    },
    getProductos:function(req, res){
        //ordenar por año de mayor a menor
        //condiciones para anio o más parametros
            //Project.find({year:2019}).exec((err,projects)=>{
            ProductoModel.find({}).sort('-2020').exec((err,projects)=>{
            if(err) return res.status(500).send({message:'Error al devolver los datos'});
            if(!projects) return res.status(404).send({message:'No hay proyectos para mostrar'});
            return res.status(200).send({projects});
        });
    },
    updateProducto:function(req, res){
        var projectId=req.params.id;
        var update=req.body;
        ProductoModel.findByIdAndUpdate(projectId,update,{new:true},(err,projectUpdate)=>{
            if(err) return res.status(500).send({message:'Error al actualizar los datos'});
            if(!projectUpdate) return res.status(404).send({message:'No existe para actualizar'});
            return res.status(200).send({project:projectUpdate});
        });
    },
    deleteProducto:function(req, res){
        var projectId=req.params.id;
        
        ProductoModel.findByIdAndRemove(projectId,(err,projectRemoved)=>{
            if(err) return res.status(500).send({message:'No se ha podido borrar el proyecto'});
            if(!projectRemoved) return res.status(404).send({message:'No se puede eliminar el proyecto'});
            return res.status(200).send({project:projectRemoved});
        });
    },
    uploadImage:function(req,res){
        var projecId=req.params.id;
        var fileName='Imagen no subida...';

        if(req.files){
            var filePath=req.files.image.path;
            var file_split=filePath.split('\\');
            var fileName=file_split[1];
            var extSplit=fileName.split('\.');
            var fileExt=extSplit[1];
            if(fileExt=='png' || fileExt=='jpg' || fileExt=='jpeg' || fileExt=='gif'){
                ProductoModel.findByIdAndUpdate(projecId,{image:fileName},{new:true},(err,projectUpdated)=>{
                    if(err) return res.status(500).send({message:'La imagen no se ha subido'});
                    if(!projectUpdated) return res.status(404).send({message:'El proyecto no existe y  no se subio la imagen'});
                    return res.status(200).send({project:projectUpdated});
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:'La extensión no es válida'});
                });
            }
        }else{
            return res.status(200).send({message:fileName});
        }
    },
    getImageFile:function(req,res){
        var file=req.params.image;
        var path_file='./uploads/'+file;

        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message:'No existe la imagen...'
                });
            }
        });
    }
}

module.exports = controller;
