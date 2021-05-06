const express = require('express');
// middleware
const cors = require('cors');
const {json} = require('express');

require('./mongo');
const Usuario = require('./schemas/Usuario');

// Routers
const {
  choferesRouter,
  usuariosRouter,
  viajesRouter,
  ciudadesRouter,
  rutasRouter,
  insumosRouter,
  combisRouter,
} = require('./routes');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(json());

app.use('/choferes', choferesRouter);
app.use('/usuarios', usuariosRouter);
app.use('/viajes', viajesRouter);
app.use('/ciudades', ciudadesRouter);
app.use('/rutas', rutasRouter);
app.use('/insumos', insumosRouter);
app.use('/combis', combisRouter);

// Login
app.get('/login', async (request, response) => {
  let email = request.query.mail;
  let password = request.query.clave;
  Usuario.findOne({mail: email, clave: password}, function (err, user) {
    if (err) {
      console.log(response);
      return response.status(204).end();
    }
    if (!user) {
      return response.status(203).end();
    }
    if (user) {
      console.log(user);
      return response.send(user).end();
    }
    require('mongoose').connection.close();
  });
});

//Create Ciudad
app.post('/ciudad', async (request, response) => {
  let bus = request.body;
  let ciudad = new Ciudad({
    lugar: bus.lugar,
    provincia: bus.provincia,
  });
  try {
    const savedCiudad = await ciudad.save();
    console.log(savedCiudad);

    response.status(200).json(savedCiudad).end();
  } catch (err) {
    console.log(err);
    response.status(500);
    response.send(err.message).end();
  }
});
//Fetch Ciudades
app.get('/ciudades', async (request, response) => {
  try {
    let ciudades = await Ciudad.find({});
    require('mongoose').connection.close();
    response.status(200).json(ciudades).end();
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message).end();
  }
});
//Modify Ciudad
//Disable Ciudad

//Create Ruta
app.post('/rutas', async (request, response) => {
  let bus = request.body;
  let ruta = new Ruta({
    origen: bus.origen,
    destino: bus.destino,
    combi: bus.combi,
    horario: bus.horario,
  });
  try {
    const savedRuta = await ruta.save();
    console.log(savedRuta);
    require('mongoose').connection.close();
    response.status(200).json(savedRuta).end();
  } catch (err) {
    console.log(err);
    response.status(500);
    response.send(err.message).end();
  }
});
//Fetch Rutas
//Modify Ruta
//Disable Ruta

//Create Combi
app.post('/combis', async (request, response) => {
  let bus = request.body;
  let combi = new Combi({
    modelo: bus.modelo,
    patente: bus.patente,
    cantidadAsientos: bus.cantidadAsientos,
    tipo: bus.tipo,
    chofer: bus.chofer,
  });
  try {
    const savedCombi = await combi.save();
    console.log(savedCombi);
    require('mongoose').connection.close();
    response.status(200).json(savedCombi).end();
  } catch (err) {
    console.log(err);
    response.status(500);
    response.send(err.message).end();
  }
});
//Fetch Combis
app.get('/combis', async (request, response) => {
  try {
    let combis = await Combi.find({});
    require('mongoose').connection.close();
    response.status(200).json(combis).end();
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message).end();
  }
});
//Modify Combi
//Disable Combi

//Create Chofer
//Fetch Choferes
//Modify Chofer
//Disable Chofer

//Create Insumo
app.post('/insumos', async (request, response) => {
  let bus = request.body;
  let insumo = new Insumo({
    nombre: bus.nombre,
    precio: bus.precio,
    tipo: bus.tipo,
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
//Fetch Insumos
//Modify Insumo
//Disable Insumo

//Create Viaje
app.post('/viajes', async (request, response) => {
  let bus = request.body;
  let viaje = new Viaje({
    ruta: bus.ruta,
    fecha: bus.fecha,
    precio: bus.precio,
  });
  try {
    const savedViaje = await viaje.save();
    console.log(savedViaje);
    require('mongoose').connection.close();
    response.status(200).json(savedViaje).end();
  } catch (err) {
    console.log(err);
    response.status(500);
    response.send(err.message).end();
  }
});
//Fetch Viajes
//Modify Viaje
//Delete Viaje

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
