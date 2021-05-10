const express = require('express');
const travelsRouter = express.Router();
const Viaje = require('../schemas/Viaje');
const HttpError = require('../utils/HttpError');
const {queryBuilder, mapAndBuildModel} = require('../utils/builders');

//Display
travelsRouter.get('/', async (req, res) => {
  let viajes = await Viaje.find({unavailable: false}).populate('ruta');
  res.status(200).json(viajes).end();
});

//Create
travelsRouter.post('/', async (request, response) => {
  let bus = request.body;
  let viaje = new Viaje({
    ruta: bus.ruta,
    fecha: bus.fecha,
    precio: parseInt(bus.precio),
    unavailable: false,
  });
  const savedViaje = await viaje.save();
  console.log(savedViaje);
  response.status(200).json(savedViaje).end();
});

//Modify
travelsRouter.put('/:id', async (req, res) => {
  const viajeExistente = await Viaje.findOne({
    _id: req.params.id,
  });
  if (!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  const viajeNuevo = queryBuilder(req.body.viaje, ['ruta', 'fecha', 'precio']);
  mapAndBuildModel(viajeExistente, viajeNuevo);
  await viajeExistente.save();
  console.log(req.body);

  res.status(200).send('Viaje modificado correctamente').end();
});

//Delete
//Le molesta tener como condicion el unavalide
travelsRouter.delete('/:id', async (req, res) => {
  const viajeExistente = await Viaje.findOneAndUpdate(
    {_id: req.params.id},
    {unavailable: true}
  );
  if (!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  res.status(200).send('Viaje borrado');
});

module.exports = travelsRouter;
