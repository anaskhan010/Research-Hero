const IncidentReportModel = require("../../models/incident_report/IncidentReportModel");

// create an Incident Report
const createIncidentReport = async (req, res) => {
  const survey_title = req.body.survey_title;
  const question_text = req.body.question_text;

  try {
    const result = await IncidentReportModel.createIncidentReportQuestion(
      survey_title,
      question_text
    );
    res
      .status(201)
      .json({ message: "Survey created successfully", survey: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// create incident report response
const createIncidentReportResponse = async (req, res) => {
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
        return IncidentReportModel.createIncidentReportResponse(
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

// get all incident report responses
const getAllIncidentReportResponses = async (req, res) => {
  try {
    const results = await IncidentReportModel.getAllIncidentReportResponses();
    res.status(200).json({
      message: "Survey Responses retrieved successfully",
      surveys: results,
    });
  } catch (error) {
    console.error("Error getting survey responses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get survey response by user_id
const getIncidentReportResponseByUserId = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const result = await IncidentReportModel.getIncidentReportResponseByUserId(
      user_id
    );
    res.status(200).json({ message: "Survey fetched", result });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createIncidentReport,
  createIncidentReportResponse,
  getAllIncidentReportResponses,
  getIncidentReportResponseByUserId,
};
