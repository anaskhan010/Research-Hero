const db = require("../../config/DBConnection.js");

const createIncidentReportQuestion = (survey_title, question_text) => {
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

// get all incident reports Questions
const getAllIncidentReports = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT sur.* , s.survey_title FROM survey_question AS sur
    JOIN survey AS s ON sur.survey_id = s.survey_id`;
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

// get survey by survey_id
const getIncidentReportById = (survey_id) => {
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

const createIncidentReportResponse = (
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

const getAllIncidentReportResponses = () => {
  return new Promise((resolve, reject) => {
    const query = `
    WITH LatestResponses AS (
      SELECT
          res.user_id,
          MAX(res.response_id) AS latest_response_id
      FROM
          survey_response AS res
      GROUP BY
          res.user_id
  )
  SELECT
      res.response_text,
      u.email,
      o.first_name,
      o.last_name,
      o.study_enrolled,
      sur.survey_title,
      sur.survey_id,
      q.question_text,
      res.user_id
  FROM
      survey_response AS res
      JOIN LatestResponses lr ON res.response_id = lr.latest_response_id
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

// get survey response by user_id
const getIncidentReportResponseByUserId = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT res.response_text, u.email,o.first_name,
    o.last_name,
    o.study_enrolled, sur.survey_title, sur.survey_id, q.question_text, res.user_id
    FROM survey_response AS res
    JOIN organization AS o ON res.user_id = o.user_id
    JOIN user AS u ON o.user_id = u.user_id
    JOIN survey AS sur ON res.survey_id = sur.survey_id
    JOIN survey_question AS q ON res.question_id = q.question_id
    WHERE res.user_id = ?
    `;
    db.query(query, [user_id], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = {
  createIncidentReportQuestion,
  getAllIncidentReports,
  getIncidentReportById,
  createIncidentReportResponse,
  getIncidentReportResponseByUserId,
  getAllIncidentReportResponses,
};
