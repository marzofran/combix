const express = require('express');
const ticketsRouter = express.Router();
const Pasaje = require('../schemas/Pasaje');
const Viaje = require('../schemas/Viaje');
const Insumo = require('../schemas/Insumo');
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');
const HttpError = require('../utils/HttpError');
const mongoose = require('mongoose');

ticketsRouter.get('/', async (req, res) => {
  //fetchea todos los pasajes
  let pasajes = await Pasaje.find({ unavailable: false }).populate([
    {
      path: 'viaje',
      model: 'Viaje',
      populate: {
        path: 'ruta',
        model: 'Ruta',
        populate: [
          { path: 'origen', model: 'Ciudad' },
          { path: 'destino', model: 'Ciudad' },
          {
            path: 'combi',
            model: 'Combi',
            populate: { path: 'chofer', model: 'Usuario' },
          },
        ],
      },
    },
    { path: 'usuario', model: 'Usuario' },
  ]);
  res.status(200).json(pasajes).end();
});

ticketsRouter.get('/:id', async (req, res) => {
  //fetchea pasajes de un usuario
  let pasajes = await Pasaje.find({
    usuario: req.params.id,
    unavailable: false,
  }).populate([
    {
      path: 'viaje',
      model: 'Viaje',
      populate: {
        path: 'ruta',
        model: 'Ruta',
        populate: [
          { path: 'origen', model: 'Ciudad' },
          { path: 'destino', model: 'Ciudad' },
          {
            path: 'combi',
            model: 'Combi',
            populate: { path: 'chofer', model: 'Usuario' },
          },
        ],
      },
    },
    { path: 'usuario', model: 'Usuario' },
  ]);
  res.status(200).json(pasajes).end();
});

ticketsRouter.get('/viaje/:travel', async (req, res) => {
  let pasajes = await Pasaje.find({
    viaje: req.params.travel,
    unavailable: false,
  }).populate([
    {
      path: 'viaje',
      model: 'Viaje',
      populate: {
        path: 'ruta',
        model: 'Ruta',
        populate: [
          { path: 'origen', model: 'Ciudad' },
          { path: 'destino', model: 'Ciudad' },
          {
            path: 'combi',
            model: 'Combi',
            populate: { path: 'chofer', model: 'Usuario' },
          },
        ],
      },
    },
    { path: 'usuario', model: 'Usuario' },
  ]);
  res.status(200).json(pasajes).end();
});

ticketsRouter.post('/', async (req, res) => {
  let ticket = req.body.pasaje;

  let pasaje = new Pasaje({
    usuario: ticket.usuario,
    cantidadPasajes: parseInt(ticket.cantidadAsientos),
    viaje: ticket.viaje,
    insumos: ticket.insumos,
    precioTotal: ticket.precioTotal,
    estado: 'pendiente',
    unavailable: false,
  });
  console.log(pasaje);
  await pasaje.save();
  res.status(202).send(pasaje).end();
});
/*
ticketsRouter.put('/:id', async (req, res) => {
  const pasajeExistente = await Pasaje.findOne({_id: req.params.id});
  if (!pasajeExistente) throw new HttpError(404, 'Pasaje no encontrado');
  const pasajeNuevo = queryBuilder(req.body.pasaje, [
    'usuario',
    'viaje',
    'insumos',
    'cantidadAsientos',
    'precioTotal',
  ]);
  mapAndBuildModel(pasajeExistente, pasajeNuevo);
  const foundTicket = Pasaje.find({
    usuario: pasajeExistente.usuario,
    cantidadAsientos: pasajeExistente.cantidadAsientos,
    viaje: pasajeExistente.viaje,
    insumos: pasajeExistente.insumos,
    unavailable: false,
  });
  if (foundTicket)
    throw new HttpError(203, 'Ya existe un pasaje con esos datos');
  await pasajeExistente.save();
  res.status(202).send('Pasaje modificado con exito!').end();
});
*/
ticketsRouter.delete('/:id', async (req, res) => {
  const pasajeExistente = await Pasaje.findOneAndUpdate(
    {
      _id: req.params.id,
      unavailable: false,
    },
    { unavailable: true }
  );
  if (!pasajeExistente) throw new HttpError(404, 'Pasaje no encontrado');
  res.status(200).send('Pasaje eliminado').end();
});

ticketsRouter.put('/:id', async (req, res) => {
  const foundTicket = await Pasaje.findOneAndUpdate(
    { _id: req.params.id },
    { estado: req.body.estado },
    { new: true }
  );
  if (!foundTicket) throw new HttpError(203, 'No se encontro el pasaje');
  res.status(202).send('Pasaje modificado con exito!').end();
});

ticketsRouter.get('/traerPorInsumo/:id', async (req, res) => {
  let resultado = [];
  let pasajes = await Pasaje.find({
    estado: 'pendiente',
    unavailable: false,
  }).populate([
    {
      path: 'viaje',
      model: 'Viaje',
      populate: {
        path: 'ruta',
        model: 'Ruta',
        populate: [
          { path: 'origen', model: 'Ciudad' },
          { path: 'destino', model: 'Ciudad' },
          {
            path: 'combi',
            model: 'Combi',
            populate: { path: 'chofer', model: 'Usuario' },
          },
        ],
      },
    },
    { path: 'usuario', model: 'Usuario' },
  ]);
  pasajes.forEach((e) => {
    if (e.insumos.length > 0) {
      e.insumos.forEach((elemento) => {
        // eslint-disable-next-line eqeqeq
        if (elemento._id == req.params.id) {
          resultado.push(e);
        }
      });
    }
  });
  res.status(200).json(resultado).end();
});
ticketsRouter.get('/traerPorInsumoSinEstado/:id', async (req, res) => {
  let resultado = [];
  let pasajes = await Pasaje.find({
    unavailable: false,
  }).populate([
    {
      path: 'viaje',
      model: 'Viaje',
      populate: {
        path: 'ruta',
        model: 'Ruta',
        populate: [
          { path: 'origen', model: 'Ciudad' },
          { path: 'destino', model: 'Ciudad' },
          {
            path: 'combi',
            model: 'Combi',
            populate: { path: 'chofer', model: 'Usuario' },
          },
        ],
      },
    },
    { path: 'usuario', model: 'Usuario' },
  ]);
  pasajes.forEach((e) => {
    if (e.insumos.length > 0) {
      e.insumos.forEach((elemento) => {
        // eslint-disable-next-line eqeqeq
        if (elemento._id == req.params.id) {
          resultado.push(e);
        }
      });
    }
  });
  res.status(200).json(resultado).end();
});

module.exports = ticketsRouter;
