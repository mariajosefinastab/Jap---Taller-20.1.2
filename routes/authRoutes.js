const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");


authRouter.post("/register", authController.registerUser); //registro usuario


authRouter.post("/login", authController.loginUser); //login usuario

module.exports = authRouter;