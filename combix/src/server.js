const express = require('express'), app = express(), PORT = 3000
app.use(express.json())

app.listen( PORT, () => console.log(`Server live on port ${PORT}`))

let users = [
    
];

app.post('/users',(request, response) => {
    response.send({message: 'Hello back!'})
})