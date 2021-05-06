const express = require('express');
const citiesRouter = express.Router();
const Ciudad = require('../schemas/Ciudad');

//Display
citiesRouter.get('/', async (request, response) => {
  try {
    let ciudades = await Ciudad.find({});
    response.status(200).json(ciudades).end();
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message).end();
  }
});

//Create
citiesRouter.post('/', async (request, response) => {
  //middleware!!
  let city = request.body;
  let ciudad = new Ciudad({
    lugar: city.lugar,
    provincia: city.provincia,
  });
  try {
    const ciudadExistente = await Ciudad.find({
      lugar: ciudad.lugar,
      provincia: ciudad.provincia,
    });
    console.log(ciudadExistente);
    if (Object.entries(ciudadExistente).length === 0) {
      const savedCiudad = await ciudad.save();
      console.log(savedCiudad);
      console.log('guardando');
      response.status(200).json('Ciudad guardada con exito').end();
    } else {
      response
        .status(202)
        .json('ya existe una ciudad con esos parametros')
        .end();
    }
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message).end();
  }
});

//Modify
citiesRouter.put('/:provincia/:lugar', async (req, res) => {
  //consultar como se compara objeto entero
  const ciudadNueva = req.body;
  try {
    const ciudadExistente = await Ciudad.find({
      lugar: req.params.lugar,
      provincia: req.params.provincia,
    });
    if (!ciudadExistente) throw new Error('Ciudad no encontrada');
    ciudadExistente.lugar = ciudadNueva.lugar
      ? ciudadNueva.lugar
      : ciudadExistente.lugar;
    ciudadExistente.provincia = ciudadNueva.provincia
      ? ciudadNueva.provincia
      : ciudadExistente.provincia;
    await ciudadExistente.save();
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message).end();
  }
  res.status(200).send('Ciudad modificada con exito').end();
});

//Delete
citiesRouter.delete('/', (req, res) => {
  res.status(200).send('delete ciudad').end();
});

module.exports = citiesRouter;
