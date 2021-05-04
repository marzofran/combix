const { json: _json } = require('body-parser')
const express = require('express')
const {json} = require('express')
require('./mongo')
const Usuario = require('./Usuario')
const Combi = require('./Combi')
const Chofer = require('./Chofer')
const app = express()
const PORT = 8080

app.use(json());
app.use(_json());



app.post('/combi',async (request, response) => {
    let bus = request.body
    let combi = new Combi ({
        modelo: bus.modelo,
        patente: bus.patente,
        cantidadAsientos: bus.cantidadAsientos,
        tipo: bus.tipo,
        chofer: bus.chofer
    })
    try{
        const savedCombi = await combi.save()
        console.log(savedCombi)
        require('mongoose').connection.close()
        response.status(200).json(savedCombi).end()
    }
    catch(err){
        console.log(err)
        response.status(500)
        response.send(err.message).end()
    }
})

// Register user

app.post('/users',async(request, response) => {
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

    try{
        const foundUser = await Usuario.find({mail: user.mail})
        if (Object.entries(foundUser).length === 0){
            await usuario.save()
            require('mongoose').connection.close()
            response.status(202).end()
        }
        else {
            throw new Error("Mail repetido capo")
        }
    }
    catch(err){
        console.log(err.message)
        response.status(500).end()
    }
})
// Login
app.get('/login', (request, response) => {
  let email = request.query.mail;
  let password = request.query.clave;
  Usuario.findOne({mail: email, clave: password}, function (err, user) {
    if (err) {
      console.log(response);
      return response.status(204).end();
    }
    if (!user) {
      return response.status(203).end();
    }
    if (user) {
      console.log(user);
      return response.send(user).end();
    }
    require('mongoose').connection.close();
  });
});

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
