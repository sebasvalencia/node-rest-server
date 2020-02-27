const jwt = require("jsonwebtoken");

//verificacion del token
//next -> continuar con la ejecucion del programa

let verificaToken = (req, res, next) => {
  let token = req.get("token"); // o el nombre q le pongas
  // res.json({
  //     token: token
  // })

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Token no valido"
        }
      });
    }

    //Cualquier peticion tenga acceso a la info de usuario al pasar por este middleware
    req.usuario = decoded.usuario;

    next();
  });

  console.log(token);
};

//verifica adminRole
let verificaAdmin_Token = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.role == "ADMIN_ROLE") {
    next();
  } else {
    return res.status(401).json({
      ok: false,
      err: {
        message: "El usuario no es administrador"
      }
    });
  }
};

module.exports = { verificaToken, verificaAdmin_Token };
