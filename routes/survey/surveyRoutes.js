var surveyController = require("../../controllers/survey/incidentSurveyController.js");
var surveyResponseController = require("../../controllers/survey/incidentSurveyResponseController.js");

var organizationSurveyController = require("../../controllers/survey/organizationSurveyController/organizationSurveyController.js");

var express = require("express");

var router = express.Router();

// Create a new Survey
router.post("/createSurvey", surveyController.createSurvey);

// survey response routes
router.post(
  "/createSurveyResponse",
  surveyResponseController.createSurveyResponse
);
// Get all Surveys
router.get(
  "/getAllSurveyResponses",
  surveyResponseController.getAllSurveyResponses
);

// get survey response by user_id
router.get(
  "/getSurveyResponseByUserId/:user_id",
  surveyResponseController.getSurveyResponseByUserId
);

// =================== APP patient survey routes============================
router.post(
  "/createAppPatientSurvey",
  organizationSurveyController.createOrganizationSurveyController
);

router.get(
  "/getAppPatientSurvey",
  organizationSurveyController.getAppSurveyController
);

router.get(
  "/getAppPatientSurveyById/:user_id",
  organizationSurveyController.getSurveyByIdController
);

// =================== APP patient survey routes============================

router.post(
  "/createAppSurveyQuestion",
  organizationSurveyController.createAppSurveyQuestions
);

module.exports = router;
