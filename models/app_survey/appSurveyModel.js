const db = require("../../config/DBConnection");

// Get all surveys with details including user and organization information
const getAllSurveys = () => {
  return new Promise((resolve, reject) => {
    const query = `
    WITH CTE AS (
      SELECT 
          s.app_survey_id, s.drug_name, s.date, s.drug_size, s.drug_dosage, s.drug_percentage, s.drug_quantity, s.user_id,
          q.app_survey_question, r.app_survey_response,
          u.email, o.first_name, o.last_name, o.status, o.gender, o.address, o.contact_number, o.date_of_birth, o.stipend, o.study_enrolled,
          o.organization_detail_id, o.organization_id, o.notification,
          ROW_NUMBER() OVER (PARTITION BY s.user_id ORDER BY s.date DESC) AS rn
      FROM 
          app_survey s
      LEFT JOIN 
          app_survey_question_responses r ON s.user_id = r.user_id
      LEFT JOIN 
          app_survey_questions q ON r.app_survey_question_id = q.app_survey_question_id
      LEFT JOIN 
          user u ON s.user_id = u.user_id
      LEFT JOIN 
          organization o ON u.user_id = o.user_id
  )
  SELECT
      app_survey_id, drug_name, date, drug_size, drug_dosage, drug_percentage, drug_quantity, user_id,
      app_survey_question, app_survey_response,
      email, first_name, last_name, status, gender, address, contact_number, date_of_birth, stipend, study_enrolled,
      organization_detail_id, organization_id, notification
  FROM 
      CTE
  WHERE 
      rn = 1;
  ;
    `;
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }

      const surveys = {};
      results.forEach((row) => {
        const surveyId = row.app_survey_id;
        if (!surveys[surveyId]) {
          surveys[surveyId] = {
            survey_id: surveyId,
            drug_name: row.drug_name,
            date: row.date,
            drug_size: row.drug_size,
            drug_dosage: row.drug_dosage,
            drug_percentage: row.drug_percentage,
            drug_quantity: row.drug_quantity,
            user: {
              user_id: row.user_id,
              email: row.email,
              first_name: row.first_name,
              last_name: row.last_name,
              status: row.status,
              gender: row.gender,
              address: row.address,
              contact_number: row.contact_number,
              date_of_birth: row.date_of_birth,
              stipend: row.stipend,
              study_enrolled: row.study_enrolled,
            },
            organization: {
              organization_id: row.organization_id,
              organization_detail_id: row.organization_detail_id,
              notification: row.notification,
            },
            questions: [],
          };
        }
        if (row.app_survey_question && row.app_survey_response) {
          surveys[surveyId].questions.push({
            question: row.app_survey_question,
            response: row.app_survey_response,
          });
        }
      });

      resolve(Object.values(surveys));
    });
  });
};

// Get survey details for a user
const getSurveyDetails = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT q.app_survey_question, r.app_survey_response, s.drug_name, s.date, s.drug_size, s.drug_dosage, s.drug_percentage, s.drug_quantity
        FROM app_survey_questions q
        LEFT JOIN app_survey_question_responses r ON q.app_survey_question_id = r.app_survey_question_id
        LEFT JOIN app_survey s ON r.user_id = s.user_id
        WHERE r.user_id = ?
      `;
    db.query(query, [userId], (err, results) => {
      if (err) {
        return reject(err);
      }

      const surveyDetails = {};
      results.forEach((row) => {
        const drugName = row.drug_name;
        if (!surveyDetails[drugName]) {
          surveyDetails[drugName] = {
            drug_name: drugName,
            date: row.date,
            drug_size: row.drug_size,
            drug_dosage: row.drug_dosage,
            drug_percentage: row.drug_percentage,
            drug_quantity: row.drug_quantity,
            questions: [],
          };
        }
        surveyDetails[drugName].questions.push({
          question: row.app_survey_question,
          response: row.app_survey_response,
        });
      });

      resolve(Object.values(surveyDetails));
    });
  });
};

// Get all surveys by user_id with details including user and organization information
const getSurveysByUserId = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT s.app_survey_id, s.drug_name, s.date, s.drug_size, s.drug_dosage, s.drug_percentage, s.drug_quantity, s.user_id,
             q.app_survey_question, r.app_survey_response,
             u.email, o.first_name, o.last_name, o.status, o.gender, o.address, o.contact_number, o.date_of_birth, o.stipend, o.study_enrolled,
             o.organization_detail_id, o.organization_id, o.notification
      FROM app_survey s
      LEFT JOIN app_survey_question_responses r ON s.user_id = r.user_id
      LEFT JOIN app_survey_questions q ON r.app_survey_question_id = q.app_survey_question_id
      LEFT JOIN user u ON s.user_id = u.user_id
      LEFT JOIN organization o ON u.user_id = o.user_id
      WHERE s.user_id = ?
    `;
    db.query(query, [user_id], (err, results) => {
      if (err) {
        return reject(err);
      }

      const surveys = {};
      results.forEach((row) => {
        const surveyId = row.app_survey_id;
        if (!surveys[surveyId]) {
          surveys[surveyId] = {
            survey_id: surveyId,
            drug_name: row.drug_name,
            date: row.date,
            drug_size: row.drug_size,
            drug_dosage: row.drug_dosage,
            drug_percentage: row.drug_percentage,
            drug_quantity: row.drug_quantity,
            user: {
              user_id: row.user_id,
              email: row.email,
              first_name: row.first_name,
              last_name: row.last_name,
              status: row.status,
              gender: row.gender,
              address: row.address,
              contact_number: row.contact_number,
              date_of_birth: row.date_of_birth,
              stipend: row.stipend,
              study_enrolled: row.study_enrolled,
            },
            organization: {
              organization_id: row.organization_id,
              organization_detail_id: row.organization_detail_id,
              notification: row.notification,
            },
            questions: [],
          };
        }
        if (row.app_survey_question && row.app_survey_response) {
          surveys[surveyId].questions.push({
            question: row.app_survey_question,
            response: row.app_survey_response,
          });
        }
      });

      resolve(Object.values(surveys));
    });
  });
};

// Create survey questions with options
const createSurveyQuestions = (questions) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        return reject(err);
      }

      const insertQuestionQuery = `
        INSERT INTO app_survey_questions (app_survey_question)
        VALUES ?
      `;
      const questionValues = questions.map((question) => [question.text]);

      db.query(insertQuestionQuery, [questionValues], (err, result) => {
        if (err) {
          return db.rollback(() => {
            reject(err);
          });
        }

        const questionIds = result.insertId;

        const insertOptionsQuery = `
          INSERT INTO app_survey_question_options (app_survey_question_id, option_text)
          VALUES ?
        `;
        const optionValues = questions.reduce((values, question, index) => {
          const questionId = questionIds + index;
          const questionOptions = question.options.map((option) => [
            questionId,
            option,
          ]);
          return [...values, ...questionOptions];
        }, []);

        db.query(insertOptionsQuery, [optionValues], (err, result) => {
          if (err) {
            return db.rollback(() => {
              reject(err);
            });
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                reject(err);
              });
            }

            resolve({ questions });
          });
        });
      });
    });
  });
};

// Get all questions with options
const getSurveyQuestions = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT q.app_survey_question_id, q.app_survey_question, o.app_survey_question_option_id, o.option_text
      FROM app_survey_questions q
      LEFT JOIN app_survey_question_options o ON q.app_survey_question_id = o.app_survey_question_id
    `;
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }

      const questions = {};
      results.forEach((row) => {
        if (!questions[row.app_survey_question_id]) {
          questions[row.app_survey_question_id] = {
            app_survey_question_id: row.app_survey_question_id,
            app_survey_question: row.app_survey_question,
            options: [],
          };
        }
        questions[row.app_survey_question_id].options.push({
          app_survey_question_option_id: row.app_survey_question_option_id,
          option_text: row.option_text,
        });
      });

      resolve(Object.values(questions));
    });
  });
};

// Submit survey response
const submitSurveyResponse = (userId, surveyResponses, surveyDetails) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        return reject(err);
      }

      const insertResponseQuery = `
        INSERT INTO app_survey_question_responses (user_id, app_survey_question_id, app_survey_response)
        VALUES ?
      `;
      const responseValues = surveyResponses.map((response) => [
        userId,
        response.questionId,
        response.response,
      ]);

      db.query(insertResponseQuery, [responseValues], (err, result) => {
        if (err) {
          return db.rollback(() => {
            reject(err);
          });
        }

        const insertSurveyQuery = `
          INSERT INTO app_survey (drug_name, date, drug_size, drug_dosage, drug_percentage, drug_quantity, user_id)
          VALUES ?
        `;
        const surveyValues = surveyDetails.map((survey) => [
          survey.drug_name,
          survey.date,
          survey.drug_size,
          survey.drug_dosage,
          survey.drug_percentage,
          survey.drug_quantity,
          userId,
        ]);

        db.query(insertSurveyQuery, [surveyValues], (err, result) => {
          if (err) {
            return db.rollback(() => {
              reject(err);
            });
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                reject(err);
              });
            }

            resolve({ surveyResponses, surveyDetails });
          });
        });
      });
    });
  });
};

module.exports = {
  createSurveyQuestions,
  getSurveyQuestions,
  submitSurveyResponse,
  getSurveyDetails,
  getAllSurveys,
  getSurveysByUserId,
};
