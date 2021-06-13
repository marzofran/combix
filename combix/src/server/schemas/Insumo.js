const {model, Schema} = require('mongoose')

const insumoSchema = new Schema({
    nombre: String,
    precio: String,
    tipo: String,
})

const Insumo = model('Insumo', insumoSchema)

module.exports = Insumo