const db = require("../../config/DBConnection.js");

const createSurvey = (survey_title, question_text) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((error) => {
      if (error) {
        reject(error);
      }

      const surveyQuery = "INSERT INTO survey (survey_title) VALUES (?)";
      db.query(surveyQuery, [survey_title], (error, surveyResult) => {
        if (error) {
          db.rollback(() => {
            reject(error);
          });
        }

        const surveyId = surveyResult.insertId;
        const questionValues = question_text.map((question) => {
          return [surveyId, question];
        });

        const questionQuery =
          "INSERT INTO survey_question (survey_id, question_text) VALUES ?";
        db.query(questionQuery, [questionValues], (error, questionResult) => {
          if (error) {
            db.rollback(() => {
              reject(error);
            });
          }

          db.commit((error) => {
            if (error) {
              db.rollback(() => {
                reject(error);
              });
            }

            resolve(questionResult);
          });
        });
      });
    });
  });
};

// get survey by survey_id
const getSurveyById = (survey_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM survey WHERE survey_id = ?`;
    db.query(query, [survey_id], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = {
  createSurvey: createSurvey,
};
