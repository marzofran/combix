const express = require('express');
const travelsRouter = express.Router();
const Viaje = require('../schemas/Viaje');
const HttpError = require('../utils/HttpError');
const {queryBuilder, mapAndBuildModel} = require('../utils/builders');

//Display
travelsRouter.get('/', async (req, res) => {
  let viajes = await Viaje.find({unavailable: false}).populate({
    path: 'ruta', 
    model: 'Ruta', 
    populate: [{
      path: 'origen', 
      model: 'Ciudad'
    }, {
      path:'destino', 
      model: 'Ciudad'
    }, {
      path:'combi', 
      model: 'Combi', 
      populate: {
        path:'chofer', 
        model: 'Usuario'
    }}]});
  console.log(viajes);
  res.status(200).json(viajes).end();
});

//Create
travelsRouter.post('/', async (request, response) => {
  let travel = request.body;
  let viaje = new Viaje({
    ruta: travel.ruta,
    fecha: travel.fecha,
    precio: parseInt(travel.precio),
    unavailable: false,
  });
  const foundTravel = await Viaje.find({ruta: viaje.ruta, fecha: viaje.fecha, unavailable: false});
  if (Object.entries(foundTravel).length === 0) {
    await viaje.save();
    response.status(202).send('Viaje creado con exito!').end();
  } else {
    throw new HttpError(203, 'El viaje ya se encuentra registrado');
  }
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
