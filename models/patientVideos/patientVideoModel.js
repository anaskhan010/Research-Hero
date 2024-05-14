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

var createPatientVideo = function (user_id, video_url) {
  var encryptedPath = encryptPath(video_url);
  return new Promise(function (resolve, reject) {
    var query = "INSERT INTO patient_videos (user_id, video_url) VALUES (?, ?)";
    db.query(query, [user_id, encryptedPath], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var getAllPatientVideos = function () {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM patient_videos";
    db.query(query, function (err, result) {
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
};
