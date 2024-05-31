const express = require("express");
const registrationManagementController = require("../../controllers/userRegistrationManagement/registrationManagementController");

const router = express.Router();

router.get("/accepted", registrationManagementController.getAllAcceptedStatus);
router.get("/pending", registrationManagementController.getAllPendingStatus);
router.put(
  "/updateStatus/:id",
  registrationManagementController.updateRegistrationStatus
);

module.exports = router;
