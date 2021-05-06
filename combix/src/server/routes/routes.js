const express = require('express')
const routesRouter = express.Router();
const Ruta = require('../schemas/Ruta')

//Disply
routesRouter.get('/', async (req, res) => {
    try{
      let rutas = await Ruta.find({});
      require('mongoose').connection.end();
      res.status(200).json(rutas).end();
    }
    catch(err){
      console.log(err);
      res.status(500).send(err.message).end();
    }
})

//Create
routesRouter.post('/rutas', async (request, response) => {
    let route = request.body;
    let ruta = new Ruta({
      origen: route.origen,
      destino: route.destino,
      combi: route.combi,
      horario: route.horario,
    });
    try {
      const savedRuta = await ruta.save();
      console.log(savedRuta);
      require('mongoose').connection.close();
      response.status(200).json(savedRuta).end();
    } catch (err) {
      console.log(err);
      response.status(500).send(err.message).end();
    }
  });

//Modify
routesRouter.put('/body', async (req, res) => { //dps arreglar de ultima
    const rutaNueva = req;
    try{
      const rutaExistente = await Ruta.find({Ruta: req.params.body});
      if(!rutaExistente) throw new Error('Ruta no encontrada');
      rutaExistente.origen = rutaNueva.origen ? rutaNueva.origen : rutaExistente.origen;
      rutaExistente.destino = rutaNueva.destino ? rutaNueva.destino : rutaExistente.destino;
      rutaExistente.combi = rutaNueva.combi ? rutaNueva.combi : rutaExistente.combi;
      await rutaExistente.save();
    }
    catch(err){
      console.log(err);
      res.status(400).send(err.message).end();
    }
    res.status(200).send('Ruta modificada con exito').end();
})

//Delete
routesRouter.delete('/', (req, res) => {
    res.status(200).send('delete ruta').end();
})

module.exports = routesRouter;
