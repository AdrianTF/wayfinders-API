const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Mi API")
})

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.log(error))

    
app.listen(port, () => console.log('Servidor iniciado en el puerto', port))