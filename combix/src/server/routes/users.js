const express = require('express')
const usersRouter = express.Router();
const { userIntegrityValidation } = require('../middleware/validations')
const Usuario = require('../schemas/Usuario')

//Display
usersRouter.get('/', async (req, res) => {
  try{
    let usuarios = await Usuario.find({}); //esto funca??? no creo,,,,, WENO AHORA CREO QUE SI
    require('mongoose').connection.close();
    res.status(200).json(usuarios).end();
  }
  catch(err){
    console.log(err);
    res.status(500).send(err.message).end();
  }
})

//Create
usersRouter.post('/', userIntegrityValidation, async (request, response) => {
    let user = request.body;
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
        response.status(202).send('Usuario creado con exito!').end();
      } else {
        throw new Error('El mail ya se encuentra registrado');
      }
    } catch (err) {
      console.log(err.message);
      response.status(500).json({message: err.message, state:  505}).end();
    }
  });

//Modify
usersRouter.put('/:mail', async (req, res) => { //validaciones?? menor de edad????
    const usuarioNuevo = req.body;
    try{
      const usuarioExistente = await Usuario.find({mail: req.params.mail});
      if(!usuarioExistente) throw new Error('Usuario no encontrado');
      usuarioExistente.nombre = usuarioNuevo.nombre ? usuarioNuevo.nombre : usuarioExistente.nombre;
      usuarioExistente.apellido = usuarioNuevo.apellido ? usuarioNuevo.apellido : usuarioExistente.apellido;
      usuarioExistente.fechaNacimiento = usuarioNuevo.fechaNacimiento ? usuarioNuevo.fechaNacimiento : usuarioExistente.fechaNacimiento;
      usuarioExistente.dni = usuarioNuevo.dni ? usuarioNuevo.dni : usuarioExistente.dni;
      usuarioExistente.mail = usuarioNuevo.mail ? usuarioNuevo.mail : usuarioExistente.mail;
      usuarioExistente.clave = usuarioNuevo.clave ? usuarioNuevo.clave : usuarioExistente.clave;
      await usuarioExistente.save();
    }
    catch(err){
      console.log(err);
      res.status(400).send(err.message).end();
    }
    res.status(200).send('Usuario modificado con exito').end();
})

//Delete
usersRouter.delete('/', (req, res) => {
    res.status(200).send('delete usuario').end();
})

module.exports = usersRouter;