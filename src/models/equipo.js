'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var equipoSchema = Schema({
    nombreEquipo: String,
    golesFavor: Number,
    golesContra: Number,
    diferenciaGoles: Number,
    partidosJugados: Number,
    puntos: Number,
    liga: {type: Schema.ObjectId, ref:'Liga'}
})

module.exports = mongoose.model("Equipo", equipoSchema)