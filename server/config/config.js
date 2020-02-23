//Port
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//Base de datos
let urlDB;
if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
//   urlDB = "mongodb+srv://sebas:pvj8NTUqdMvsdUxO@cluster0-kivrn.mongodb.net/cafe";
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
