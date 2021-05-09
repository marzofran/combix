const express = require('express')
const suppliesRouter = express.Router();
const Insumo = require('../schemas/Insumo')
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');
const HttpError = require('../utils/HttpError')

//Display
suppliesRouter.get('/', async (req, res) => {
  let insumos = await Insumo.find({});
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
  response.status(200).json(savedInsumo).end();
});

//Modify
suppliesRouter.put('/:id', async(req, res) => {
  const insumoExistente = await Insumo.findOne({_id: req.params.id});
  if(!insumoExistente) throw new HttpError(404, 'Insumo no encontrado');
  const insumoNuevo = queryBuilder(req.body, ["nombre", "tipo", "precio"])
  mapAndBuildModel(insumoExistente, insumoNuevo);
  await insumoExistente.save();
  res.status(200).send('Insumo modificado correctamente').end();
})

//Delete
suppliesRouter.delete('/:id', async (req, res) => {
  await Insumo.deleteOne(
    {
      _id: req.params.id
    },
    function (err) {
      if (!err) {
        res.status(200).send('Insumo eliminado').end()
      } else {
        res.status(500).send('Se produjo un error').end();
      }
    })
})
//delete logico
// suppliesRouter.delete('/:id', async (req, res) => {
//   console.log(req.body);
//   const insumoExistente = await Insumo.findOneAndUpdate({_id: req.body._id}, {unavailable: true});
//   if(!insumoExistente) throw new HttpError(404, 'Insumo no encontrado');
//   res.status(200).send('Insumo borrado');
// })

module.exports = suppliesRouter;