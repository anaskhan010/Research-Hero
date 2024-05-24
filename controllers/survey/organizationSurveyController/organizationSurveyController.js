const organizationSurveyModel = require("../../../models/survey/organizationSurveyModel/organizationSurveyModel");

// create organizationSurveyController
const createOrganizationSurveyController = async (req, res) => {
  const {
    drug_name,
    date,
    drug_size,
    drug_dosage,
    drug_percentage,
    drug_quantity,
    user_id,
  } = req.body;

  try {
    const result = await organizationSurveyModel.createOrganizationSurvey(
      drug_name,
      date,
      drug_size,
      drug_dosage,
      drug_percentage,
      drug_quantity,
      user_id
    );
    res
      .status(200)
      .json({ message: "Organization survey created successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// get organizationSurveyController
const getAppSurveyController = async (req, res) => {
  try {
    const result = await organizationSurveyModel.getAppSurvey();
    res.status(200).json({ message: "Organization survey fetched", result });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// get survey controller by id
const getSurveyByIdController = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const result = await organizationSurveyModel.getSurveyById(user_id);
    res.status(200).json({ message: "Survey fetched", result });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===================================App Survey Questions==================================
// create APP survey Muiltple question
const createAppSurveyQuestions = async (req, res) => {
  const { user_id, app_survey_questions } = req.body;

  if (
    !user_id ||
    !Array.isArray(app_survey_questions) ||
    app_survey_questions.length === 0
  ) {
    return res.status(400).json({
      message: "Missing required fields: user_id or app_survey_questions",
    });
  }
  try {
    const result = await organizationSurveyModel.createAppSurvey(
      user_id,
      app_survey_questions
    );
    res.status(200).json({ message: "App survey created", result });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

//==================================END OF App Survey Questions==================================

module.exports = {
  createOrganizationSurveyController,
  getAppSurveyController,
  getSurveyByIdController,
  createAppSurveyQuestions,
};
