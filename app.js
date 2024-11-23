const express = require("express");
const mariadb = require("mariadb");
const jwt = require("jsonwebtoken");
const app = express();

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "surveydb",
  connectionLimit: 5,
});

const port = 3008;
const SECRET_KEY = "CLAVE_SECRETA";

// Rutas
const authRoutes = require("./routes/authRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const responseRoutes = require("./routes/responseRoutes");

app.use(express.json());

// Middleware de autenticación
app.use("/surveys", (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Token inválido" });
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: "Token necesario" });
  }
});

app.use("/auth", authRoutes);
app.use("/surveys", surveyRoutes);
app.use("/responses", responseRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});