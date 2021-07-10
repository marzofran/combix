const express = require('express');
const busesRouter = express.Router();
const Combi = require('../schemas/Combi');
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');
const HttpError = require('../utils/HttpError');

//Display
busesRouter.get('/', async (request, response) => {
  try {
    let combis = await Combi.find().populate('chofer');

    response.status(200).json(combis).end();
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message).end();
  }
});

//Create
busesRouter.post('/', async (request, response) => {
  let bus = request.body;
  try {
    let combi = new Combi({
      modelo: bus.modelo,
      patente: bus.patente,
      cantidadAsientos: parseInt(bus.cantidadAsientos),
      tipo: bus.tipo,
      chofer: bus.chofer,
      unavailable: false,
    });
    const foundBus = await Combi.find({
      patente: bus.patente,
      unavailable: false,
    });
    if (Object.entries(foundBus).length === 0) {
      await combi.save();
      response.status(202).send('Combi creada con exito!').end();
    } else {
      response.status(203).send('Ya hay una combi con esos datos!').end();
    }
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message).end();
  }
});

//Modify
busesRouter.put('/:id', async (req, res) => {
  const combiExistente = await Combi.findOne({
    _id: req.params.id,
  });
  if (!combiExistente) throw new HttpError('Combi no encontrado');
  const combiNuevo = queryBuilder(req.body.combi, [
    'patente',
    'modelo',
    'cantidadAsientos',
    'tipo',
    'chofer',
  ]);
  console.log(req.body.combi);
  mapAndBuildModel(combiExistente, combiNuevo);
  Combi.find(
    {
      patente: combiExistente.patente,
      modelo: combiExistente.modelo,
      cantidadAsientos: combiExistente.cantidadAsientos,
      tipo: combiExistente.tipo,
      chofer: combiExistente.chofer,
    },
    function (err, result) {
      if (!result.length) {
        combiExistente.save();
        res.status(200).send('Combi modificada correctamente').end();
      } else {
        res.status(203).send('Ya existe una combi con esos datos').end();
      }
    }
  );
});

//Delete logico
busesRouter.delete('/:id', async (req, res) => {
  const combiExistente = await Combi.findOneAndUpdate(
    {
      _id: req.params.id,
      unavailable: false,
    },
    { unavailable: true }
  );
  if (!combiExistente) throw new HttpError('Combi no encontrada');
  res.status(200).send('Combi eliminada con exito').end();
});

module.exports = busesRouter;
