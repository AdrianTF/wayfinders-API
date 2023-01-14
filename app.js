const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        estado: true,
        mensaje: 'web server online'
    })
})

mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch((error) => console.log(error));


app.use(express.json())
app.use(bodyParser.json()) 
require('./src/routes.js')(app);

app.listen(port, () => console.log('Servidor iniciado en el puerto', port))