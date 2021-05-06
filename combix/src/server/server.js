const express = require('express');
// middleware
const cors = require('cors');
const {json} = require('express');

require('./mongo');
const Usuario = require('./schemas/Usuario');

// Routers
const { driversRouter, 
        usersRouter,
        travelsRouter,
        citiesRouter, 
        routesRouter, 
        suppliesRouter, 
        busesRouter } = require('./routes')

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
app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
