const {model, Schema} = require('mongoose')

const reviewSchema = new Schema({
    contenido: String,
    usuario: {type: require('mongoose').Schema.Types.ObjectId,ref:'Usuario'},
    fecha: Date,
})

const Review = model('Review', reviewSchema)

module.exports = Review