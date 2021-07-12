const express = require('express');
const usersRouter = express.Router();
const { userIntegrityValidation } = require('../middleware/validations');
const Usuario = require('../schemas/Usuario');
const HttpError = require('../utils/HttpError');
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');
const ticketsRouter = require('./tickets');

const hasLegalAge = (dob) => {
  const date = new Date(dob).getFullYear();
  if (!date) return false;
  return new Date().now().getFullYear() - date > 18;
};

usersRouter.get('/:mail', async (req, res) => {
  const mailValido = await Usuario.findOne({ mail: req.params.mail });
  if (mailValido) {
    res.status(200).json(mailValido).end();
  }
  res.status(202).json('Usuario no encontrado').end();
});

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
    baneado: new Date(0),
    unavailable: false,
  });
  const foundUser = await Usuario.find({ mail: user.mail });
  if (Object.entries(foundUser).length === 0) {
    await usuario.save();
    response.status(202).send(usuario).end();
  } else {
    throw new HttpError(203, 'El mail ya se encuentra registrado');
  }
});

//Modify
usersRouter.put('/:id', async (req, res) => {
  //validaciones?? menor de edad????
  const user = req.body.usuario;
  const usuarioExistente = await Usuario.find({
    _id: req.params.id,
    unavailable: false,
  });

  //if (!hasLegalAge(usuarioNuevo.fechaNacimiento))
  //  throw new Error('Debe ser mayor de edad');
  Usuario.find(
    {
      mail: user.mail,
      unavailable: false,
    },
    function (err, result) {
      if (result.length > 1) {
        result.status(203).send('Ya existe un usuario con esos datos').end();
      } else if (result.length === 1) {
        if (result[0]._id == req.params.id) {
          let update = {
            nombre: user.nombre,
            apellido: user.apellido,
            mail: user.mail,
            dni: user.dni,
            clave: user.clave,
            fechaNacimiento: user.fechaNacimiento,
            telefono: user.telefono,
          };
          Usuario.findOneAndUpdate(
            { _id: req.params.id },
            update,
            { new: true },
            function (err, resultDos) {
              console.log(resultDos);

              res.status(200).send(resultDos).end();
            }
          );
        } else {
          res.status(203).send('Ya existe un usuario con esos datos').end();
        }
      } else {
        let update = {
          nombre: user.nombre,
          apellido: user.apellido,
          mail: user.mail,
          dni: user.dni,
          clave: user.clave,
          fechaNacimiento: user.fechaNacimiento,
          telefono: user.telefono,
        };
        Usuario.findOneAndUpdate(
          { _id: req.params.id },
          update,
          { new: true },
          function (err, result) {
            if (result) {
              res.status(200).send(result).end();
            } else {
              res.status(203).send('ocurrio un error').end();
            }
          }
        );
      }
    }
  );
});

usersRouter.put('/:id/gold', async (req, res) => {
  const usuarioGold = await Usuario.findOneAndUpdate(
    {
      _id: req.params.id,
      permissions: '6094d56377b5714b3473dbc5',
      unavailable: false,
    },
    { permissions: '60c4c2a93690f72eb018de17' },
    { new: true }
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
    { permissions: '6094d56377b5714b3473dbc5' },
    { new: true }
  );
  if (!usuarioGold) throw new HttpError(203, 'Este usuario no es GOLD!');
  res.status(200).send(usuarioGold).end();
});

usersRouter.put('/:id/banear', async (req, res) => {
  console.log(req.params.id);
  const usuarioBaneado = await Usuario.findOneAndUpdate(
    {
      _id: req.params.id,
      unavailable: false,
    },
    { baneado: new Date(Date.now() + 12096e5) },
    { new: true }
  );
  if (!usuarioBaneado)
    throw new HttpError(203, 'Este usuario ya esta baneado!');
  res.status(200).send(usuarioBaneado).end();
});

usersRouter.put('/:id/desbanear', async (req, res) => {
  const usuarioDesbaneado = await Usuario.findOneAndUpdate(
    {
      _id: req.params.id,
      baneado: true,
      unavailable: false,
    },
    { baneado: false },
    { new: true }
  );
  if (!usuarioDesbaneado)
    throw new HttpError(203, 'Este usuario ya esta desbaneado!');
  res.status(200).send(usuarioDesbaneado).end();
});

//Delete
usersRouter.delete('/:id', async (req, res) => {
  const usuarioExistente = Usuario.findOneAndUpdate(
    {
      _id: req.params.id,
      permissions: '6094d56377b5714b3473dbc5',
      unavailable: false,
    },
    { unavailable: true }
  );
  if (!usuarioExistente) throw new HttpError(404, 'Usuario no encontrado');
  res.status(200).send('Usuario borrado con exito').end();
});

usersRouter.post('/chofer/:mail', async (req, res) => {
  let usuario = await Usuario.findOne({
    dni: req.body.dni,
    mail: req.params.mail,
  });
  if (!usuario) throw new HttpError(404, 'Usuario no encontrado');
  res.status(200).json(usuario).end();
});

module.exports = usersRouter;
