require('./mongo')

const express = require('express'), bodyParser = require('body-parser'), app = express(), PORT = 3000
const { Usuario } = require('./Usuario')
app.use(express.json())
app.use(bodyParser.json())

// Register user
app.post('/users',(request, response) => {
    let user = request.body
    console.log(user.mail, user)

    /*let usuario = new Usuario({
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
    })*/

    // si ya esta, decime y le aviso a la interfaz
})

// Login
app.get('/users/:id',(request, response) => {
    // validate user data
    // return login success code
    // return error code if invalid login data
})

app.listen( PORT, () => console.log(`Server live on port ${PORT}`))