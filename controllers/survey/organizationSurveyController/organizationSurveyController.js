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

module.exports = {
  createOrganizationSurveyController,
  getAppSurveyController,
};
