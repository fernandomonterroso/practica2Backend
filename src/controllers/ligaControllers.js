'use strict'

var Liga = require('../models/liga');
var path = require('path');
var fs = require('fs');

function crearLiga(req, res) {
    var liga = new Liga();
    var params = req.body;
    if (params.nombre ) {
        liga.nombre = params.nombre;
        liga.pais = params.pais;
        liga.imagen = params.imagen;

        Liga.find({
            $or: [
                { nombre: liga.nombre.toLowerCase() }
            ]
        }).exec((err, ligas) => {
            if (err) return res.status(500).send({ mesagge: 'Error en la peticion de Usuario' })
            if (ligas && ligas.length >= 1) {
                return res.status(500).send({ mesagge: 'El Usuario ya existe' });
            } else {
           
                    liga.save((err, ligaGuardada) => {
                        if (err) return res.status(500).send({ mesagge: 'Error en guardar el usuario' })
                        if (ligaGuardada) {
                            res.status(200).send({ liga: ligaGuardada })
                        } else {
                            res.status(404).send({ mesagge: 'no se a podido registar al usuario' })
                        }
                    })
                
            }
        })
    } else {
        res.status(200).send({
            mesagge: 'Rellene los datos necesarios'
        })
    }
}


function listarLigas(req, res) {
    Liga.find({}, (err, ligas) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'no se ha podido listar' })
        } else {
            res.status(200).send({ ligas });
        }
    });
}


function editarLiga(req, res) {
    var ligaId = req.params.id;
    var params = req.body;
    var empresaRol = req.params.nombreUsuario;

    //BORRAR LA PROPIEDAD DE PASSWORD
    delete params.password;

    
    Liga.findByIdAndUpdate(ligaId, params, { new: true }, (err, ligaActualizado) => {
        if (err) return res.status(500).send({ mesagge: 'Error en la peticion' })
        if (!ligaActualizado) return res.status(404).send({ mesagge: 'No se han podido actualizar los datos del usuario' })
        return res.status(200).send({ liga: ligaActualizado });
    })
}

function eliminarLiga(req, res) {
    let ligaId = req.params.id;
    
    Liga.findByIdAndDelete(ligaId, (err, ligaEliminada) => {
        if (err)
            return res.status(500).send({ message: 'Error en la petición' });
        if (!ligaEliminada)
            return res.status(404).send({ message: 'No se ha podido eliminar la tarea' });
        return res.status(200).send({ liga: ligaEliminada });
    });
}


function subirImagen(req, res) {
    var userId = req.params.id;
    if (req.files) {
        var file_path = req.files.image.path;
        console.log(file_path);
        var file_split = file_path.split('\\');
        console.log(file_split);

        var file_name = file_split[3];
        console.log(file_name);

        var ext_xplit = file_name.split('\.');
        console.log(ext_xplit);

        var file_ext = ext_xplit[1];
        console.log(file_ext);

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif' || file_ext == 'jfif') {
            Liga.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, usuarioActualizado) => {
                if (err) return res.status(500).send({ mesagge: 'error en la peticion' })

                if (!usuarioActualizado) return res.status(404).send({ mesagge: 'No se a podido actualizar el usuario' })

                return res.status(200).send({ contacto: usuarioActualizado })

            })
        } else {
            return removeFilerOfUploads(res, file_path, 'Extension no valida')
        }
    }
}

function removeFilerOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({
            mesagge: message
        })
    })
}

function getImageFile(req, res) {
    var image_file = req.params.imageFile;
    var path_file = './src/uploads/users/' + image_file;
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ mesagge: 'no existe la imagen' });
        }
    })
}


function listarLiga(req, res) {
    var ligaId = req.params.id;

    Liga.findById(ligaId, (err, liga) => {
        if (err) return res.status(500).send({ message: 'error en la encuesta' })
        if (!liga) return res.status(400).send({ message: 'error al listar las encuestas' })

        return res.status(200).send({ contacto: liga })
    })
}

module.exports = {

    subirImagen,
    getImageFile,
    crearLiga,
    listarLigas,
    editarLiga,
    eliminarLiga,
    listarLiga
}