const express = require("express");
const responseRouter = express.Router();
const responseController = require("../controllers/responseController");


responseRouter.post("/", responseController.createResponse); //registra nueva encuensta


responseRouter.get("/:surveyId", responseController.getResponsesBySurvey); //obtiene respuestas de una encuesta

module.exports = responseRouter;
