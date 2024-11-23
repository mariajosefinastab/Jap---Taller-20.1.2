const responseModel = require("../models/responseModel");

const createResponse = async (req, res) => {
  const { userId, surveyId, answer } = req.body;
  const newResponse = await responseModel.createResponse({ userId, surveyId, answer });
  if (newResponse) {
    res.status(201).json(newResponse);
  } else {
    res.status(500).json({ message: "Error registrando respuesta" });
  }
};

const getResponsesBySurvey = async (req, res) => {
  const surveyId = parseInt(req.params.surveyId);
  const responses = await responseModel.getResponsesBySurvey(surveyId);
  res.json(responses);
};

module.exports = {
  createResponse,
  getResponsesBySurvey,
};