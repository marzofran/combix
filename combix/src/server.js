const express = require('express'), app = express(), port = 3000
app.use(express.json())

app.listen( port, () => console.log("Server live on " + port))