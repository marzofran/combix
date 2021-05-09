const express = require('express')
const usersRouter = express.Router();
const { userIntegrityValidation } = require('../middleware/validations')
const Usuario = require('../schemas/Usuario');
const HttpError = require('../utils/HttpError');
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');

const hasLegalAge = (dob) => {
  const date = new Date(dob).getFullYear;
  if (!date) return false;
  return (new Date().getFullYear - date) > 18;
}


//Display
usersRouter.get('/', async (req, res) => {
  let usuarios = await Usuario.find({ permissions: "6094d56377b5714b3473dbc5", unavailable: false }); //esto funca??? no creo,,,,, WENO AHORA CREO QUE SI 
  res.status(200).json(usuarios).end();
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
      telefono: user.telefono,
      permissions: "6094d56377b5714b3473dbc5",
    });
    const foundUser = await Usuario.find({mail: user.mail});
    if (Object.entries(foundUser).length === 0) {
      await usuario.save();
      response.status(202).send('Usuario creado con exito!').end();
    } else {
      throw new HttpError(203, 'El mail ya se encuentra registrado');
    }
  });

//Modify
usersRouter.put('/:mail', async (req, res) => { //validaciones?? menor de edad????
    const usuarioNuevo = req.body;
    const usuarioExistente = await Usuario.find({mail: req.params.mail});

    if(!usuarioExistente) throw new HttpError(404, 'Usuario no encontrado');
    if(!hasLegalAge(usuarioNuevo.fechaNacimiento)) throw new Error ('Debe ser mayor de edad');

    usuarioExistente.nombre = usuarioNuevo.nombre ? usuarioNuevo.nombre : usuarioExistente.nombre;
    usuarioExistente.apellido = usuarioNuevo.apellido ? usuarioNuevo.apellido : usuarioExistente.apellido;
    usuarioExistente.fechaNacimiento = usuarioNuevo.fechaNacimiento ? usuarioNuevo.fechaNacimiento : usuarioExistente.fechaNacimiento;
    usuarioExistente.dni = usuarioNuevo.dni ? usuarioNuevo.dni : usuarioExistente.dni;
    usuarioExistente.mail = usuarioNuevo.mail ? usuarioNuevo.mail : usuarioExistente.mail;
    usuarioExistente.clave = usuarioNuevo.clave ? usuarioNuevo.clave : usuarioExistente.clave;
    usuarioExistente.telefono = usuarioNuevo.telefono ? usuarioNuevo.telefono : usuarioExistente.telefono;
    await usuarioExistente.save();
    res.status(200).send('Usuario modificado con exito').end();
     
})

//Delete
usersRouter.put('/delete', async (req, res) => {
  const usuarioExistente = Usuario.findOneAndUpdate({_id : req.body._id}, {unavailable: true});
  if(!usuarioExistente) throw new HttpError(404, 'Usuario no encontrado');
  await usuarioExistente.save();
   
  res.status(200).send('Usuario borrado con exito').end();
})

module.exports = usersRouter;