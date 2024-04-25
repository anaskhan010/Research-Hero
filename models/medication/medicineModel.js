import db from "../../config/DBConnection.js";

// create medicine model

const createMedicine = (
  medication_name,
  dosage,
  frequency,
  note_id,
  patient_id
) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO patientmedications (medication_name,	dosage,	frequency,	note_id	,patient_id) VALUES (?,?,?,?,?)`;
    db.query(
      query,
      [medication_name, dosage, frequency, note_id, patient_id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          const selectQuery =
            "SELECT * FROM patientmedications WHERE medication_id = ?";
          db.query(selectQuery, [result.insertId], (error, rows) => {
            if (error) {
              reject(error);
            } else {
              console.log("model row", rows[0]);
              resolve(rows[0]);
            }
          });
        }
      }
    );
  });
};

// get All medication
const getAllMedication = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT p.patient_id , m.medication_name , m.dosage ,m.frequency,  p.study_enrolled, p.status, n.note  FROM patientmedications AS m 
    JOIN patient AS p ON m.patient_id = p.patient_id
    JOIN note AS n ON m.note_id = n.note_id`;
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// get All medication by id
const getMedicationById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT p.patient_id , m.medication_name , m.dosage ,m.frequency,  p.study_enrolled, p.status, n.note  FROM patientmedications AS m 
    JOIN patient AS p ON m.patient_id = p.patient_id
    JOIN note AS n ON m.note_id = n.note_id WHERE m.patient_id = ?`;
    db.query(query, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// update medication
const updateMedication = (id, medication_name, dosage, frequency) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE patientmedications SET medication_name = ?, dosage = ?, frequency = ? WHERE patient_id = ?`;
    db.query(
      query,
      [medication_name, dosage, frequency, id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// delete medication
const deleteMedication = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM patientmedications WHERE medication_id = ?`;
    db.query(query, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export default {
  createMedicine,
  getAllMedication,
  getMedicationById,
  updateMedication,
  deleteMedication,
};
