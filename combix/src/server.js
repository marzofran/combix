const express = require('express'), app = express(), PORT = 3000
app.use(express.json())

let users = [
    
];

// Register user 
app.post('/users',(request, response) => {
    // validate email
    // return registy success code
    // return error code if duplicate
})

// Login
app.get('/users/:id',(request, response) => {
    // validate user data
    // return login success code
    // return error code if invalid login data
})

app.listen( PORT, () => console.log(`Server live on port ${PORT}`))