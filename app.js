const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
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