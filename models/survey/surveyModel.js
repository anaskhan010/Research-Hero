import db from "../../config/DBConnection.js";

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
        const questionValues = question_text.map((question) => [
          surveyId,
          question,
        ]);

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

export default { createSurvey };

// import db from "../../config/DBConnection.js";

// // create survey model
// const createSurvey = (survey_title, question_text) => {
//   return new Promise((resolve, reject) => {
//     db.beginTransaction((error) => {
//       if (error) {
//         reject(error);
//       }

//       const surveyQuery = "INSERT INTO survey (survey_title) VALUES (?)";
//       db.query(surveyQuery, [survey_title], (error, surveyResult) => {
//         if (error) {
//           db.rollback(() => {
//             reject(error);
//           });
//         }

//         const surveyId = surveyResult.insertId;
//         const questionQuery =
//           "INSERT INTO survey_question ( survey_id,question_text) VALUES (?, ?)";
//         db.query(
//           questionQuery,
//           [surveyId, question_text],
//           (error, questionResult) => {
//             if (error) {
//               db.rollback(() => {
//                 reject(error);
//               });
//             }

//             db.commit((error) => {
//               if (error) {
//                 db.rollback(() => {
//                   reject(error);
//                 });
//               }

//               resolve(questionResult);
//             });
//           }
//         );
//       });
//     });
//   });
// };

// export default { createSurvey };
