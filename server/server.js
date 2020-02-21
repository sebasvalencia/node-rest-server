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

app.get('/usuario', (req, res) => {
    res.send('get Usuario')
})

app.post('/usuario', (req, res) => {
    let body = req.body;

    if (body.nombre === undefined) {
        //  res.status(400).json();   
         res.status(400).json({
             ok:false,
             message: 'El nombre es necesario'
            //  err: errors
         });   
    }

    res.json({
        body
    })

    res.send('post Usuario')
})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.send({
        id
    })
})

app.delete('/usuario', (req, res) => {
    res.send('delete Usuario')
})


// conexion a la BD
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) {
        throw err;
    }
    console.log('Base de datos ONLINE');
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`)
})





