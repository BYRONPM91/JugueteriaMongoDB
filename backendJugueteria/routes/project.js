'use strict'
var express = require('express');
var ProjectController = require('../controllers/project');
var ContactoController = require('../controllers/contacto');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.get('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProducto);
router.post('/save-contacto', ContactoController.saveContacto);
router.get('/project/:id?', ProjectController.getProducto);//El simbolo ? significa opcional
router.get('/projects', ProjectController.getProductos);
router.put('/project/:id', ProjectController.updateProducto);
router.delete('/project/:id', ProjectController.deleteProducto);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;
