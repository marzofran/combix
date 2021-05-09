const express = require('express')
const suppliesRouter = express.Router();
const Insumo = require('../schemas/Insumo')
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');
const HttpError = require('../utils/HttpError')

//Display
suppliesRouter.get('/', async (req, res) => {
  let insumos = await Insumo.find({});
  require('mongoose').connection.close();
  res.status(200).json(insumos).end();
})

//Create
suppliesRouter.post('/', async (request, response) => { //middleware validacion
  let supply = request.body;
  let insumo = new Insumo({
    nombre: supply.nombre,
    precio: supply.precio,
    tipo: supply.tipo,
  });
  const savedInsumo = await insumo.save();
  console.log(savedInsumo);
  require('mongoose').connection.close();
  response.status(200).json(savedInsumo).end();
});

//Modify
suppliesRouter.put('/:nombre', async(req, res) => {
  const insumoExistente = await Insumo.findOne({nombre: req.params.nombre});
  if(!insumoExistente) throw new HttpError(404, 'Insumo no encontrado');
  const insumoNuevo = queryBuilder(req.body, ["nombre", "tipo", "precio"])
  mapAndBuildModel(insumoExistente, insumoNuevo);
  await insumoExistente.save();
  require('mongoose').connection.close();
  res.status(200).send('Insumo modificado correctamente').end();
})

//Delete
suppliesRouter.delete('/', async (req, res) => {
  console.log(req.body.insumo);

  await Insumo.deleteOne(
    {
      nombre: req.body.insumo.nombre,
      precio: req.body.insumo.precio,
      tipo: req.body.insumo.tipo
    },
    function (err) {
      if (!err) {
        require('mongoose').connection.close();
        res.status(200).send('Insumo eliminado').end()
      } else {
        res.status(500).send('Se produjo un error').end();
      }
    })
})
//delete logico
suppliesRouter.put('/delete', async (req, res) => {
  console.log(req.body);
  const insumoExistente = await Insumo.findOneAndUpdate({_id: req.body._id}, {unavailable: true});
  if(!insumoExistente) throw new HttpError(404, 'Insumo no encontrado');
  require('mongoose').connection.close();
  res.status(200).send('Insumo borrado');
})

module.exports = suppliesRouter;