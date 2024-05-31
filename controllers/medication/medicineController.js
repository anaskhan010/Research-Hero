var medicineModel = require("../../models/medication/medicineModel.js");

// create medicine
var createMedicine = async function (req, res) {
  var { medication_name, dosage, frequency, note, user_id } = req.body;

  try {
    var result = await medicineModel.createMedicine(
      medication_name,
      dosage,
      frequency,
      note,
      user_id
    );
    res
      .status(201)
      .json({ message: "Medicine created successfully", medicine: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all medication
var getAllMedication = async function (req, res) {
  try {
    var result = await medicineModel.getAllMedication();
    res.status(200).json({ medication: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get medication by id
var getMedicationById = async function (req, res) {
  var id = req.params.id;
  try {
    var result = await medicineModel.getMedicationById(id);
    res.status(200).json({ medication: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET medication by user id
var getMedicationByUserId = async function (req, res) {
  var id = req.params.id;
  try {
    var result = await medicineModel.getMedicationByUserId(id);
    res.status(200).json({ medication: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update medication
var updateMedication = async function (req, res) {
  var id = req.params.medication_id;
  var _req$body2 = req.body,
    medication_name = _req$body2.medication_name,
    dosage = _req$body2.dosage,
    frequency = _req$body2.frequency,
    note = _req$body2.note;

  try {
    var result = await medicineModel.updateMedication(
      id,
      medication_name,
      dosage,
      frequency,
      note
    );
    res.status(200).json({ message: "Medication updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// delete medication
var deleteMedication = async function (req, res) {
  var id = req.params.id;
  try {
    var result = await medicineModel.deleteMedication(id);
    res.status(200).json({ message: "Medication deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMedicine: createMedicine,
  getAllMedication: getAllMedication,
  getMedicationById: getMedicationById,
  getMedicationByUserId: getMedicationByUserId,
  updateMedication: updateMedication,
  deleteMedication: deleteMedication,
};
