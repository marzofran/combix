const express = require('express')
const combisRouter = express.Router();
const Combi = require('../schemas/Combi')

combisRouter.get('/', async (request, response) => {
    try {
      let combis = await Combi.find({});
      require('mongoose').connection.close();
      response.status(200).json(combis).end();
    } catch (err) {
      console.log(err);
      response.status(500).send(err.message).end();
    }
});

combisRouter.post('/', async (request, response) => {
  let bus = request.body;
  let combi = new Combi({
    modelo: bus.modelo,
    patente: bus.patente,
    cantidadAsientos: bus.cantidadAsientos,
    tipo: bus.tipo,
    chofer: bus.chofer,
  });
  try {
    const savedCombi = await combi.save();
    console.log(savedCombi);
    require('mongoose').connection.close();
    response.status(200).json(savedCombi).end();
  } catch (err) {
    console.log(err);
    response.status(500);
    response.send(err.message).end();
  }
});

//'localhost:8080/combis/7' { combiNueva }
combisRouter.put('/:patente', async (req, res) => {
    const combiNueva = req.body;
    const choferNuevo = combiNueva.chofer;
    try {
      const combiExistente = await Combi.find({patente: req.params.patente});
      if (!combiExistente) throw new Error('Combi no encontrada')
      combiExistente.modelo = combiNueva.modelo ? combiNueva.modelo : combiExistente.modelo;
      combiExistente.cantidadAsientos = combiNueva.cantidadAsientos ? combiNueva.cantidadAsientos : combiExistente.cantidadAsientos;
      combiExistente.tipo = combiNueva.tipo ? combiNueva.tipo : combiExistente.tipo;
      combiExistente.chofer = combiNueva.chofer ? combiNueva.chofer : combiExistente.chofer;
      await combiExistente.save();
    } catch (err) {
      res.status(400).send(err.message).end();
    }
    res.status(200).send('put combis').end();
})

combisRouter.delete('/', (req, res) => {
    res.status(200).send('delete combis').end();
})

module.exports = combisRouter;
