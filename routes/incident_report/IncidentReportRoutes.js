var incidentReportController = require("../../controllers/incident_report/incidentReportController");

var express = require("express");

var router = express.Router();

// Create a new Survey
router.post(
  "/createIncidentReport",
  incidentReportController.createIncidentReport
);

// Get all Surveys Questions
router.get(
  "/getAllIncidentReportsQuestions",
  incidentReportController.getAllIncidentReports
);

// survey response routes
router.post(
  "/createIncidentReportResponse",
  incidentReportController.createIncidentReportResponse
);
// Get all Surveys
router.get(
  "/getAllIncidentReportResponses",
  incidentReportController.getAllIncidentReportResponses
);

// get survey response by user_id
router.get(
  "/getIncidentReportResponseByUserId/:user_id",
  incidentReportController.getIncidentReportResponseByUserId
);

module.exports = router;
