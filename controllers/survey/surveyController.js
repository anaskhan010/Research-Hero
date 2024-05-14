const surveyModel = require("../../models/survey/surveyModel.js");

// create survey controller
const createSurvey = async (req, res) => {
  const survey_title = req.body.survey_title;
  const question_text = req.body.question_text;

  try {
    const result = await surveyModel.createSurvey(survey_title, question_text);
    res
      .status(201)
      .json({ message: "Survey created successfully", survey: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createSurvey: createSurvey,
};
