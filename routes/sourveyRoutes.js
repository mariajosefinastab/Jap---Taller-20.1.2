const express = require("express");
const surveyRouter = express.Router();
const surveyController = require("../controllers/surveyController");


surveyRouter.post("/", surveyController.createSurvey); //crea encuesta


surveyRouter.get("/", surveyController.getSurveys); //obtiee todas las encuestas

module.exports = surveyRouter;