const express = require('express');
const Usuario = require('../schemas/Usuario');
const HttpError = require('../utils/HttpError');
const driversRouter = express.Router();
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');

const hasLegalAge = (dob) => {
  const date = new Date(dob).getFullYear;
  if (!date) return false;
  return new Date().getFullYear - date > 18;
};

//Display
driversRouter.get('/', async (req, res) => {
  let choferes = await Usuario.find({
    permissions: '6094d50128e541353c8cf122',
  }); //esto funca??? no creo,,,,, WENO AHORA CREO QUE SI
  res.status(200).json(choferes).end();
});

//Create
driversRouter.post('/', async (req, res) => {
  let driver = req.body;
  let chofer = new Usuario({
    nombre: driver.nombre,
    apellido: driver.apellido,
    dni: parseInt(driver.DNI),
    mail: driver.mail,
    clave: 'combix',
    fechaNacimiento: driver.fecha,
    telefono: parseInt(driver.telefono),
    permissions: '6094d50128e541353c8cf122',
    baneado: driver.fecha,
    unavailable: false,
  });
  const foundDriver = await Usuario.find({
    mail: driver.mail,
    unavailable: false,
  });
  if (Object.entries(foundDriver).length === 0) {
    await chofer.save();
    res.status(202).send('Chofer creado con exito!').end();
  } else {
    res.status(203).send('El Chofer ya se encuentra registrado').end();
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
    'clave',
    'fechaNacimiento',
  ]);
  mapAndBuildModel(choferExistente, choferNuevo);
  Usuario.find(
    {
      mail: choferExistente.mail,
      unavailable: false,
    },
    function (err, result) {
      if (!result.length) {
        console.log(choferExistente);
        choferExistente.save();
        res.status(200).send('Chofer modificado con exito').end();
      } else {
        res.status(203).send('El mail del chofer esta repetido').end();
      }
    }
  );
});

//Delete
driversRouter.delete('/:id', async (req, res) => {
  const choferExistente = await Usuario.findOneAndUpdate(
    {
      _id: req.params.id,
      unavailable: false,
    },
    { unavailable: true }
  );
  if (!choferExistente) throw new HttpError(404, 'Chofer no encontrado');
  res.status(200).send('Chofer eliminado').end();
});
//dar de alta
driversRouter.put('/darAlta/:id', async (req, res) => {
  Usuario.find(
    {
      mail: req.body.chofer.mail,
      unavailable: false,
    },
    function (err, result) {
      console.log(result.length);
      if (result.length < 1) {
        Usuario.findOneAndUpdate(
          {
            _id: req.params.id,
            unavailable: true,
          },
          { unavailable: false },
          function (err, result) {
            if (result) {
              res.status(200).send('Chofer dado de alta con exito').end();
            }
          }
        );
      } else {
        res
          .status(203)
          .send('El mail de este chofer esta siendo usado por otro chofer')
          .end();
      }
    }
  );
});
driversRouter.delete('/borradoFisico/:id', async (req, res) => {
  Usuario.deleteOne(
    {
      _id: req.params.id,
    },
    function (err) {
      if (!err) {
        res.status(200).send('Chofer eliminado con exito!').end();
      } else {
        res.status(202).send('Ocurrio un error durante la eliminacion').end();
      }
    }
  );
});
module.exports = driversRouter;
