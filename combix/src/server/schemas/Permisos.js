const {model, Schema} = require('mongoose')

const permisoSchema = new Schema({
    tipo: String,
})

const Permiso = model('Permiso', permisoSchema)

module.exports = Permiso