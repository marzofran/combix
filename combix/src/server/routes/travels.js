/* eslint-disable eqeqeq */
const express = require('express');
const travelsRouter = express.Router();
const Viaje = require('../schemas/Viaje');
const Pasaje = require('../schemas/Pasaje');
const HttpError = require('../utils/HttpError');
const {queryBuilder, mapAndBuildModel} = require('../utils/builders');
const {request, response} = require('express');

//Display
travelsRouter.get('/', async (req, res) => {
  let viajes = await Viaje.find({}).populate({
    path: 'ruta',
    model: 'Ruta',
    populate: [
      {
        path: 'origen',
        model: 'Ciudad',
      },
      {
        path: 'destino',
        model: 'Ciudad',
      },
      {
        path: 'combi',
        model: 'Combi',
        populate: {
          path: 'chofer',
          model: 'Usuario',
        },
      },
    ],
  });
  res.status(200).json(viajes).end();
});

//Create
travelsRouter.post('/', async (request, response) => {
  let travel = request.body;
  let viaje = new Viaje({
    ruta: travel.ruta,
    fecha: travel.fecha,
    precio: parseInt(travel.precio),
    unavailable: false,
  });
  const foundTravel = await Viaje.find({
    ruta: viaje.ruta,
    fecha: viaje.fecha,
    unavailable: false,
  });

  if (Object.entries(foundTravel).length === 0) {
    await viaje.save();
    response.status(202).send('Viaje creado con exito!').end();
  } else {
    throw new HttpError(203, 'El viaje ya se encuentra registrado');
  }
});

//Modify
travelsRouter.put('/:id', async (req, res) => {
  const viajeExistente = await Viaje.findOne({
    _id: req.params.id,
  });
  if (!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  const viajeNuevo = queryBuilder(req.body.viaje, ['ruta', 'fecha', 'precio']);
  mapAndBuildModel(viajeExistente, viajeNuevo);
  const foundTravel = Viaje.find({
    ruta: viajeExistente.ruta,
    fecha: viajeExistente.fecha,
    precio: viajeExistente.precio,
    unavailable: false,
  });
  if (foundTravel)
    throw new HttpError(203, 'Ya existe un viaje con esos datos');
  await viajeExistente.save();
  res.status(202).send('Viaje modificado con exito!').end();
});

//Delete
//Le molesta tener como condicion el unavalide
travelsRouter.delete('/:id', async (req, res) => {
  const viajeExistente = await Viaje.findOneAndUpdate(
    {_id: req.params.id},
    {unavailable: true}
  );
  if (!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  res.status(200).send('Viaje borrado');
});

//Fetch viajes buscados
travelsRouter.post('/search', async (request, response) => {
  let searchParams = request.body;
  console.log('searchParams', searchParams)

  let viajes = await Viaje.find({}).populate({
    path: 'ruta',
    model: 'Ruta',
    populate: [
      {
        path: 'origen',
        model: 'Ciudad',
      },
      {
        path: 'destino',
        model: 'Ciudad',
      },
      {
        path: 'combi',
        model: 'Combi',
        populate: {
          path: 'chofer',
          model: 'Usuario',
        },
      },
    ],
  });
  
  if (viajes.length === 0) {
    response.status(404).end();
  } else {
    console.log('viajes', viajes.map(v=>v.ruta.origen))
    let viajesValidos = viajes
      .filter((viaje) => {
        return (
          searchParams.origen._id == viaje.ruta.origen._id
          && searchParams.destino._id == viaje.ruta.destino._id
          //&& searchParams.fecha === viaje.fecha
        );
      })
      .map(async (viaje) => {
        let pasajes = await Pasaje.find({viaje, unavailable: false});
        console.log(viaje.ruta.combi.cantidadAsientos, pasajes.length)
        return {
          ...viaje._doc,
          disponibilidad: viaje.ruta.combi.cantidadAsientos - pasajes.length,
        };
      })
      // .filter((viaje) => {
      //   return viaje.disponibilidad > 0;
      // });
    console.log('viajes validos', viajesValidos);
    response.status(200).json(viajesValidos).end();
  }
});

//Get disponibilidad para viaje
travelsRouter.post('/disp', async (req, res) => {
  let viaje = request.body;
  let pasajes = await Pasaje.find({viaje, unavailable: false});
  response
    .status(200)
    .send(viaje.ruta.combi.cantidadAsientos - pasajes.length)
    .end();
});

module.exports = travelsRouter;
