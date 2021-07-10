const express = require('express');
const routesRouter = express.Router();
const Ruta = require('../schemas/Ruta');
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');
const HttpError = require('../utils/HttpError');

//Disply
routesRouter.get('/', async (req, res) => {
  let rutas = await Ruta.find({})
    .populate('origen')
    .populate('destino')
    .populate('combi');
  res.status(200).json(rutas).end();
});

//Create
routesRouter.post('/', async (request, response) => {
  let route = request.body;
  let ruta = new Ruta({
    origen: route.origen,
    destino: route.destino,
    combi: route.combi,
    horario: route.horario,
    unavailable: false,
  });
  if (ruta.origen === ruta.destino)
    throw new HttpError(
      203,
      'La ruta no puede tener la misma ciudad de destino y origen'
    );
  const foundRoute = await Ruta.find({
    origen: ruta.origen,
    destino: ruta.destino,
    combi: ruta.combi,
    horario: ruta.horario,
    unavailable: false,
  });
  if (Object.entries(foundRoute).length === 0) {
    await ruta.save();
    response.status(202).send('Ruta creada con exito!').end();
  } else {
    throw new HttpError(203, 'La ruta ya se encuentra registrada');
  }
});

//Modify
/*
routesRouter.put('/body', async (req, res) => {
  //dps arreglar de ultima
  const rutaNueva = req;
  try {
    const rutaExistente = await Ruta.find({Ruta: req.params.body});
    if (!rutaExistente) throw new Error('Ruta no encontrada');
    rutaExistente.origen = rutaNueva.origen
      ? rutaNueva.origen
      : rutaExistente.origen;
    rutaExistente.destino = rutaNueva.destino
      ? rutaNueva.destino
      : rutaExistente.destino;
    rutaExistente.combi = rutaNueva.combi
      ? rutaNueva.combi
      : rutaExistente.combi;
    await rutaExistente.save();
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message).end();
  }
  res.status(200).send('Ruta modificada con exito').end();
});
*/
routesRouter.put('/:id', async (req, res) => {
  const rutaExistente = await Ruta.findOne({
    _id: req.params.id,
    unavailable: false,
  });
  if (!rutaExistente) throw new HttpError(404, 'Ruta no encontrada');
  const rutaNueva = queryBuilder(req.body.data.ruta, [
    'origen',
    'destino',
    'combi',
    'horario',
  ]);
  mapAndBuildModel(rutaExistente, rutaNueva);
  if (rutaExistente.origen === rutaExistente.destino)
    throw new HttpError(
      203,
      'La ruta no puede tener la misma ciudad de destino y origen'
    );
  Ruta.find(
    {
      origen: rutaExistente.origen,
      destino: rutaExistente.destino,
      combi: rutaExistente.combi,
      horario: rutaExistente.horario,
      unavailable: false,
    },
    function (err, result) {
      if (!result.length) {
        rutaExistente.save();
        res.status(200).send('Ruta modificada correctamente').end();
      } else {
        res.status(203).send('Ya existe una ruta con esos datos').end();
      }
    }
  );
});
/*
routesRouter.put('/:id', async (req, res) => {
  const ruta = req.body.data.ruta;
  const idCiudadVieja = req.body.data.idRutaVieja;
  console.log(ruta);
  await Ruta.updateOne(
    {_id: idCiudadVieja},
    {
      origen: ruta.origen,
      destino: ruta.destino,
      combi: ruta.combi,
      horario: ruta.horario,
    },
    function (err, affected, resp) {
      console.log(resp);
    }
  );

  res.status(200).send('Ciudad modificada con exito').end();
});
*/

//Delete
routesRouter.delete('/:id', async (req, res) => {
  const rutaExistente = await Ruta.findOneAndUpdate(
    { _id: req.params.id, unavailable: false },
    { unavailable: true }
  );
  if (!rutaExistente) throw new HttpError(404, 'Ruta no encontrado');
  res.status(200).send('Ruta eliminada').end();
});

routesRouter.put('/darDeAlta/:id', async (req, res) => {
  const rutaExistente = await Ruta.findOneAndUpdate(
    { _id: req.params.id, unavailable: true },
    { unavailable: false }
  );
  if (!rutaExistente) throw new HttpError(404, 'Ruta no encontrado');
  res.status(200).send('Ruta dada de alta').end();
});

module.exports = routesRouter;
