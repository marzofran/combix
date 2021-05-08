const express = require('express');
const busesRouter = express.Router();
const Combi = require('../schemas/Combi');
const Usuario = require('../schemas/Usuario');

//Display
busesRouter.get('/', async (request, response) => {
  try {
    let combis = await Combi.find({});

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
    let choferExistente = await Usuario.find({_id: bus.chofer._id});
    if (!choferExistente) throw new Error('Chofer no existe');
    let combi = new Combi({
      modelo: bus.modelo,
      patente: bus.patente,
      cantidadAsientos: bus.cantidadAsientos,
      tipo: bus.tipo,
      chofer: choferExistente,
    });
    const savedCombi = await combi.save();
    console.log(savedCombi);
    require('mongoose').connection.close();
    response.status(200).json(savedCombi).end(); //por que devuelve un json??
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message).end();
  }
});

//Modify
//'localhost:8080/combis/7' { combiNueva }
busesRouter.put('/:patente', async (req, res) => {
  //middleware chequear combiNueva
  const combiNueva = req.body;
  try {
    const combiExistente = await Combi.find({patente: req.params.patente});
    if (!combiExistente) throw new Error('Combi no encontrada');
    combiExistente.modelo = combiNueva.modelo
      ? combiNueva.modelo
      : combiExistente.modelo;
    combiExistente.cantidadAsientos = combiNueva.cantidadAsientos
      ? combiNueva.cantidadAsientos
      : combiExistente.cantidadAsientos;
    combiExistente.tipo = combiNueva.tipo
      ? combiNueva.tipo
      : combiExistente.tipo;
    combiExistente.chofer = combiNueva.chofer
      ? combiNueva.chofer
      : combiExistente.chofer;
    await combiExistente.save();
  } catch (err) {
    res.status(400).send(err.message).end();
  }
  res.status(200).send('Combi modificada con exito').end();
});

//Delete
busesRouter.delete('/', (req, res) => {
  res.status(200).send('delete combis').end();
});

module.exports = busesRouter;
