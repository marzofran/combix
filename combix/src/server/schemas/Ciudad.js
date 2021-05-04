const {model, Schema} = require('mongoose')

const ciudadSchema = new Schema({
    lugar: String,
    provincia: String,
})

const Ciudad = model('Ciudad', ciudadSchema)

module.exports = Ciudad