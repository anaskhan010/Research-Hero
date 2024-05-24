var db = require("../../config/DBConnection.js");

// create medicine
var createMedicine = function (
  medication_name,
  dosage,
  frequency,
  note,
  user_id
) {
  return new Promise(function (resolve, reject) {
    var query =
      "INSERT INTO patientmedications (medication_name, dosage, frequency, note, user_id) VALUES (?,?,?,?,?)";
    db.query(
      query,
      [medication_name, dosage, frequency, note, user_id],
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// get All medication
var getAllMedication = function () {
  return new Promise(function (resolve, reject) {
    var query =
      "SELECT  m.medication_id , u.user_id, m.medication_name, m.dosage, m.frequency, m.note, o.study_enrolled, o.status FROM patientmedications AS m JOIN user AS u ON m.user_id = u.user_id JOIN organization AS o ON u.user_id = o.user_id";
    db.query(query, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// get medication by id
var getMedicationById = function (id) {
  return new Promise(function (resolve, reject) {
    var query =
      "SELECT m.medication_id, m.medication_name, m.dosage, m.frequency, m.note,o.date_of_birth, o.gender,o.stipend,o.first_name,o.address,o.contact_number, o.study_enrolled, o.status , u.email  FROM patientmedications AS m JOIN user AS u ON m.user_id = u.user_id JOIN organization AS o ON u.user_id = o.user_id WHERE m.medication_id = ?";
    db.query(query, [id], function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result[0]);
      }
    });
  });
};

// get medication by user id
var getMedicationByUserId = function (id) {
  return new Promise(function (resolve, reject) {
    var query = `
      SELECT m.medication_id, m.medication_name, m.dosage, m.frequency, m.note
      FROM patientmedications AS m
      WHERE m.user_id = ?
      `;
    db.query(query, [id], function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
// update medication
var updateMedication = function (id, medication_name, dosage, frequency, note) {
  return new Promise(function (resolve, reject) {
    var query =
      "UPDATE patientmedications SET medication_name = ?, dosage = ?, frequency = ?, note = ? WHERE medication_id = ?";
    db.query(
      query,
      [medication_name, dosage, frequency, note, id],
      function (error, result) {
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
var deleteMedication = function (id) {
  return new Promise(function (resolve, reject) {
    var query = "DELETE FROM patientmedications WHERE medication_id = ?";
    db.query(query, [id], function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  createMedicine: createMedicine,
  getAllMedication: getAllMedication,
  getMedicationById: getMedicationById,
  getMedicationByUserId: getMedicationByUserId,
  updateMedication: updateMedication,
  deleteMedication: deleteMedication,
};
