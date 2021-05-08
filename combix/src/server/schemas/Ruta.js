const {model, Schema} = require('mongoose');
const mongoose = require('mongoose');

const rutaSchema = new Schema({
<<<<<<< HEAD
    origen: {type: mongoose.Schema.Types.ObjectId,ref:'Ciudad'},
    destino: {type: mongoose.Schema.Types.ObjectId,ref:'Ciudad'},
    combi: {type: mongoose.Schema.Types.ObjectId,ref:'Combi'},
    horario: String,
    unavailable: Boolean
})
=======
  origen: {type: mongoose.Schema.Types.Object, ref: 'Ciudad'},
  destino: {type: mongoose.Schema.Types.Object, ref: 'Ciudad'},
  combi: {type: mongoose.Schema.Types.Object, ref: 'Combi'},
  horario: String,
});
>>>>>>> a9b94e5cb98706de171efc1b684040babe06b47f

const Ruta = model('Ruta', rutaSchema);

module.exports = Ruta;
