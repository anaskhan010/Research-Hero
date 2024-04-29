import surveyResponseModel from "../../models/survey/surveyResponseModel.js";

const createSurveyResponse = async (req, res) => {
  const { survey_id, patient_id, responses } = req.body;
  console.log("req", req.body); // Good for initial debugging

  if (!responses || !Array.isArray(responses)) {
    return res.status(400).json({
      message: "Invalid responses data. It should be a non-empty array.",
    });
  }

  try {
    const results = await Promise.all(
      responses.map((response) =>
        surveyResponseModel.createSurvey(
          survey_id,
          patient_id,
          response.question_id,
          response.response_text
        )
      )
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

export default {
  createSurveyResponse,
};
