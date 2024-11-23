const surveyModel = require("../models/surveyModel");

const createSurvey = async (req, res) => {
  const { title } = req.body;
  const newSurvey = await surveyModel.createSurvey({ title });
  if (newSurvey) {
    res.status(201).json(newSurvey);
  } else {
    res.status(500).json({ message: "Error creando encuesta" });
  }
};

const getSurveys = async (req, res) => {
  const surveys = await surveyModel.getSurveys();
  res.json(surveys);
};

module.exports = {
  createSurvey,
  getSurveys,
};