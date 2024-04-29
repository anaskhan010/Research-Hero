import surveyModel from "../../models/survey/surveyModel.js";

// create survey controller
const createSurvey = (req, res) => {
  const { survey_title, question_text } = req.body;
  try {
    const result = surveyModel.createSurvey(survey_title, question_text);
    res
      .status(201)
      .json({ message: "Survey created successfully", survey: result });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  createSurvey,
};
