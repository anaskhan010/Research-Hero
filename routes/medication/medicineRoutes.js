var express = require("express");
var medicineController = require("../../controllers/medication/medicineController.js");

var router = express.Router();

router.post("/createMedicine", medicineController.createMedicine);
router.get("/getAllMedication", medicineController.getAllMedication);
router.get("/getMedicationById/:id", medicineController.getMedicationById);
router.put(
  "/updateMedication/:medication_id",
  medicineController.updateMedication
);
router.delete("/deleteMedication/:id", medicineController.deleteMedication);

module.exports = router;
