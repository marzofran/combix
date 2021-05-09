const express = require('express');
const busesRouter = express.Router();
const Combi = require('../schemas/Combi');
const {queryBuilder, mapAndBuildModel} = require('../utils/builders');

//Display
busesRouter.get('/', async (request, response) => {
  try {
    let combis = await Combi.find({}).populate('chofer');
    require('mongoose').connection.close();
    response.status(200).json(combis).end();
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message).end();
  }
});

//Create
busesRouter.post('/', async (request, response) => {
  //falta middleware para validar
  let bus = request.body;
  try {
    let combi = new Combi({
      modelo: bus.modelo,
      patente: bus.patente,
      cantidadAsientos: bus.cantidadAsientos,
      tipo: bus.tipo,
      chofer: bus.chofer,
      unavailable: false,
    });
    const savedCombi = await combi.save();
    console.log(savedCombi);
    response.status(200).json(savedCombi).end(); //por que devuelve un json??
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message).end();
  }
});

//Modify
busesRouter.put('/:patente', async (req, res) => {
  //middleware chequear combiNueva
  const combiExistente = await Combi.findOne({patente: req.params.patente});
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
  res.status(200).send('Combi modificado correctamente').end();
});

//Delete
busesRouter.put('/delete', async (req, res) => {
  const combiExistente = Combi.findOneAndUpdate(
    {_id: req.body._id},
    {unavailable: true}
  );
  if (!combiExistente) throw new Error('Combi no encontrada');
  res.status(200).send('Combi borrada con exito').end();
});

module.exports = busesRouter;
