const express = require('express')
const suppliesRouter = express.Router();
const Insumo = require('../schemas/Insumo')

//Display
suppliesRouter.get('/', async (req, res) => {
  try{
    let insumos = await Insumo.find({});
    res.status(200).json(insumos).end();
  }
  catch(err){
    console.log(err);
    res.status(500).send(err.message).end();
  }
})

//Create
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

//Modify
suppliesRouter.put('/:nombre', async(req, res) => {
  const insumoNuevo = req.body.insumo;
  try{
    const buffer = await Insumo.find({nombre: req.params.nombre});
    let insumoExistente = new Insumo({
      nombre: buffer.nombre,
      precio: buffer.precio,
      tipo: buffer.tipo,
    }) 
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

//Delete
suppliesRouter.delete('/', (req, res) => {
  console.log(req.body.insumo);

  Insumo.deleteOne(
    {
      nombre: req.body.insumo.nombre,
      precio: req.body.insumo.precio,
      tipo: req.body.insumo.tipo
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
suppliesRouter.post('/delete',async (req, res) => {
  console.log(req.body);
  const insumoExistente = await Insumo.findOne({_id: req.body._id});
  if(!insumoExistente) throw new Error('Insumo no encontrado');
  insumoExistente.unavailable = true;
  await insumoExistente.save();
  res.status(200).send('Insumo borrado');
})

module.exports = suppliesRouter;