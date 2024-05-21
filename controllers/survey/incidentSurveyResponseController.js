const surveyResponseModel = require("../../models/survey/incidentSurveyResponseModel.js");

const createSurveyResponse = async (req, res) => {
  const survey_id = req.body.survey_id;
  const user_id = req.body.user_id;
  const responses = req.body.responses;

  console.log("req", req.body); // Good for initial debugging

  if (!responses || !Array.isArray(responses)) {
    return res.status(400).json({
      message: "Invalid responses data. It should be a non-empty array.",
    });
  }

  try {
    const results = await Promise.all(
      responses.map((response) => {
        return surveyResponseModel.createSurveyResponse(
          survey_id,
          user_id,
          response.question_id,
          response.response_text
        );
      })
    );
    res.status(201).json({
      message: "Survey Responses created successfully",
      surveys: results,
    });
  } catch (error) {
    console.error("Error creating survey responses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllSurveyResponses = async (req, res) => {
  try {
    const results = await surveyResponseModel.getAllSurveyResponses();
    res.status(200).json({
      message: "Survey Responses retrieved successfully",
      surveys: results,
    });
  } catch (error) {
    console.error("Error getting survey responses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createSurveyResponse: createSurveyResponse,
  getAllSurveyResponses: getAllSurveyResponses,
};
