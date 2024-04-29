import db from "../../config/DBConnection.js";

const createSurvey = (survey_id, patient_id, question_id, response_text) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO survey_response (survey_id, patient_id, question_id, response_text) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [survey_id, patient_id, question_id, response_text],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

export default { createSurvey };
