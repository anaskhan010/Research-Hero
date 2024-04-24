import express from 'express';
import patientController from '../../controllers/patient/patientController.js';

const router = express.Router();

router.post("/createPatient", patientController.createPatient);
router.get("/getAllPatients", patientController.getAllPatients);
router.get("/getPatientById/:id", patientController.getPatientById);
router.put("/updatePatient/:id", patientController.updatePatient);
router.delete("/deletePatient/:id", patientController.deletePatient);

export default router;
