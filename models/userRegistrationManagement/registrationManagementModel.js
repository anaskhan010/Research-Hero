const db = require("../../config/DBConnection");

// get all user registration details
const getAllAcceptedStatus = async () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT r.* , u.email FROM patient_registration_status AS r JOIN user AS u ON r.user_id = u.user_id WHERE approval_status = "accepted";`;
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};
const getAllPendingStatus = async () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT r.* , u.email FROM patient_registration_status AS r JOIN user AS u ON r.user_id = u.user_id WHERE approval_status = "pending";`;
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

// update user registration status

const updateRegistrationStatus = async (status, id) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE patient_registration_status SET approval_status = ? WHERE registration_status_id = ?;`;
    db.query(query, [status, id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  getAllAcceptedStatus,
  getAllPendingStatus,
  updateRegistrationStatus,
};
