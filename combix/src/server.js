const { json: _json } = require('body-parser')
const express = require('express')
const {json} = require('express')
require('./mongo')
const Usuario = require('./Usuario')
const app = express()
const PORT = 3000

app.use(json())
app.use(_json())

// Register user
app.post('/users',(request, response) => {
    let user = request.body
    console.log(user.mail, user)
    console.log(Usuario)
    let usuario = new Usuario({
        nombre: user.nombre,
        apellido: user.apellido,
        dni: user.dni,
        mail: user.mail,
        clave: user.clave,
        fechaNacimiento: user.fechaNacimiento,
        plan: user.plan
    })

    // si no esta, guardate este nuevo Usuario
    usuario.save()
    .then(result => {
        console.log(result)
        require('mongoose').connection.close()
    })
    .catch(err => {
        console.error(err)
    })

    // si ya esta, decime y le aviso a la interfaz
})

// Login
app.get('/users/:id',(request, response) => {
    // validate user data
    // return login success code
    // return error code if invalid login data
})

app.listen( PORT, () => console.log(`Server live on port ${PORT}`))