const express = require('express');
const citiesRouter = express.Router();
const Ciudad = require('../schemas/Ciudad');
const {queryBuilder, mapAndBuildModel} = require('../utils/builders');

//Display
citiesRouter.get('/', async (request, response) => {
  try {
    let ciudades = await Ciudad.find({unavailable: false});
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
    unavailable: false,
  });
  try {
    const ciudadExistente = await Ciudad.find({
      lugar: ciudad.lugar,
      provincia: ciudad.provincia,
    });
    console.log(ciudadExistente);
    if (Object.entries(ciudadExistente).length === 0) {
      await ciudad.save();
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
/*
citiesRouter.put('/', async (req, res) => {
  //consultar como se compara objeto entero
  const ciudadNueva = req.body;
  try {
    const ciudadExistente = await Ciudad.find({
      lugar: req.params.lugar,
      provincia: req.params.provincia,
    });
    if (Object.entries(ciudadExistente).length === 0)
      throw new Error('Ciudad no encontrada');
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
*/

citiesRouter.put('/:id', async (req, res) => {
  const ciudadExistente = await Ciudad.findOne({
    _id: req.params.id,
    unavailable: false,
  });
  if (!ciudadExistente) throw new Error('ciudad no encontrado');
  const ciudadNueva = queryBuilder(req.body.ciudad, ['lugar', 'provincia']);
  mapAndBuildModel(ciudadExistente, ciudadNueva);
  await ciudadExistente.save();
  res.status(200).send('Ciudad modificada correctamente').end();
});

//Delete logico
// faltaba el await me cachis
citiesRouter.delete('/:id', async (req, res) => {
  const ciudadExistente = await Ciudad.findOneAndUpdate(
    {_id: req.params.id, unavailable: false},
    {unavailable: true}
  );
  if (!ciudadExistente) throw new Error('Ciudad no encontrada');
  res.status(200).send('Ciudad borrada con exito').end();
});

module.exports = citiesRouter;
