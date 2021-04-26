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
    let usuario = new Usuario({
        nombre: user.nombre,
        apellido: user.apellido,
        dni: user.dni,
        mail: user.mail,
        clave: user.clave,
        fechaNacimiento: user.fechaNacimiento,
        plan: "basico",
        permissions: "usuario"
    })

    Usuario.find({ mail: user.mail }).then( result => {
        if (Object.entries(result).length === 0) {
            usuario.save()
                .then(result => {
                    console.log(result)
                    require('mongoose').connection.close()
                    response.status(202).end()
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            response.status(203).end()
        }
    }).catch(err => {
        console.log(err)
        response.status(204).end()
    })
})

// Login
app.get('/users/:id',(request, response) => {
    // validate user data
    // return login success code
    // return error code if invalid login data
})

app.listen( PORT, () => console.log(`Server live on port ${PORT}`))