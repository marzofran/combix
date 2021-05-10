const express = require('express')
const travelsRouter = express.Router();
const Viaje = require('../schemas/Viaje')
const HttpError = require('../utils/HttpError')
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');

//Display
travelsRouter.get('/', async(req, res) => {
  let viajes =  Viaje.find({unavailable: false}).populate('ruta'); 
  res.status(200).json(viajes).end();
})

//Create
travelsRouter.post('/', async (request, response) => {
    let bus = request.body;
    let viaje = new Viaje({
      ruta: bus.ruta,
      fecha: bus.fecha,
      precio: bus.precio,
      unavailable: false
    });
    const savedViaje = await viaje.save();
    console.log(savedViaje);
    response.status(200).json(savedViaje).end();
});

//Modify
travelsRouter.put('/:id', async(req, res) => {
  const viajeExistente = await Viaje.findOne({_id: req.params.id, unavailable: false});
  if(!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  const viajeNuevo = queryBuilder(req.body, ["ruta", "fecha", "precio"]);
  mapAndBuildModel(viajeExistente, viajeNuevo);
  await viajeExistente.save();
  res.status(200).send('Viaje modificado correctamente').end();
})

//Delete
travelsRouter.delete('/:id', async (req, res) => {
  const viajeExistente = await Viaje.findOneAndUpdate({_id: req.params.id, unavailable: false}, {unavailable: true});
  if (!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  res.status(200).send('Viaje borrado');
})

module.exports = travelsRouter;