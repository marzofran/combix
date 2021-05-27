const express = require('express');
const citiesRouter = express.Router();
const Ciudad = require('../schemas/Ciudad');
const {queryBuilder, mapAndBuildModel} = require('../utils/builders');
const HttpError = require('../utils/HttpError');

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
    unavailable: false,
  });
  const foundCity = await Ciudad.find({
    lugar: ciudad.lugar,
    provincia: ciudad.provincia,
    unavailable: false,
  });
  if (Object.entries(foundCity).length === 0) {
    await ciudad.save();
    response.status(202).send('Ciudad creada con exito!').end();
  } else {
    throw new HttpError(203, 'La ciudad ya se encuentra registrada');
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
  const foundCity=Ciudad.find({lugar: ciudadExistente.lugar, provincia: ciudadExistente.provincia, unavailable: false});
  if(foundCity) throw new HttpError(203,'Ya existe una ciudad con esos datos');
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
