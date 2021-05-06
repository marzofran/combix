const express = require('express')
const driversRouter = express.Router();

driversRouter.get('/', (req, res) => {
    res.status(200).send('get chofer').end();
})

driversRouter.post('/', (req, res) => {
    res.status(200).send('post chofer').end();
})

driversRouter.put('/', (req, res) => {
    res.status(200).send('put chofer').end();
})

driversRouter.delete('/', (req, res) => {
    res.status(200).send('delete chofer').end();
})

module.exports = driversRouter;