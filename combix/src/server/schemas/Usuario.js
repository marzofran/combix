const {model, Schema} = require('mongoose')

const usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    dni: Number,
    mail: String,
    clave: String,
    fechaNacimiento: Date,
    telefono: Number,
    permissions: { type: Schema.ObjectId, ref: "Permiso" },
    unavailable: Boolean
})

const Usuario = model('Usuario', usuarioSchema)

module.exports = Usuario