var db = require("../../config/DBConnection.js");

var createSchedule = function (
  schedule_date,
  schedule_time,
  status,
  note,
  user_id
) {
  return new Promise(function (resolve, reject) {
    var query =
      "INSERT INTO schedule (schedule_date, schedule_time, status,note, user_id) VALUES (?,?, ?, ?, ?)";
    db.query(
      query,
      [schedule_date, schedule_time, status, note, user_id],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

var getAllSchedules = function () {
  return new Promise(function (resolve, reject) {
    var query = `SELECT s.* , u.email , o.first_name , o.last_name , o.status As user_status, o.gender, o.address , o.contact_number , o.date_of_birth, o.stipend , o.study_enrolled , o.notification FROM schedule AS s 
    JOIN user as u ON s.user_id = u.user_id
    JOIN organization as o ON u.user_id = o.user_id`;
    db.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var getScheduleById = function (schedule_id) {
  return new Promise(function (resolve, reject) {
    var query = `SELECT s.* , u.email , o.first_name , o.last_name , o.status As user_status, o.gender, o.address , o.contact_number , o.date_of_birth, o.stipend , o.study_enrolled , o.notification FROM schedule AS s 
    JOIN user as u ON s.user_id = u.user_id
    JOIN organization as o ON u.user_id = o.user_id WHERE schedule_id = ?`;
    db.query(query, [schedule_id], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

var updateSchedule = function (
  schedule_id,
  schedule_date,
  schedule_time,
  status,
  note,
  user_id
) {
  console.log(
    schedule_id,
    schedule_date,
    schedule_time,
    status,
    note,
    user_id,
    "Model"
  );
  return new Promise(function (resolve, reject) {
    var query =
      "UPDATE schedule SET schedule_date = ?, schedule_time = ?, status = ?, note = ? WHERE schedule_id = ? AND user_id = ?";
    db.query(
      query,
      [schedule_date, schedule_time, status, note, schedule_id, user_id],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          console.log(result, "Model");
          resolve(result);
        }
      }
    );
  });
};

var deleteSchedule = function (schedule_id) {
  return new Promise(function (resolve, reject) {
    var query = "DELETE FROM schedule WHERE schedule_id = ?";
    db.query(query, [schedule_id], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  createSchedule: createSchedule,
  getAllSchedules: getAllSchedules,
  getScheduleById: getScheduleById,
  updateSchedule: updateSchedule,
  deleteSchedule: deleteSchedule,
};
