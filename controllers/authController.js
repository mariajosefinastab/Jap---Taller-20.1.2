const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const SECRET_KEY = "CLAVE_SECRETA";

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await userModel.getUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: "Usuario ya existe" });
  }
  const newUser = await userModel.createUser({ username, password });
  res.status(201).json(newUser);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.getUserByUsername(username);
  if (user && user.password === password) {
    const token = jwt.sign({ userId: user.id, username }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};