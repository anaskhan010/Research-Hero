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
  const survey_id = req.params.survey_id;
  try {
    const result = await organizationSurveyModel.getSurveyById(survey_id);
    res.status(200).json({ message: "Survey fetched", result });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrganizationSurveyController,
  getAppSurveyController,
  getSurveyByIdController,
};
