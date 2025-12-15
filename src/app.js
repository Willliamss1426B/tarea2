const express = require("express");
const connectDB = require("./db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "App web funcionando" });
});

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    app.listen(3000, () =>
      console.log("Servidor en http://localhost:3000")
    );
  });
}

module.exports = app;
