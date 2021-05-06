const express = require('express')
const rutasRouter = express.Router();
const Ruta = require('../schemas/Ruta')

rutasRouter.get('/', (req, res) => {
    res.status(200).send('get ruta').end();
})

rutasRouter.post('/rutas', async (request, response) => {
    let bus = request.body;
    let ruta = new Ruta({
      origen: bus.origen,
      destino: bus.destino,
      combi: bus.combi,
      horario: bus.horario,
    });
    try {
      const savedRuta = await ruta.save();
      console.log(savedRuta);
      require('mongoose').connection.close();
      response.status(200).json(savedRuta).end();
    } catch (err) {
      console.log(err);
      response.status(500);
      response.send(err.message).end();
    }
  });

rutasRouter.put('/', (req, res) => {
    res.status(200).send('put ruta').end();
})

rutasRouter.delete('/', (req, res) => {
    res.status(200).send('delete ruta').end();
})

module.exports = rutasRouter;
