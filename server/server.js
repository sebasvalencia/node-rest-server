require('./config/config')

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();
// const port = 3000;

//Middleware
//parse app/urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//parse app/json
app.use(bodyParser.json())

// Importamos y usamos las routes del usuario
app.use( require('./routes/usuario') )


// conexion a la BD
// mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) {
        throw err;
    }
    console.log('Base de datos ONLINE');
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`)
})





