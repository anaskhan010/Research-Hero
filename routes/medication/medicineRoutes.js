import express from "express";
import medicineController from "../../controllers/medication/medicineController.js";

const router = express.Router();

router.post("/createMedicine", medicineController.createMedicine);
router.get("/getAllMedication", medicineController.getAllMedication);
router.get("/getMedicationById/:id", medicineController.getMedicationById);
router.put("/updateMedication/:id", medicineController.updateMedication);
router.delete("/deleteMedication/:id", medicineController.deleteMedication);

export default router;
