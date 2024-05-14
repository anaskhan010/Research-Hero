var surveyController = require("../../controllers/survey/surveyController.js");
var surveyResponseController = require("../../controllers/survey/surveyResponseController.js");

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

// APP patient survey routes
router.post(
  "/createAppPatientSurvey",
  organizationSurveyController.createOrganizationSurveyController
);

router.get(
  "/getAppPatientSurvey",
  organizationSurveyController.getAppSurveyController
);

module.exports = router;
