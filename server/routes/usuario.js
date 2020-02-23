const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario");

const app = express();

app.post("/usuario", (req, res) => {
  let body = req.body;

  //Nuevo objecto de tipo Usuario
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
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

    // usuarioDB.password = null;

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
  //   let body = req.body;
  //PICK: regresa una copia del objecto, filtrando solo los valores que quiero
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB
      });
    }
  );

  //   res.send({
  //     id
  //   });
});

app.get("/usuario", (req, res) => {
  // res.send("get Usuario");

  let desde = req.query.desde || 0; //validar q sea un numero
  desde = Number(desde);

  let limite = Number(req.query.limite) || 5;



  //   Usuario.find({})
  //solo interesa regresar cierta info
  // Usuario.find({}, "nombre email role estado google img")
  Usuario.find({estado:true}, "nombre email role estado google img")
    //   Usuario.find({google:true})
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      // Usuario.count({{google:true}}, (err, conteo) => {
      // Usuario.count({}, (err, conteo) => {
      Usuario.count({estado:true}, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cuantos: conteo
        });
      });
    });
});

app.delete("/usuario/:id", (req, res) => {
  //   res.send("delete Usuario");
  let id = req.params.id;

  //Eliminacion cambiando estado
  let cambiaEstado = {
    estado: false
  };

  Usuario.findByIdAndUpdate(
    id,
    cambiaEstado,
    { new: true },
    (err, usuarioBorrado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        usuario: usuarioBorrado
      });
    });




  //Eliminacion fisica
  // Usuario.findByIdAndRemove(id, (err, usuarioDB) => {
  //   if (err) {
  //     return res.status(400).json({
  //       ok: false,
  //       err
  //     });
  //   }

  //   if (!usuarioDB) {
  //     return res.status(400).json({
  //       ok: false,
  //       error: {
  //           message : 'Usuario no encontrado'
  //       }
  //     });
  //   }
  //   res.json({
  //     ok: true,
  //     usuario: usuarioDB
  //   });
  // });


});

module.exports = app;
