const express = require('express');
const Usuario = require('../schemas/Usuario');
const HttpError = require('../utils/HttpError');
const driversRouter = express.Router();
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');

//Display
driversRouter.get('/', async (req, res) => {
    let choferes = await Usuario.find({ permissions: "6094d50128e541353c8cf122", unavailable: false }); //esto funca??? no creo,,,,, WENO AHORA CREO QUE SI 
    res.status(200).json(choferes).end();
})

//Create
driversRouter.post('/', async (req, res) => {
        let driver = req.body;
        let chofer = new Usuario({
          nombre: driver.nombre,
          apellido: driver.apellido,
          dni: driver.dni,
          mail: driver.mail,
          clave: driver.clave,
          fechaNacimiento: driver.fechaNacimiento,
          telefono: driver.telefono,
          permissions: "6094d50128e541353c8cf122",
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
driversRouter.put('/:id', async (req, res) => {
  const choferExistente = await Usuario.findOne({_id: req.params.id, permissions: "6094d50128e541353c8cf122", unavailable: false });
  if(!choferExistente) throw new Error('Chofer no encontrado');
  const choferNuevo = queryBuilder(req.body, ["nombre", "apellido", "dni", "mail", "telefono", "clave", "fechaNacimiento"]);
  mapAndBuildModel(choferExistente, choferNuevo);
  await choferExistente.save();
  res.status(200).send('Chofer modificado correctamente').end();
})

//Delete
driversRouter.delete('/:id', async (req, res) => {
    const choferExistente = await Usuario.findOneAndUpdate({ _id: req.params.id, permissions: "6094d50128e541353c8cf122", unavailable: false}, {unavailable: true});
    if(!choferExistente) throw new HttpError(404, 'Chofer no encontrado');
    res.status(200).send('Chofer eliminado').end();
})

module.exports = driversRouter;