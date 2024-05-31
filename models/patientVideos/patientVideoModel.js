var db = require("../../config/DBConnection.js");
var CryptoJS = require("crypto-js");

var SECRET_KEY = "asdsajdaoeiqwedkasdaskdjaskdklas";

var encryptPath = function (path) {
  return CryptoJS.AES.encrypt(path, SECRET_KEY).toString();
};

var decryptPath = function (encryptedPath) {
  return new Promise(function (resolve, reject) {
    try {
      var bytes = CryptoJS.AES.decrypt(encryptedPath, SECRET_KEY);
      var decryptedPath = bytes.toString(CryptoJS.enc.Utf8);
      resolve(decryptedPath);
    } catch (error) {
      reject(error);
    }
  });
};

var createPatientVideo = function (user_id, video_url, medication_id) {
  var encryptedPath = encryptPath(video_url);
  return new Promise(function (resolve, reject) {
    var query =
      "INSERT INTO patient_videos (user_id, video_url,medication_id) VALUES (?, ?,?)";
    db.query(
      query,
      [user_id, encryptedPath, medication_id],
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

var getAllPatientVideos = function () {
  return new Promise(function (resolve, reject) {
    var query = `WITH RankedVideos AS (
      SELECT 
          v.video_url,
          v.user_id,
          o.first_name,
          o.last_name,
          u.email,
          m.medication_name,
          m.dosage,
          m.frequency,
          m.note AS medication_Note,
          ROW_NUMBER() OVER (PARTITION BY v.user_id ORDER BY v.video_url) AS rn
      FROM 
          patient_videos AS v
      JOIN 
          user AS u ON v.user_id = u.user_id
      JOIN 
          organization AS o ON u.user_id = o.user_id
      JOIN 
          note AS n ON u.user_id = n.user_id
    JOIN patientmedications AS m ON v.medication_id = m.medication_id
    
  )
  SELECT
      video_url,
      user_id,
      first_name,
      last_name,
      email,
      medication_name,
      dosage,
      frequency,
      medication_note
  FROM
      RankedVideos
  WHERE
      rn = 1;
  `;
    db.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// get all patient videos
var getAllPatientVideosByid = function (id) {
  return new Promise(function (resolve, reject) {
    var query = `SELECT v.video_url ,v.user_id, o.first_name , o.last_name, u.email , m.medication_name,
    m.dosage,
    m.frequency,
    m.note AS medication_Note FROM patient_videos AS v
JOIN user AS u ON v.user_id = u.user_id
JOIN organization AS o ON u.user_id = o.user_id
JOIN patientmedications AS m ON v.medication_id = m.medication_id
JOIN note AS n ON u.user_id = n.user_id WHERE v.user_id = ?`;
    db.query(query, [id], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  createPatientVideo: createPatientVideo,
  decryptPath: decryptPath,
  getAllPatientVideos: getAllPatientVideos,
  getAllPatientVideosByid: getAllPatientVideosByid,
};
