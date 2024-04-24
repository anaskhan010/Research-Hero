import express from 'express';
import patientController from '../../controllers/patient/patientController.js';

const router = express.Router();

router.post("/signin", patientController.signinPatient );

export default router;
