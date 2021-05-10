require('express-async-errors');
const express = require('express');
// middleware
const cors = require('cors');
const {json} = require('express');
const HttpErrorHandler = require('./utils/HttpErrorHandler');
const mongoose = require('mongoose');
const connectionString =
  'mongodb+srv://clovergreen:Kraehe24@peridot.3prtf.mongodb.net/test?authSource=admin&replicaSet=atlas-12mbsv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
mongoose.set('bufferCommands', false);
require('./mongo.js');

const Usuario = require('./schemas/Usuario');

// Routers
const {
  driversRouter,
  usersRouter,
  travelsRouter,
  citiesRouter,
  routesRouter,
  suppliesRouter,
  busesRouter,
  permissionsRouter,
} = require('./routes');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(json());

app.use('/drivers', driversRouter);
app.use('/users', usersRouter);
app.use('/travels', travelsRouter);
app.use('/cities', citiesRouter);
app.use('/routes', routesRouter);
app.use('/supplies', suppliesRouter);
app.use('/buses', busesRouter);
app.use('/permissions', permissionsRouter);

//Login
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
  });
});

app.use(HttpErrorHandler);

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
