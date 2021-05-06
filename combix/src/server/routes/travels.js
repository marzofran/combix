const express = require('express')
const travelsRouter = express.Router();
const Viaje = require('../schemas/Viaje')

travelsRouter.get('/', (req, res) => {
    res.status(200).send('get viaje').end();
})

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

travelsRouter.put('/', (req, res) => {
    res.status(200).send('put viaje').end();
})

travelsRouter.delete('/', (req, res) => {
    res.status(200).send('delete viaje').end();
})

module.exports = travelsRouter;