const express = require('express');
const ciudadesRouter = express.Router();
const Ciudad = require('../schemas/Ciudad');

ciudadesRouter.get('/', async (request, response) => {
  try {
    let ciudades = await Ciudad.find({});
    require('mongoose').connection.close();
    response.status(200).json(ciudades).end();
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message).end();
  }
});

ciudadesRouter.post('/', async (request, response) => {
  let bus = request.body;
  let ciudad = new Ciudad({
    lugar: bus.lugar,
    provincia: bus.provincia,
  });
  try {
    const savedCiudad = await ciudad.save();
    console.log(savedCiudad);
    require('mongoose').connection.close();
    response.status(200).json(savedCiudad).end();
  } catch (err) {
    console.log(err);
    response.status(500);
    response.send(err.message).end();
  }
});

ciudadesRouter.put('/', (req, res) => {
  res.status(200).send('put ciudad').end();
});

ciudadesRouter.delete('/', (req, res) => {
  res.status(200).send('delete ciudad').end();
});

module.exports = ciudadesRouter;
