const {model, Schema} = require('mongoose')

const permisosSchema = new Schema({
    tipo: String,
})

const Permisos = model('Permisos', permisosSchema)

module.exports = Permisos