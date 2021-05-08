const {model, Schema} = require('mongoose')
const mongoose = require('mongoose')

const rutaSchema = new Schema({
    origen: {type: mongoose.Schema.Types.ObjectId,ref:'Ciudad'},
    destino: {type: mongoose.Schema.Types.ObjectId,ref:'Ciudad'},
    combi: {type: mongoose.Schema.Types.ObjectId,ref:'Combi'},
    horario: String,
    unavailable: Boolean
})

const Ruta = model('Ruta', rutaSchema)

module.exports = Ruta