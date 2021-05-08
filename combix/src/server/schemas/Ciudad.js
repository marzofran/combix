const {model, Schema} = require('mongoose')

const ciudadSchema = new Schema({
    lugar: String,
    provincia: String,
    unavailable: Boolean
})

const Ciudad = model('Ciudad', ciudadSchema)

module.exports = Ciudad