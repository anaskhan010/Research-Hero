const db = require("../../config/DBConnection.js");

const createSurveyResponse = (
  survey_id,
  user_id,
  question_id,
  response_text
) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO survey_response (survey_id, user_id, question_id, response_text) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [survey_id, user_id, question_id, response_text],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

const getAllSurveyResponses = () => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT res.response_text, u.email, sur.survey_title, sur.survey_id, q.question_text, res.user_id
    FROM survey_response AS res
    JOIN organization AS o ON res.user_id = o.user_id
    JOIN user AS u ON o.user_id = u.user_id
    JOIN survey AS sur ON res.survey_id = sur.survey_id
    JOIN survey_question AS q ON res.question_id = q.question_id
    `;
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = {
  createSurveyResponse: createSurveyResponse,
  getAllSurveyResponses: getAllSurveyResponses,
};
