const express = require("express");
const path = require("path");
const fs = require("fs");
const front = require("./js/front.js");
var data = require("./data/data.json");
const bodyParser = require('body-parser');


const PORT = 80;
const app = express();

const PASS_BORRADO = "1234"

app.use(
  "/css",
  express.static(path.join(__dirname + "/node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname + "/node_modules/bootstrap/dist/js"))
);
app.use("/js", express.static(path.join(__dirname + "/js")));
app.use("/data", express.static(path.join(__dirname + "/data")));
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.get("/hola", function (req, res) {
  res.send("Hola!");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/html/index.html");
  console.log("Se ha conectado alguien " + req.ip);
});

app.get("/add/:temperatura", function (req, res) {
  const temperatura = parseFloat(req.params.temperatura);

  if (isNaN(temperatura)) {
    res.status(400).send("El parámetro 'temperatura' no es un número válido");
  } else {
    try {
      addData(temperatura);
      res.status(200).sendFile(path.join(__dirname, "/html/index.html"));
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
});

app.post("/add/:temperatura", function (req, res) {
  const temperatura = parseFloat(req.params.temperatura);

  if (isNaN(temperatura)) {
    res.status(400).send("El parámetro 'temperatura' no es un número válido");
  } else {
    try {
      addData(temperatura);
      res.status(200).sendFile(path.join(__dirname, "/html/index.html"));
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
});




app.get("/borrar", function (req, res) {
  res.sendFile(__dirname + "/html/borrar.html");
});

app.post("/borrar/confirm", function (req, res) {
  console.log("Peticion post borrar procesada");
  
  if(req.body.pass === PASS_BORRADO){
  vaciarData();
  res.status(200).sendFile(__dirname + "/html/index.html");
  }else{
    res.status(401).send("Contraseña incorrecta");
  }
  
});


app.use(function (req, res) {
  res.status(400).sendFile(__dirname + "/html/not_found.html");
});

app.listen(PORT);
console.log(`Server iniciado en el puerto ${PORT}`);
module.exports = app;

function addData(dato) {
  const entrada = {
    fecha: front.ahora(),
    temperatura: dato,
  };

  data.push(entrada);
  fs.writeFile("./data/data.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log("Error al añadir una nueva entrada", err);
    } else {
      console.log("Se ha añadido una nueva entrada");
    }
  });
}

function vaciarData() {
  fs.createReadStream("./data/vacio.json").pipe(
    fs.createWriteStream("./data/data.json")
  );
  while (data.length > 0) data.pop();
}

