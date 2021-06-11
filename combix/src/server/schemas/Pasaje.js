const {model , Schema} = require('mongoose');

const pasajeSchema = new Schema({
    viaje: {type: require('mongoose').Schema.Types.ObjectId,ref:'Viaje'},
    usuario: {type: require('mongoose').Schema.Types.ObjectId,ref:'Usuario'},
    cantidadPasajes: Number,
    insumos: [],
    precioTotal: Number,
    unavailable: Boolean
})

const Pasaje = model('Pasaje', pasajeSchema)

module.exports = Pasaje