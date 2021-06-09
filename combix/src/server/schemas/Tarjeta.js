const {model , Schema} = require('mongoose');

const tarjetaSchema = new Schema({
    usuario: {type: require('mongoose').Schema.Types.ObjectId,ref:'Usuario'},
    numero: Number,
    fechaVencimiento: Date,
    codigoSeguridad: Number
})

const Tarjeta = model('Tarjeta', tarjetaSchema)

module.exports = Tarjeta