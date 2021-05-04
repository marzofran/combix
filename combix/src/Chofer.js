const {model, Schema} = require('mongoose')

const choferSchema = new Schema({
    nombre: String,
    apellido: String,
    mail: String,
    clave: String,
    telefonoDeContacto: Number,
    permissions: String
})

const Chofer = model('Chofer', choferSchema)

module.exports = Chofer