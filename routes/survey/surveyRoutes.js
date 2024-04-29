import surveyController from "../../controllers/survey/surveyController.js";
import surveyResponseController from "../../controllers/survey/surveyResponseController.js";
import express from "express";

const router = express.Router();

// Create a new Survey
router.post("/createSurvey", surveyController.createSurvey);

// survey response routes
router.post(
  "/createSurveyResponse",
  surveyResponseController.createSurveyResponse
);

export default router;
