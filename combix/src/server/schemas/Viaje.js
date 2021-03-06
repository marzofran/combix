const {model, Schema} = require('mongoose')
const mongoose = require('mongoose')

const viajeSchema = new Schema({
    ruta: {type: mongoose.Schema.Types.ObjectId,ref:'Ruta'},
    fecha: Date,
    precio: String,
    estado: String,
    pasajeros: [{pasaje: {type: mongoose.Schema.Types.ObjectId,ref:'Pasaje'}}],
    unavailable: Boolean
})

const Viaje = model('Viaje', viajeSchema)

module.exports = Viaje