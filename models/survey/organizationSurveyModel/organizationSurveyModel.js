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
    const query = `SELECT a.*, u.email, o.first_name, o.last_name, o.study_enrolled
    FROM app_survey AS a
    JOIN (
        SELECT user_id, MAX(date) AS latest_survey_date
        FROM app_survey
        GROUP BY user_id
    ) AS latest_survey ON a.user_id = latest_survey.user_id AND a.date = latest_survey.latest_survey_date
    JOIN user AS u ON a.user_id = u.user_id
    JOIN organization AS o ON u.user_id = o.user_id;
    `;
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

// get survey by id
const getSurveyById = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT a.*, u.email, o.first_name, o.last_name, o.study_enrolled
    FROM app_survey AS a
    JOIN user AS u ON a.user_id = u.user_id
    JOIN organization AS o ON u.user_id = o.user_id
    WHERE a.user_id = ?`;
    db.query(query, user_id, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

// ===================================App Survey Questions==================================

// create APP survey Muiltple questions
const createAppSurvey = (user_id, app_survey_questions) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO app_survey_questions(user_id, app_survey_question) VALUES ?`;
    const values = app_survey_questions.map((question) => [user_id, question]);

    db.query(query, [values], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

//==================================END OF App Survey Questions==================================

module.exports = {
  createOrganizationSurvey,
  getAppSurvey,
  getSurveyById,
  createAppSurvey,
};
