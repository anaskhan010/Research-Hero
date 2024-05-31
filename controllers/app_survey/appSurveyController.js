const {
  createSurveyQuestions,
  getSurveyQuestions,
  submitSurveyResponse,
  getSurveyDetails,
  getAllSurveys,
  getSurveysByUserId,
} = require("../../models/app_survey/appSurveyModel");

// Get all surveys with details
const getAllSurveysController = async (req, res) => {
  try {
    const surveys = await getAllSurveys();
    res.status(200).json(surveys);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Get all surveys by user_id with details
const getSurveysByUserIdController = async (req, res) => {
  const { user_id } = req.params;

  try {
    const surveys = await getSurveysByUserId(user_id);
    res.status(200).json(surveys);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Get survey details for a user
const getSurveyDetailsController = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const surveyDetails = await getSurveyDetails(user_id);
    res.status(200).json(surveyDetails);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Create survey questions with options
const createSurveyQuestionsController = async (req, res) => {
  const { questions } = req.body;

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const result = await createSurveyQuestions(questions);
    res.status(201).json({
      message: "Survey questions created successfully",
      result,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Get all questions with options
const getSurveyQuestionsController = async (req, res) => {
  try {
    const questions = await getSurveyQuestions();
    res.status(200).json(questions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Submit survey response
const submitSurveyResponseController = async (req, res) => {
  const { user_id, survey_responses, survey_details } = req.body;

  if (
    !user_id ||
    !Array.isArray(survey_responses) ||
    survey_responses.length === 0 ||
    !Array.isArray(survey_details) ||
    survey_details.length === 0
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const result = await submitSurveyResponse(
      user_id,
      survey_responses,
      survey_details
    );
    res
      .status(201)
      .json({ message: "Survey response submitted successfully", result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

module.exports = {
  createSurveyQuestionsController,
  getSurveyQuestionsController,
  submitSurveyResponseController,
  getSurveyDetailsController,
  getAllSurveysController,
  getSurveysByUserIdController,
};
