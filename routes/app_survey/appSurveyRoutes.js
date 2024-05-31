const express = require("express");
const router = express.Router();
// app survey controller
const {
  createSurveyQuestionsController,
  getSurveyQuestionsController,
  submitSurveyResponseController,
  getSurveyDetailsController,
  getAllSurveysController,
  getSurveysByUserIdController,
} = require("../../controllers/app_survey/appSurveyController");

router.get("/getAllSurveys", getAllSurveysController);
router.get("/getSurveysByUserId/:user_id", getSurveysByUserIdController);
router.get("/getSurveyDetails/:user_id", getSurveyDetailsController);

router.post("/createSurveyQuestion", createSurveyQuestionsController);
router.get("/getSurveyQuestions/:survey_id", getSurveyQuestionsController);
router.post("/submitSurveyResponse", submitSurveyResponseController);

module.exports = router;
