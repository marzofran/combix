const {model, Schema} = require('mongoose')

const usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    dni: Number,
    mail: String,
    clave: String,
    fechaNacimiento: Date,
    plan: String 
})

const Usuario = model('Usuario', usuarioSchema)

module.exports = Usuario

/* const usuario = new Usuario({
    nombre: "Pablo",
    apellido: "Chaucha",
    dni: 34694201,
    mail: "darkangel@gmail.com",
    clave: "mamapato",
    fechaNacimiento: new Date(),
    plan: "gold" 
})

usuario.save()
    .then(result => {
        console.log(result)
        mongoose.connection.close()
    })
    .catch(err => {
        console.error(err)
    })

Usuario.find({}).then(result =>{
    console.log(result)
    mongoose.connection.close()
}) */