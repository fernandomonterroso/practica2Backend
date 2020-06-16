'use strict'

var express = require("express");
var equipoController = require("../controllers/equipoController");
var ligaController = require("../controllers/ligaControllers");
var multiparty = require('connect-multiparty');
var md_subir = multiparty({uploadDir: './src/uploads/users'})
var api = express.Router();

//RUTAS
api.post('/agregar-equipo/:liga', equipoController.addEquipo);
api.post('/agregar-liga', ligaController.crearLiga);

api.get('/listar-ligas', ligaController.listarLigas);
api.get('/buscar-liga/:id', ligaController.listarLigas);
api.get('/buscar-equipo/:id', equipoController.getEquipo);
api.get('/listar-equipos/:liga', equipoController.getEquipos);
api.get('/Prueba/:liga', equipoController.Prueba);
api.get('/listar-liga/:id', ligaController.listarLiga);

api.put('/editar-liga/:id', ligaController.editarLiga);
api.put('/editar-equipo/:id', equipoController.updateEquipo);

api.delete('/borrar-liga/:id', ligaController.eliminarLiga);
api.delete('/borrar-equipo/:id', equipoController.deleteEquipo);
api.get('/grafica/:liga', equipoController.Grafica);

//IMAGEN
api.post('/subir-imagen-liga/:id', [md_subir] ,ligaController.subirImagen);
api.get('/obtener-imagen-liga/:imageFile', ligaController.getImageFile);

module.exports = api;