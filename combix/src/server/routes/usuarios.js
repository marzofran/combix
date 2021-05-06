const express = require('express')
const usuariosRouter = express.Router();
const { userIntegrityValidation } = require('../middleware/validations')
const Usuario = require('../schemas/Usuario')

usuariosRouter.get('/', (req, res) => {
  res.status(200).send('get usuario').end();
})

usuariosRouter.post('/', userIntegrityValidation, async (error, request, response) => {
    console.log("uwu",error);
    let user = request.body;
    console.log(user.mail, user);
    let usuario = new Usuario({
      nombre: user.nombre,
      apellido: user.apellido,
      dni: user.dni,
      mail: user.mail,
      clave: user.clave,
      fechaNacimiento: user.fechaNacimiento,
      plan: 'basico',
      permissions: 'usuario',
    });
  
    try {
      const foundUser = await Usuario.find({mail: user.mail});
      if (Object.entries(foundUser).length === 0) {
        await usuario.save();
        require('mongoose').connection.close();
        response.status(202).send(usuario).end();
      } else {
        throw new Error('Mail repetido capo');
      }
    } catch (err) {
      console.log(err.message);
      response.status(500).json({message: err.message, state:  505}).end();
    }
  });

usuariosRouter.put('/', (req, res) => {
    res.status(200).send('put usuario').end();
})

usuariosRouter.delete('/', (req, res) => {
    res.status(200).send('delete usuario').end();
})

module.exports = usuariosRouter;