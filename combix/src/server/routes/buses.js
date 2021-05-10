const express = require('express');
const busesRouter = express.Router();
const Combi = require('../schemas/Combi');
const {queryBuilder, mapAndBuildModel} = require('../utils/builders');

//Display
busesRouter.get('/', async (request, response) => {
  try {
    let combis = await Combi.find({unavailable: false}).populate('chofer');

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
    const savedCombi = await combi.save();
    console.log(savedCombi);
    response.status(200).json(savedCombi).end();
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message).end();
  }
});

//Modify
busesRouter.put('/:id', async (req, res) => {
  const combiExistente = await Combi.findOne({_id: req.params.id, unavailable: false});
  if (!combiExistente) throw new Error('Combi no encontrado');
  const combiNuevo = queryBuilder(req.body, [
    'patente',
    'modelo',
    'cantidadAsientos',
    'tipo',
    'chofer',
  ]);
  mapAndBuildModel(combiExistente, combiNuevo);
  await combiExistente.save();
  res.status(200).send('Combi modificada correctamente').end();
});

//Delete logico
busesRouter.delete('/:id', async (req, res) => {
  const combiExistente = await Combi.findOneAndUpdate(
    {
      _id: req.params.id,
      unavailable: false,
    },
    {unavailable: true},
    function (err, affected, resp) {
      console.log(resp);
    }
  );
  if (!combiExistente) throw new Error('Combi no encontrada');
  res.status(200).send('Chofer eliminado').end();
});

module.exports = busesRouter;
