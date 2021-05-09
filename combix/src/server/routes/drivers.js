const express = require('express');
const Usuario = require('../schemas/Usuario');
const HttpError = require('../utils/HttpError');
const driversRouter = express.Router();
const {queryBuilder, mapAndBuildModel} = require('../utils/builders');

//Display
driversRouter.get('/', async (req, res) => {
  let choferes = await Usuario.find({
    permissions: '6094d50128e541353c8cf122',
    unavailable: false,
  }); //esto funca??? no creo,,,,, WENO AHORA CREO QUE SI
  res.status(200).json(choferes).end();
});

//Create
driversRouter.post('/', async (req, res) => {
  let driver = req.body;
  let chofer = new Usuario({
    nombre: driver.nombre,
    apellido: driver.apellido,
    dni: driver.DNI,
    mail: driver.mail,
    clave: driver.clave,
    fechaNacimiento: driver.fecha,
    telefono: driver.telefono,
    permissions: '6094d50128e541353c8cf122',
    unavailable: false,
  });
  const foundDriver = await Usuario.find({mail: driver.mail});
  if (Object.entries(foundDriver).length === 0) {
    await chofer.save();
    res.status(200).send('Chofer creado con exito!').end();
  } else {
    throw new HttpError(203, 'El mail ya se encuentra registrado');
  }
});

//Modify
/*
driversRouter.put('/:mail', async (req, res) => {
  const choferExistente = await Usuario.findOne({mail: req.params.mail});
  if (!choferExistente) throw new Error('Chofer no encontrado');
  const choferNuevo = queryBuilder(req.body, [
    'nombre',
    'apellido',
    'dni',
    'mail',
    'telefono',
    'clave',
    'fechaNacimiento',
  ]);
  mapAndBuildModel(choferExistente, choferNuevo);
  await choferExistente.save();

  res.status(200).send('Chofer modificado correctamente').end();
});
*/

driversRouter.put('/', async (req, res) => {
  const choferNuevo = req.body.data.chofer;
  const idChoferViejo = req.body.data.idChoferVieja;
  try {
    await Usuario.findOneAndUpdate(
      {_id: idChoferViejo},
      {
        nombre: choferNuevo.nombre,
        apellido: choferNuevo.apellido,
        dni: choferNuevo.DNI,
        mail: choferNuevo.mail,
        fechaNacimiento: choferNuevo.fecha,
        telefono: choferNuevo.telefono,
      },
      function (err, affected, resp) {
        console.log(resp);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message).end();
  }

  res.status(200).send('chofer modificada con exito').end();
});

//Delete
driversRouter.put('/:id', async (req, res) => {
  const choferExistente = await Usuario.findOneAndUpdate(
    {_id: req.body.data._id},
    {unavailable: true}
  );
  if (!choferExistente) throw new HttpError(404, 'Chofer no encontrado');

  res.status(200).send('Chofer eliminado').end();
});

module.exports = driversRouter;
