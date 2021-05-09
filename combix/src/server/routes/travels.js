const express = require('express')
const travelsRouter = express.Router();
const Viaje = require('../schemas/Viaje')
const HttpError = require('../utils/HttpError')
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');

//Display
travelsRouter.get('/', async(req, res) => {
  let viajes = await Viaje.find({unavailable: false}).populate('ruta'); 
  require('mongoose').connection.close();
  res.status(200).json(viajes).end();
})

//Create
travelsRouter.post('/', async (request, response) => {
    let bus = request.body;
    let viaje = new Viaje({
      ruta: bus.ruta,
      fecha: bus.fecha,
      precio: bus.precio,
    });
    const savedViaje = await viaje.save();
    console.log(savedViaje);
    require('mongoose').connection.close();
    response.status(200).json(savedViaje).end();
});

//Modify
travelsRouter.put('/:id', async(req, res) => {
  const viajeExistente = await Viaje.findOne({_id: req.params.id});
  if(!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  const viajeNuevo = queryBuilder(req.body, ["ruta", "fecha", "precio"]);
  mapAndBuildModel(viajeExistente, viajeNuevo);
  await viajeExistente.save();
  require('mongoose').connection.close();
  res.status(200).send('Viaje modificado correctamente').end();
})

//Delete
travelsRouter.put('/delete', async (req, res) => {
  const viajeExistente = await Viaje.findOneAndUpdate({_id: req.body._id}, {unavailable: true});
  if (!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  await viajeExistente.save();
  require('mongoose').connection.close();
  res.status(200).send('Viaje borrado');
})

module.exports = travelsRouter;