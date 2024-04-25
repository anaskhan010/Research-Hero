import medicineModel from "../../models/medication/medicineModel.js";

// create medicine
const createMedicine = async (req, res) => {
  const { medication_name, dosage, frequency, note_id, patient_id } = req.body;

  try {
    const result = await medicineModel.createMedicine(
      medication_name,
      dosage,
      frequency,
      note_id,
      patient_id
    );
    res
      .status(201)
      .json({ message: "Medicine created successfully", medicine: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all medication
const getAllMedication = async (req, res) => {
  try {
    const result = await medicineModel.getAllMedication();
    res.status(200).json({ medication: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get medication by id
const getMedicationById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await medicineModel.getMedicationById(id);
    res.status(200).json({ medication: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update medication
const updateMedication = async (req, res) => {
  const id = req.params.id;
  const { medication_name, dosage, frequency, note_id, patient_id } = req.body;
  try {
    const result = await medicineModel.updateMedication(
      medication_name,
      dosage,
      frequency,
      note_id,
      patient_id,
      id
    );
    res.status(200).json({ message: "Medication updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete medication
const deleteMedication = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await medicineModel.deleteMedication(id);
    res.status(200).json({ message: "Medication deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createMedicine,
  getAllMedication,
  getMedicationById,
  updateMedication,
  deleteMedication,
};
