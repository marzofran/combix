const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://clovergreen:Kraehe24@peridot.3prtf.mongodb.net/combixdb?retryWrites=true&w=majority'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCrateIndex: true
})
    .then(() => {
        console.log('Database connected')
    }).catch( err => {
        console.error(err)
})
// aca se enoja si usas sintaxis de import.