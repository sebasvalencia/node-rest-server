const express = require("express");
const Usuario = require("../models/usuario");

const app = express();

app.get("/usuario", (req, res) => {
  res.send("get Usuario");
});

app.post("/usuario", (req, res) => {
  let body = req.body;

  //Nuevo objecto de tipo Usuario
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: body.password,
    role: body.role
  });

  //Guardar en la BD
  usuario.save((err, usuarioDB) => {
    if (err) {
      //  res.status(400).json();
      return res.status(400).json({
        ok: false,
        err
        // message: "El nombre es necesario"
        //  err: errors
      });
    }

    //status 200 implicito
    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });

  // res.send("post Usuario");
});

app.put("/usuario/:id", (req, res) => {
  let id = req.params.id;
  res.send({
    id
  });
});

app.delete("/usuario", (req, res) => {
  res.send("delete Usuario");
});

module.exports = app;
