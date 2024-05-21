const db = require("../../../config/DBConnection");

// create organizationSurveyModel
const createOrganizationSurvey = (
  drug_name,
  date,
  drug_size,
  drug_dosage,
  drug_percentage,
  drug_quantity,
  user_id
) => {
  console.log(
    "model",
    drug_name,
    date,
    drug_size,
    drug_dosage,
    drug_percentage,
    drug_quantity,
    user_id
  );
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO app_survey(drug_name,date,drug_size,drug_dosage,drug_percentage,drug_quantity,user_id) VALUES(?,?,?,?,?,?,?)`;
    const values = [
      drug_name,
      date,
      drug_size,
      drug_dosage,
      drug_percentage,
      drug_quantity,
      user_id,
    ];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
};

const getAppSurvey = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT a.*  , u.email , o.first_name, o.last_name ,o.user_id, o.study_enrolled   FROM app_survey As a
    JOIN user As u ON a.user_id = u.user_id
    JOIN organization AS o ON u.user_id = o.user_id;`;
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

// get survey by id
const getSurveyById = (survey_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT a.*  , u.email , o.first_name, o.last_name ,o.user_id, o.study_enrolled   FROM app_survey As a
    JOIN user As u ON a.user_id = u.user_id
    JOIN organization AS o ON u.user_id = o.user_id WHERE app_survey_id = ?;`;
    db.query(query, survey_id, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { createOrganizationSurvey, getAppSurvey, getSurveyById };
