const express = require("express");
const connectDB = require("./db");
const User = require("./models/user");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "App web funcionando" });
});

// FORMULARIO WEB
app.get("/form", (req, res) => {
  res.send(`
    <h2>Registrar Usuario</h2>
    <form method="POST" action="/users">
      <input type="text" name="nombre" placeholder="Nombre" required />
      <br/><br/>
      <input type="email" name="email" placeholder="Email" required />
      <br/><br/>
      <button type="submit">Guardar</button>
    </form>
    <br/>
    <a href="/users">Ver usuarios</a>
  `);
});

// Guardar en BD (POST)
app.post("/users", async (req, res) => {
  const user = new User({
    nombre: req.body.nombre,
    email: req.body.email
  });

  await user.save();
  res.redirect("/users");
});

// Ver usuarios (GET)
app.get("/users", async (req, res) => {
  const users = await User.find();

  let html = "<h2>Usuarios Registrados</h2><ul>";
  users.forEach(u => {
    html += `<li>${u.nombre} - ${u.email}</li>`;
  });
  html += "</ul><br/><a href='/form'>Volver</a>";

  res.send(html);
});

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    app.listen(3000, () => {
      console.log("Servidor en http://localhost:3000");
    });
  });
}

module.exports = app;
