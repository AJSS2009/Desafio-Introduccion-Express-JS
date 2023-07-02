const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.listen(
  3000,
  console.log(`SERVIDOR EN FUNCIONAMIENTO EN EL PUERTO: ${port}`)
);

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
  const leerCancion = JSON.parse(fs.readFileSync("canciones.json"));
  res.json(leerCancion);
});

//AGREGAR CANCIONES
app.post("/canciones", (req, res) => {
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("canciones.json", "utf8"));
  canciones.push(cancion);
  fs.writeFileSync("canciones.json", JSON.stringify(canciones));
  res.send("Canción agregada)");
});

//BORRAR CANCIONES
app.delete("/canciones/:id", (req, res) => {
  const repertorio = JSON.parse(fs.readFileSync("./canciones.json", "utf-8"));
  const id = parseInt(req.params.id);
  const cancionIndex = repertorio.findIndex((c) => c.id === id);
  if (cancionIndex !== -1) {
    repertorio.splice(cancionIndex, 1);
    fs.writeFileSync("./canciones.json", JSON.stringify(repertorio));
    res.send("Canción eliminada");
  }
});

// EDITAR CANCIONES
app.put("/canciones/:id", (req, res) => {
  const repertorio = JSON.parse(fs.readFileSync("./canciones.json", "utf-8"));
  const cancionActualizada = req.body;
  const id = parseInt(req.params.id);
  const cancionIndex = repertorio.findIndex((c) => c.id === id);
  if (cancionIndex !== -1) {
    cancionActualizada.id = id;
    repertorio[cancionIndex] = cancionActualizada;
    fs.writeFileSync("./canciones.json", JSON.stringify(repertorio));
    res.send(cancionActualizada);
  }
});
