const express = require('express');
const Usuario = require('../schemas/Usuario');
const HttpError = require('../utils/HttpError');
const driversRouter = express.Router();
const {queryBuilder, mapAndBuildModel} = require('../utils/builders');

const hasLegalAge = (dob) => {
  const date = new Date(dob).getFullYear;
  if (!date) return false;
  return new Date().getFullYear - date > 18;
};

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
    res.status(202).send('Chofer creado con exito!').end();
  } else {
    throw new HttpError(203, 'El mail ya se encuentra registrado');
  }
});

//Modify
/*
driversRouter.put('/:id', async (req, res) => {
  const choferExistente = await Usuario.findOne({
    _id: req.params.id,
    permissions: '6094d50128e541353c8cf122',
    unavailable: false,
  });
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

driversRouter.put('/:id', async (req, res) => {
  const choferExistente = await Usuario.findOne({
    _id: req.params.id,
    unavailable: false,
    permissions: '6094d50128e541353c8cf122',
  });
  if (!choferExistente) throw new HttpError(404, 'Chofer no encontrado');
  const choferNuevo = queryBuilder(req.body.chofer, [
    'nombre',
    'apellido',
    'mail',
    'telefono',
    'dni',
    'mail',
    'clave',
    'fechaNacimiento',
  ]);
  /* Esta validacion no esta andando bien, puede que sea por el formato de Date
  if (!hasLegalAge(choferNuevo.fechaNacimiento))
    throw new Error('Debe ser mayor de edad');
    */
  mapAndBuildModel(choferExistente, choferNuevo);
  await choferExistente.save();
  res.status(200).send('Chofer modificado con exito').end();
});

//Delete
driversRouter.delete('/:id', async (req, res) => {
  const choferExistente = await Usuario.findOneAndUpdate(
    {
      _id: req.params.id,
      unavailable: false,
    },
    {unavailable: true},
    function (err, affected, resp) {
      console.log(resp);
    }
  );
  if (!choferExistente) throw new HttpError(404, 'Chofer no encontrado');
  res.status(200).send('Chofer eliminado').end();
});

module.exports = driversRouter;
