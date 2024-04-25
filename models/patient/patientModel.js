import db from "../../config/DBConnection.js";

const createPatient = async (
  first_name,
  last_name,
  email,
  hashPassword,
  status,
  gender,
  address,
  contact_number,
  data_of_birth,
  stipend,
  study_enrolled,
  notification,
  note
) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        reject(err);
      }

      const query =
        "INSERT INTO patient (first_name , last_name , email , password , status , gender, address ,contact_number  , date_of_birth , stipend , study_enrolled , notification) VALUES (?,?,?,?,?,?,?,?,?,?,?,? )";

      db.query(
        query,
        [
          first_name,
          last_name,
          email,
          hashPassword,
          status,
          gender,
          address,
          contact_number,
          data_of_birth,
          stipend,
          study_enrolled,
          notification,
        ],
        (err, result) => {
          if (err) {
            return db.rollback(() => {
              reject(err);
            });
          }

          const patientId = result.insertId;
          const selectQuery =
            "SELECT p.*, n.note FROM patient AS p JOIN note as n ON p.patient_id = n.patient_id ";
          db.query(selectQuery, [patientId], (error, rows) => {
            if (error) {
              return db.rollback(() => {
                reject(error);
              });
            }

            const noteQuery =
              "INSERT INTO Note (patient_id, note) VALUES (?, ?)";
            db.query(noteQuery, [patientId, note], (noteErr, noteResult) => {
              if (noteErr) {
                return db.rollback(() => {
                  reject(noteErr);
                });
              }

              db.commit((commitErr) => {
                if (commitErr) {
                  return db.rollback(() => {
                    reject(commitErr);
                  });
                }

                console.log("model row", rows[0]);
                resolve(rows[0]);
              });
            });
          });
        }
      );
    });
  });
};

// const createPatient = async(first_name, last_name, email, hashPassword, status, gender, address, contact_number, data_of_birth, stepend, study_enrolled, notification) => {
//     return new Promise((resolve, reject) => {
//         const query = 'INSERT INTO patient (first_name , last_name , email , password , status , gender, address ,contact_number  , date_of_birth , stepend , study_enrolled , notification) VALUES (?,?,?,?,?,?,?,?,?,?,?,? )';

//         db.query(query, [first_name, last_name, email, hashPassword, status, gender, address, contact_number, data_of_birth, stepend, study_enrolled, notification] , (err, result) => {

//             if(err) {
//                 reject(err);
//             } else {
//                 const selectQuery = 'SELECT * FROM patient WHERE patient_id = ?';
//                 db.query(selectQuery, [result.insertId], (error, rows) => {
//                     if(error) {
//                         reject(error);
//                     } else {
//                         console.log("model row", rows[0]);
//                         resolve(rows[0]);
//                     }
//                });

//             }
//     })
//     });
// };

const signinPatient = (email) => {
  console.log("Model email", email);
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM patient WHERE email = ?`;
    db.query(query, [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

// get all patients
const getAllPatients = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM patient";
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// get patient by id
const getPatientById = (patient_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM patient WHERE patient_id = ?";
    db.query(query, [patient_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

// update patient
const updatePatient = (
  patient_id,
  first_name,
  last_name,
  email,
  hashPassword,
  status,
  gender,
  address,
  contact_number,
  data_of_birth,
  stipend,
  study_enrolled,
  notification
) => {
  console.log(
    "model",
    patient_id,
    first_name,
    last_name,
    email,
    hashPassword,
    status,
    gender,
    address,
    contact_number,
    data_of_birth,
    stipend,
    study_enrolled,
    notification
  );
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE patient SET first_name = ?, last_name = ?, email = ?, password = ?, status=?, gender=?, address = ?, contact_number = ?, date_of_birth = ?, stipend = ?, study_enrolled = ?, notification = ? WHERE patient_id = ?";
    db.query(
      query,
      [
        first_name,
        last_name,
        email,
        hashPassword,
        status,
        gender,
        address,
        contact_number,
        data_of_birth,
        stipend,
        study_enrolled,
        notification,
        patient_id,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          const selectQuery = "SELECT * FROM patient WHERE patient_id = ?";
          db.query(selectQuery, [patient_id], (error, rows) => {
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

// delete patient
const deletePatient = (patient_id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM patient WHERE patient_id = ?";
    db.query(query, [patient_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default {
  createPatient,
  signinPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
