'use strict'

var Equipo = require('../models/equipo');
var Liga = require('../models/liga');

function addEquipo(req,res) {
    var equipo = new Equipo();
    var liga = new Liga()

    var params = req.body;

    if(params.nombreEquipo){
        equipo.nombreEquipo = params.nombreEquipo;
        equipo.golesFavor = params.golesFavor;        
        equipo.golesContra = params.golesContra;
        equipo.diferenciaGoles = params.diferenciaGoles;
        equipo.partidosJugados = params.partidosJugados;
        equipo.puntos = params.puntos;
        equipo.liga = req.params.liga;

        Equipo.find({$or:[
            {nombreEquipo: equipo.nombreEquipo}
        ]}).exec((err,equipos)=>{
            if(err) return res.status(500).send({message: 'Error al en la peticion'})

            if(equipos && equipos.length >= 1){
                return res.status(500).send({message: 'el equipo ya existe'});
            }else{
                equipo.save((err, equipoGuardado)=>{
                    if(err) return res.status(500).send({message: 'Error a la hora de guardar el equipo'}) 
                    
                    if(equipoGuardado){
                        res.status(200).send({equipo: equipoGuardado})
                    }else{
                        res.status(404).send({message: 'no se a podido registrar el equipo'})
                    }
                })
            }
        });
    }
}

function updateEquipo(req, res) {
    var params = req.body;    
    var equipoId = req.params.id;

    Equipo.findByIdAndUpdate( equipoId, params, {new:true},(err, equipoActualizado)=>{
        if(err) return res.status(500).send({message: 'error en la peticion'});
        
        if(!equipoActualizado) return res.status(404).send({message: 'no se a podido actualizar el equipo'});

        return res.status(200).send({equipo: equipoActualizado});
    })
}

function deleteEquipo(req,res){    
    var equipoId = req.params.id;

    Equipo.findByIdAndDelete(equipoId, (err, equipoEliminado)=>{
        if(err) return res.status(500).send({message: 'error en la peticion'});

        if(!equipoEliminado) return res.status(404).send({message: 'no se a podido eliminar el equipo'});

        return res.status(200).send({message: 'El equipo se a eliminado'});
    });
}

function getEquipos(req,res) {
    var ligaId = req.params.liga;
    Equipo.find({liga: ligaId},(err, listarEquipos)=>{
        if(err) return res.status(500).send({message: 'error en la peticion'});
        if(!listarEquipos) return res.status(404).send({message: 'No hay equipos en esta liga'});
        
        return res.status(200).send({equipos: listarEquipos});
        
    });
}

function Prueba(req,res) {
    var ligaId = req.params.golesFavor;
    Equipo.find({golesFavor: ligaId},(err, listarEquipos)=>{
        if(err) return res.status(500).send({message: 'error en la peticion'});
        if(!listarEquipos) return res.status(404).send({message: 'No hay equipos en esta liga'});
        
        return res.status(200).send({equipos: listarEquipos});
        
    });
}

function Grafica(req, res) {
    var ligaId = req.params.liga;
    Equipo.find({liga: ligaId},(err, listarEquipos)=>{
        if(err) return res.status(500).send({message: 'error en la peticion'});
        if(!listarEquipos) return res.status(404).send({message: 'No hay equipos en esta liga'});
       
        return res.status(200).send({data: listarEquipos, error: false });
        
    });
    
  }


function getEquipo(req,res) {
    var equipoId = req.params._id;
    
    Equipo.findById(equipoId,(err, equipo)=>{
        
        if(err) return res.status(500).send({message: 'error en la peticion'});

        if(!equipo) return res.status(404).send({message: 'no se a podido encontrar el equipo'});

        return res.status(200).send({equipo: equipo});
    })
}


module.exports = {
    addEquipo,
    updateEquipo,
    deleteEquipo,
    getEquipos,
    getEquipo,
    Grafica,
    Prueba
}