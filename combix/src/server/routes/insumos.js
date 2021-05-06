const express = require('express')
const insumosRouter = express.Router();
const Insumo = require('../schemas/Insumo')

insumosRouter.get('/', (req, res) => {
    res.status(200).send('get insumo').end();
})

insumosRouter.post('/', async (request, response) => {
    let bus = request.body;
    let insumo = new Insumo({
      nombre: bus.nombre,
      precio: bus.precio,
      tipo: bus.tipo,
    });
    try {
      const savedInsumo = await insumo.save();
      console.log(savedInsumo);
      require('mongoose').connection.close();
      response.status(200).json(savedInsumo).end();
    } catch (err) {
      console.log(err);
      response.status(500);
      response.send(err.message).end();
    }
  });

insumosRouter.put('/', (req, res) => {
    res.status(200).send('put insumo').end();
})

insumosRouter.delete('/', (req, res) => {
    res.status(200).send('delete insumo').end();
})

module.exports = insumosRouter;