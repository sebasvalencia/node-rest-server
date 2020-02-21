const express = require('express');

const app = express();

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

module.exports = app;
