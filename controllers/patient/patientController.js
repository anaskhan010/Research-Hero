import patientModel from '../../models/patient/patientModel.js';
import bcrypt from "bcrypt";
import { authMiddleware } from '../../middleware/authMiddleware.js';

const createPatient = async (req, res) => {
    const { first_name, last_name, email, password, status, gender, address, contact_number, data_of_birth, stipend, study_enrolled, notification,note } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    try {
        const result = await patientModel.createPatient(first_name, last_name, email, hashPassword , status, gender, address, contact_number, data_of_birth, stipend, study_enrolled, notification,note );
        res.status(200).json({status: true, message: 'Patient Created Successfully', patient: result});
    } catch (error) {
        res.status(500).json({status: false, message: 'Internal Server Error',  error});
        
    }   
};

// signin pateint
const signinPatient = async (req, res) => {
    const { email, password } = req.body;
    console.log("req body", req.body);
    try {
        const patient = await patientModel.signinPatient(email);
        if(!patient) {
            res.status(400).json({status: false, message: 'Patient Not Found'});
        }
        const isMatch = await bcrypt.compare(password, patient.password);
        if(!isMatch) {
            res.status(400).json({status: false, message: 'Invalid Email or  Password'});
            return;
        }else{
            const token = authMiddleware(patient);
            res.cookie('token', token);
            req.session.patient = {
                patient_id: patient.patient_id,
                email: patient.email
            };
            console.log("controller patient", patient);
            res.json({status: true, message: 'Patient Signin Successfully', patient: patient, token: token});
        }
    } catch (error) {
        res.status(500).json({status: false, message: 'Internal Server Error', error});
    }
};


// get all patientS
const getAllPatients = async (req, res) => {
    try {
        const patients = await patientModel.getAllPatients();
        res.status(200).json({status: true, message: 'All Patients', patients});
    } catch (error) {
        res.status(500).json({status: false, message: 'Internal Server Error', error});
    }
};

// get patient by id
const getPatientById = async (req, res) => {
    const patient_id = req.params.id;
    try {
        const patient = await patientModel.getPatientById(patient_id);
        res.status(200).json({status: true, message: 'Patient', patient});
    } catch (error) {
        res.status(500).json({status: false, message: 'Internal Server Error', error});
    }
};

// update patient
const updatePatient = async (req, res) => {
    const patient_id = req.params.id;
   
    const { first_name, last_name, email, password, status, gender, address, contact_number, data_of_birth, stipend, study_enrolled, notification } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    try {
        const patient = await patientModel.updatePatient(patient_id, first_name, last_name, email, hashPassword, status, gender , address, contact_number, data_of_birth, stipend, study_enrolled, notification);
        res.status(200).json({status: true, message: 'Patient Updated Successfully', patient: patient});
    }
    catch (error) {
        res.status(500).json({status: false, message: 'Internal Server Error', error});
    }
}

// delete patient
const deletePatient = async (req, res) => {
    const patient_id = req.params.id;
    try { 
        const result = await patientModel.deletePatient(patient_id);
        res.status(200).json({status: true, message: 'Patient Deleted Successfully'});
    } catch (error) {
        res.status(500).json({status: false, message: 'Internal Server Error', error});
    }
}




export default {
    createPatient,
    signinPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient  
};