const express = require('express')
const permissionsRouter = express.Router();
const Permisos = require('../schemas/Permisos');

//Display
permissionsRouter.get('/', (req, res) => {
    //.find({}, function(err, libros) {
        //Autor.populate(libros, {path: "autor"},function(err, libros){
        //res.status(200).send(libros);
        //}); 
    //});
    res.status(200).send('get permisos').end();
})

//Create
permissionsRouter.post('/', async (req, res) => {
    let permission = req.body;
    let permiso = new Permisos({
        tipo: permission.tipo,
    });
    await permiso.save();
     
    res.status(202).send('Permiso creado con exito!').end();
});


//Modify
permissionsRouter.put('/', (req, res) => {
    res.status(200).send('put permisos').end();
})

//Delete
permissionsRouter.delete('/', (req, res) => {
    res.status(200).send('delete permisos').end();
})

module.exports = permissionsRouter;