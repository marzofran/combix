const express = require('express')
const choferRouter = express.Router();

choferRouter.get('/', (req, res) => {
    res.status(200).send('get chofer').end();
})

choferRouter.post('/', (req, res) => {
    res.status(200).send('post chofer').end();
})

choferRouter.put('/', (req, res) => {
    res.status(200).send('put chofer').end();
})

choferRouter.delete('/', (req, res) => {
    res.status(200).send('delete chofer').end();
})

module.exports = choferRouter;