const {model, Schema} = require('mongoose')

const usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    dni: Number,
    mail: String,
    clave: String,
    fechaNacimiento: Date,
    plan: String,
    permissions: String
})

const Usuario = model('Usuario', usuarioSchema)

module.exports = Usuario