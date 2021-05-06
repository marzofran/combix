const express = require('express')
const driversRouter = express.Router();

//Display
driversRouter.get('/', (req, res) => {
    res.status(200).send('get chofer').end();
})

//Create
driversRouter.post('/', (req, res) => {
    res.status(200).send('post chofer').end();
})

//Modify
driversRouter.put('/', (req, res) => {
    res.status(200).send('put chofer').end();
})

//Delete
driversRouter.delete('/', (req, res) => {
    res.status(200).send('delete chofer').end();
})

module.exports = driversRouter;