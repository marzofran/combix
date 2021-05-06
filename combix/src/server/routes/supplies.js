const express = require('express')
const suppliesRouter = express.Router();
const Insumo = require('../schemas/Insumo')

suppliesRouter.get('/', async (req, res) => {
    try{
      let insumos = await Insumo.find({});
      require('mongoose').connection.close();
      res.status(200).json(insumos).end();
    }
    catch(err){
      console.log(err);
      res.status(500).send(err.message).end();
    }
})

suppliesRouter.post('/', async (request, response) => { //middleware validacion
    let supply = request.body;
    let insumo = new Insumo({
      nombre: supply.nombre,
      precio: supply.precio,
      tipo: supply.tipo,
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

  suppliesRouter.put('/:nombre', async(req, res) => {
    const insumoNuevo = req.body;
    try{
      const insumoExistente = await Insumo.find({nombre: req.params.nombre});
      if(!insumoExistente) throw new Error('Insumo no encontrado');
      insumoExistente.nombre = insumoNuevo.nombre ? insumoNuevo.nombre : insumoExistente.nombre;
      insumoExistente.tipo = insumoNuevo.tipo ? insumoNuevo.tipo : insumoExistente.tipo;
      insumoExistente.precio = insumoNuevo.precio ? insumoNuevo.precio : insumoExistente.precio;
      await insumoExistente.save();
    }
    catch(err){
      console.log(err);
      res.status(500).send(err.message).end();
    }
    res.status(200).send('Insumo modificado correctamente').end();
})

suppliesRouter.delete('/', (req, res) => {
    res.status(200).send('delete insumo').end();
})

module.exports = suppliesRouter;