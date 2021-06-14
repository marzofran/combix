const express = require('express');
const usersRouter = express.Router();
const {userIntegrityValidation} = require('../middleware/validations');
const Usuario = require('../schemas/Usuario');
const HttpError = require('../utils/HttpError');
const {queryBuilder, mapAndBuildModel} = require('../utils/builders');

const hasLegalAge = (dob) => {
  const date = new Date(dob).getFullYear();
  if (!date) return false;
  return new Date().now().getFullYear() - date > 18;
};

//Display
usersRouter.get('/', async (req, res) => {
  let usuarios = await Usuario.find({
    permissions: {
      $in: ['6094d56377b5714b3473dbc5', '60c4c2a93690f72eb018de17'],
    },
  });
  res.status(200).json(usuarios).end();
});

//Create
usersRouter.post('/', userIntegrityValidation, async (request, response) => {
  let user = request.body;
  let usuario = new Usuario({
    nombre: user.nombre,
    apellido: user.apellido,
    dni: parseInt(user.dni),
    mail: user.mail,
    clave: user.clave,
    fechaNacimiento: user.fechaNacimiento,
    telefono: parseInt(user.telefono),
    permissions: '6094d56377b5714b3473dbc5',
    unavailable: false,
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
usersRouter.put('/:id', async (req, res) => {
  //validaciones?? menor de edad????
  const usuarioExistente = await Usuario.find({
    _id: req.params.id,
    unavailable: false,
  });
  if (!usuarioExistente) throw new HttpError(404, 'Usuario no encontrado');
  const usuarioNuevo = queryBuilder(req.body, [
    'nombre',
    'apellido',
    'mail',
    'dni',
    'clave',
    'fechaNacimiento',
  ]);
  //if (!hasLegalAge(usuarioNuevo.fechaNacimiento))
  //  throw new Error('Debe ser mayor de edad');
  mapAndBuildModel(usuarioExistente, usuarioNuevo);
  const foundUser = Usuario.find({
    mail: usuarioExistente.mail,
    unavailable: false,
  });
  if ((foundUser) && (foundUser._id!==usuarioExistente._id))
    throw new HttpError(203, 'Ya existe un usuario con esos datos');
  const pepe = await Usuario.findOneAndUpdate({_id: usuarioExistente._id}, [{nombre: usuarioExistente.nombre}, 
    {apellido: usuarioExistente.apellido}, {mail: usuarioExistente.mail}, {dni: usuarioExistente.dni}, {clave: usuarioExistente.clave}, 
    {fechaNacimiento: usuarioExistente.fechaNacimiento}]);
  res.status(200).send(pepe).end();
});

usersRouter.put('/:id/gold', async (req, res) => {
  const usuarioGold = await Usuario.findOneAndUpdate(
    {
      _id: req.params.id,
      permissions: '6094d56377b5714b3473dbc5',
      unavailable: false,
    },
    {permissions: '60c4c2a93690f72eb018de17'},
    {new: true}
  );
  if (!usuarioGold) throw new HttpError(203, 'Este usuario ya es GOLD!');
  res.status(200).send(usuarioGold).end();
});

usersRouter.put('/:id/cancelargold', async (req, res) => {
  const usuarioGold = await Usuario.findOneAndUpdate(
    {
      _id: req.params.id,
      permissions: '60c4c2a93690f72eb018de17',
      unavailable: false,
    },
    {permissions: '6094d56377b5714b3473dbc5'},
    {new: true}
  );
  if (!usuarioGold) throw new HttpError(203, 'Este usuario no es GOLD!');
  res.status(200).send(usuarioGold).end();
});

//Delete
usersRouter.delete('/:id', async (req, res) => {
  const usuarioExistente = Usuario.findOneAndUpdate(
    {
      _id: req.params.id,
      permissions: '6094d56377b5714b3473dbc5',
      unavailable: false,
    },
    {unavailable: true}
  );
  if (!usuarioExistente) throw new HttpError(404, 'Usuario no encontrado');
  res.status(200).send('Usuario borrado con exito').end();
});

module.exports = usersRouter;
