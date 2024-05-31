var express = require("express");
var organizationController = require("../../controllers/organization/organizationController");

var router = express.Router();

router.post("/createOrganization", organizationController.createOrganization);
router.get("/getAllOrganizations", organizationController.getAllOrganizations);
router.get(
  "/getOrganizationById/:id",
  organizationController.getOrganizationById
);
router.put(
  "/updateOrganization/:id",
  organizationController.updateOrganization
);
router.delete(
  "/deleteOrganization/:id",
  organizationController.deleteOrganization
);

// =============================organization details  Routes============================

router.post(
  "/createOrganizationDetails",
  organizationController.createOrganizationDetails
);
router.get(
  "/getAllOrganizationsDetails",
  organizationController.getAllOrganizationsDetails
);

module.exports = router;
