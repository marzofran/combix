const express = require('express');
const citiesRouter = express.Router();
const Ciudad = require('../schemas/Ciudad');
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');
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
  Ciudad.find(
    {
      lugar: req.body.ciudad.lugar,
      provincia: req.body.ciudad.provincia,
      unavailable: false,
    },
    function (err, result) {
      if (!result.length) {
        ciudadExistente.save();
        res.status(200).send('Ciudad modificada correctamente').end();
      } else {
        res.status(203).send('Ya existe una ciudad con esos datos').end();
      }
    }
  );
});

//Delete logico

citiesRouter.delete('/:id', async (req, res) => {
  const ciudadExistente = await Ciudad.findOneAndUpdate(
    { _id: req.params.id, unavailable: false },
    { unavailable: true }
  );
  if (!ciudadExistente) throw new Error('Ciudad no encontrada');
  res.status(200).send('Ciudad borrada con exito').end();
});

citiesRouter.put('/darDeAlta/:id', async (req, res) => {
  Ciudad.find(
    {
      lugar: req.body.ciudad.lugar,
      provincia: req.body.ciudad.provincia,
      unavailable: false,
    },
    function (err, result) {
      if (result.length < 1) {
        Ciudad.findOneAndUpdate(
          { _id: req.params.id, unavailable: true },
          { unavailable: false },
          function (err, result) {
            if (result) {
              res.status(200).send('Ciudad dada de alta con exito').end();
            } else {
              res.status(203).send('Ciudad no encontrada').end();
            }
          }
        );
      } else {
        res.status(203).send('Ya existe una ciudad con esos parametros').end();
      }
    }
  );
});
citiesRouter.delete('/borradoFisico/:id', async (req, res) => {
  Ciudad.deleteOne(
    {
      _id: req.params.id,
    },
    function (err) {
      if (!err) {
        res.status(200).send('Ciudad eliminada con exito!').end();
      } else {
        res.status(202).send('Ocurrio un error durante la eliminacion').end();
      }
    }
  );
});
module.exports = citiesRouter;
