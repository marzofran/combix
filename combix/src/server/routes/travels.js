/* eslint-disable eqeqeq */
const express = require('express');
const travelsRouter = express.Router();
const Viaje = require('../schemas/Viaje');
const Pasaje = require('../schemas/Pasaje');
const Combi = require('../schemas/Combi');
const Ruta = require('../schemas/Ruta');
const HttpError = require('../utils/HttpError');
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');
const { request, response } = require('express');

//Display
travelsRouter.get('/', async (req, res) => {
  //fetchea todos los viajes
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

travelsRouter.get('/:chofer', async (req, res) => {
  //fetchea viajes de un chofer especifico
  let combis = await Combi.find({ chofer: req.params.chofer }).select('_id');
  let rutas = await Ruta.find({ combi: { $in: combis } }).select('_id');
  //let combisLimpias=[];
  //for (const key in combis) combisLimpias[key] = combis[key]._id;
  //console.log(combisLimpias);
  let viajes = await Viaje.find({ ruta: { $in: rutas } }).populate({
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
    precio: travel.precio,
    estado: 'pendiente',
    pasajeros: [],
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
  const viajeNuevo = queryBuilder(req.body.viaje, [
    'ruta',
    'fecha',
    'precio',
    'estado',
    'pasajeros',
  ]);
  mapAndBuildModel(viajeExistente, viajeNuevo);
  Viaje.find(
    {
      ruta: viajeExistente.ruta,
      fecha: viajeExistente.fecha,
      unavailable: false,
    },
    function (err, result) {
      if (!result.length) {
        viajeExistente.save();
        res.status(202).send('Viaje modificado con exito!').end();
      } else {
        res.status(203).send('Ya existe un viaje con esos datos!').end();
      }
    }
  );
});

travelsRouter.put('/abrir/:id', async (req, res) => {
  const viajeExistente = await Viaje.findOneAndUpdate(
    {
      _id: req.params.id,
      unavailable: false,
    },
    { estado: 'Abierto' },
    { new: true }
  );
  if (!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  res.status(202).send(viajeExistente).end();
});

travelsRouter.put('/comenzar/:id', async (req, res) => {
  const viajeExistente = await Viaje.findOneAndUpdate(
    {
      _id: req.params.id,
      unavailable: false,
    },
    { estado: 'En curso' },
    { new: true }
  );
  if (!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  res.status(202).send(viajeExistente).end();
});

travelsRouter.put('/finalizar/:id', async (req, res) => {
  const viajeExistente = await Viaje.findOneAndUpdate(
    {
      _id: req.params.id,
      unavailable: false,
    },
    { estado: 'Finalizado' },
    { new: true }
  );
  if (!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  res.status(202).send(viajeExistente).end();
});

travelsRouter.put('/cancelar/:id', async (req, res) => {
  const viajeExistente = await Viaje.findOneAndUpdate(
    {
      _id: req.params.id,
      unavailable: false,
    },
    { estado: 'cancelado' }
  );
  if (!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  res.status(202).send('Viaje modificado con exito!').end();
});

//Delete
//Le molesta tener como condicion el unavalide
travelsRouter.delete('/:id', async (req, res) => {
  const viajeExistente = await Viaje.findOneAndUpdate(
    { _id: req.params.id },
    { unavailable: true }
  );
  if (!viajeExistente) throw new HttpError(404, 'Viaje no encontrado');
  res.status(200).send('Viaje borrado');
});

//Fetch viajes buscados
travelsRouter.post('/search', async (request, response) => {
  let searchParams = request.body;
  console.log('searchParams', searchParams);

  let viajes = await Viaje.find({
    fecha: searchParams.fecha,
    estado: 'pendiente',
  }).populate({
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
    response
      .status(404)
      .send('No se encontraron viajes para esa ruta y esa fecha')
      .end();
  } else {
    console.log(
      'viajes',
      viajes.map((v) => v.ruta.origen)
    );
    let viajesValidos = viajes
      .filter((viaje) => {
        return (
          searchParams.origen._id == viaje.ruta.origen._id &&
          searchParams.destino._id == viaje.ruta.destino._id
        );
      })
      .map(async (viaje) => {
        let pasajes = await Pasaje.find({ viaje, unavailable: false });
        console.log(pasajes);
        let vendidos = pasajes.reduce(
          (total, pasaje) =>
            pasaje.cantidadPasajes ? total + pasaje.cantidadPasajes : total + 1,
          0
        );
        console.log(viaje.ruta.combi.cantidadAsientos, vendidos);
        return {
          ...viaje._doc,
          disponibilidad: viaje.ruta.combi.cantidadAsientos - vendidos,
        };
      });
    let viajesMasSuDisponibilidad = await Promise.all(viajesValidos);
    let viajesDisponibles = viajesMasSuDisponibilidad.filter((viaje) => {
      return viaje.disponibilidad > 0;
    });
    console.log('viajes validos', viajesDisponibles);
    response.status(200).json(viajesDisponibles).end();
  }
});

//Get disponibilidad para viaje
travelsRouter.post('/disp', async (req, res) => {
  let viaje = request.body;
  let pasajes = await Pasaje.find({ viaje, unavailable: false });
  response
    .status(200)
    .send(viaje.ruta.combi.cantidadAsientos - pasajes.length)
    .end();
});

travelsRouter.put('/darDeAlta/:id', async (req, res) => {
  Viaje.find(
    {
      ruta: req.body.viaje.ruta,
      fecha: req.body.viaje.fecha,
      unavailable: false,
    },
    function (err, result) {
      if (result.length < 1) {
        Viaje.findOneAndUpdate(
          { _id: req.params.id },
          { unavailable: false },
          function (err, result) {
            if (result) {
              res.status(200).send('Viaje dado de alta');
            }
          }
        );
      } else {
        res.status(202).send('Ya existe un viaje con esos parametros');
      }
    }
  );
});
module.exports = travelsRouter;
