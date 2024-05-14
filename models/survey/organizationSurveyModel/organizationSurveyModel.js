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
    const query = `SELECT * FROM app_survey`;
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { createOrganizationSurvey, getAppSurvey };
