const {model, Schema} = require('mongoose');
const mongoose = require('mongoose');

const rutaSchema = new Schema({
  origen: {type: mongoose.Schema.Types.Object, ref: 'Ciudad'},
  destino: {type: mongoose.Schema.Types.Object, ref: 'Ciudad'},
  combi: {type: mongoose.Schema.Types.Object, ref: 'Combi'},
  horario: String,
});

const Ruta = model('Ruta', rutaSchema);

module.exports = Ruta;
