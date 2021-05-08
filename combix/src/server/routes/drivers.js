const express = require('express');
const Usuario = require('../schemas/Usuario');
const HttpError = require('../utils/HttpError');
const driversRouter = express.Router();

//Display
driversRouter.get('/', async (req, res) => {
    let choferes = await Usuario.find({ permissions: "6094d50128e541353c8cf122" }); //esto funca??? no creo,,,,, WENO AHORA CREO QUE SI 
    require('mongoose').connection.close();
    res.status(200).json(choferes).end();
})

//Create
driversRouter.post('/', async (req, res) => {
        let driver = req.body;
        let chofer = new Usuario({
          nombre: driver.nombre,
          apellido: driver.apellido,
          dni: driver.dni,
          mail: driver.mail,
          clave: driver.clave,
          fechaNacimiento: driver.fechaNacimiento,
          telefono: driver.telefono,
          permissions: "6094d50128e541353c8cf122",
        });
        const foundDriver = await Usuario.find({mail: driver.mail});
        if (Object.entries(foundDriver).length === 0) {
          await chofer.save();
          require('mongoose').connection.close();
          res.status(202).send('Usuario creado con exito!').end();
        } else {
          throw new HttpError(203, 'El mail ya se encuentra registrado');
        }
});

//Modify
driversRouter.put('/', async (req, res) => {
    const choferNuevo = req.body;
    const choferExistente = await Usuario.find({mail: req.params.mail});
    if(!choferExistente) throw new Error('Chofer no encontrado');
    choferExistente.nombre = choferNuevo.nombre ? choferNuevo.nombre : choferExistente.nombre;
    choferExistente.apellido = choferNuevo.apellido ? choferNuevo.apellido : choferExistente.apellido;
    choferExistente.fechaNacimiento = choferNuevo.fechaNacimiento ? choferNuevo.fechaNacimiento : choferExistente.fechaNacimiento;
    choferExistente.dni = choferNuevo.dni ? choferNuevo.dni : choferExistente.dni;
    choferExistente.mail = choferNuevo.mail ? choferNuevo.mail : choferExistente.mail;
    choferExistente.clave = choferNuevo.clave ? choferNuevo.clave : choferExistente.clave;
    choferExistente.telefono = choferNuevo.telefono ? choferNuevo.telefono : choferExistente.telefono;
    await choferExistente.save();
    require('mongoose').connection.close();
    res.status(200).send('Chofer modificado con exito').end();
})

//Delete
driversRouter.put('/delete', async (req, res) => {
    const choferExistente = await Usuario.findOneAndUpdate({ _id: req.body._id}, {unavailable: true});
    if(!choferExistente) throw new Error('Chofer no encontrado');
    require('mongoose').connection.close();
    res.status(200).send('Chofer eliminado').end();
})

module.exports = driversRouter;