const express = require('express');
const reviewsRouter = express.Router();
const Review = require('../schemas/Review');
const { queryBuilder, mapAndBuildModel } = require('../utils/builders');
const HttpError = require('../utils/HttpError');

//Display todos
reviewsRouter.get('/', async (req, res) => {
  let reviews = await Review.find({}).populate([
    {path: 'usuario', model: 'Usuario'},
  ]);
  res.status(200).json(reviews).end();
});

//Display reviews de usuario 
reviewsRouter.get('/:id', async (req, res) => {
    let reviews = await Review.find({
        usuario: req.params.id
    }).populate([
      {path: 'usuario', model: 'Usuario'},
    ]);
    res.status(200).json(reviews).end();
  });

//Create
reviewsRouter.post('/', async (request, response) => {
    let data = request.body;
    let review = new Review({
        contenido: data.contenido,
        usuario: data.usuario,
        fecha: new Date(),
    });   
  
    await review.save();
    response.status(200).send('Insumo creado con exito!').end();
});

//Modify
reviewsRouter.put('/:id', async (req, res) => {
  let data = req.body;
  const reviewExistente = await Review.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { contenido: data.contenido,
      usuario: data.usuario,
      fecha: data.fecha, },
      {new: true}
  );
  if (!reviewExistente) throw new HttpError('Review no encontrada');
  res.status(200).send('Review modificada con exito').end();
});

//Delete fisico
reviewsRouter.delete('/:id', async (req, res) => {
  await Review.deleteOne(
    {
      _id: req.params.id,
    },
    function (err) {
      if (!err) {
        res.status(200).send('Review eliminado').end();
      } else {
        res.status(500).send('Se produjo un error').end();
      }
    }
  );
});

module.exports = reviewsRouter;