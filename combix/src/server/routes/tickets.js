const express = require('express');
const ticketsRouter = express.Router();
const Pasaje = require('../schemas/Pasaje');
const {queryBuilder, mapAndBuildModel} = require('../utils/builders');
const HttpError = require('../utils/HttpError');

ticketsRouter.get('/', async(req,res) => {
    let pasajes= await Pasaje.find({unavailable: false});
    res.status(200).json(pasajes).end();
});

ticketsRouter.get('/:id', async(req,res) => {
  let pasajes= await Pasaje.find({usuario: req.params.id, unavailable: false});
  res.status(200).json(pasajes).end();
});

ticketsRouter.post('/',async(req,res) => {
    let ticket = req.body;
    let pasaje = new Pasaje({
        usuario: ticket.usuario,
        cantidadAsientos: parseInt(ticket.cantidadAsientos),
        viaje: ticket.viaje,
        insumos: ticket.insumos
      });
      await pasaje.save();
      res.status(202).send('Pasaje creado con exito!').end();
})

ticketsRouter.put('/:id', async (req, res) => {
    const pasajeExistente = await Pasaje.findOne({_id: req.params.id});
    if (!pasajeExistente) throw new HttpError(404, 'Pasaje no encontrado');
    const pasajeNuevo = queryBuilder(req.body.pasaje, [
      'usuario',
      'viaje',
      'insumos',
      'cantidadAsientos'
    ]);
    mapAndBuildModel(pasajeExistente, pasajeNuevo);
    const foundTicket=Pasaje.find({usuario: pasajeExistente.usuario, cantidadAsientos: pasajeExistente.cantidadAsientos, viaje: pasajeExistente.viaje, insumos: pasajeExistente.insumos, unavailable: false});
    if(foundTicket) throw new HttpError(203,'Ya existe un pasaje con esos datos');
    await pasajeExistente.save();
    res.status(202).send('Pasaje modificado con exito!').end();
  });

  ticketsRouter.delete('/:id', async (req, res) => {
    const pasajeExistente = await Pasaje.findOneAndUpdate(
      {
        _id: req.params.id,
        unavailable: false,
      },
      {unavailable: true}
    );
    if (!pasajeExistente) throw new HttpError(404, 'Pasaje no encontrado');
    res.status(200).send('Pasaje eliminado').end();
  });