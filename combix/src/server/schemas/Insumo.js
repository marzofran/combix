const {model, Schema} = require('mongoose')

const insumoSchema = new Schema({
    nombre: String,
    precio: Number,
    tipo: String,
    unavailable: Boolean
})

const Insumo = model('Insumo', insumoSchema)

module.exports = Insumo