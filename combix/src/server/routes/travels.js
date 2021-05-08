const express = require('express')
const travelsRouter = express.Router();
const Viaje = require('../schemas/Viaje')

//Display
travelsRouter.get('/', async(req, res) => {
  let viajes = await Viaje.find({}); 
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
    try {
      const savedViaje = await viaje.save();
      console.log(savedViaje);
      require('mongoose').connection.close();
      response.status(200).json(savedViaje).end();
    } catch (err) {
      console.log(err);
      response.status(500);
      response.send(err.message).end();
    }
});

//Modify
travelsRouter.put('/', async(req, res) => {
  const viajeNuevo = req.body;
  const viajeExistente = await Viaje.find({mail: req.params.mail});
  if(!viajeExistente) throw new Error('Viaje no encontrado');
  viajeExistente.ruta = viajeNuevo.ruta ? viajeNuevo.ruta : viajeExistente.ruta;
  viajeExistente.fecha = viajeNuevo.fecha ? viajeNuevo.fecha : viajeExistente.fecha;
  viajeExistente.precio = viajeNuevo.precio ? viajeNuevo.precio : viajeExistente.precio;
  
  await viajeExistente.save();
  res.status(200).send('Viaje modificado con exito').end();
})

//Delete
travelsRouter.delete('/', (req, res) => {
    res.status(200).send('delete viaje').end();
})

module.exports = travelsRouter;