const {model, Schema} = require('mongoose')
const mongoose = require('mongoose')

const combiSchema = new Schema({
    modelo: String,
    patente: String,
    cantidadAsientos: Number,
    tipo: String,
    chofer: {type: mongoose.Schema.Types.ObjectId,ref:'Usuario'},
    unavailable: Boolean
})

const Combi = model('Combi', combiSchema)

module.exports = Combi