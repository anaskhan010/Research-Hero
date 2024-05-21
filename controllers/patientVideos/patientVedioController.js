var patientVideoModel = require("../../models/patientVideos/patientVideoModel.js");

var uploadPatientVideo = function (req, res) {
  var user_id = req.body.user_id;
  try {
    var file = req.file;
    if (!file) {
      return res.status(400).send("Please upload a video file.");
    }
    var filePath = "/videos/" + file.filename;

    patientVideoModel
      .createPatientVideo(user_id, filePath)
      .then(function () {
        res.send("Video uploaded successfully.");
      })
      .catch(function (error) {
        res.status(500).send(error.message);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

var getAllPatientVideos = function (req, res) {
  patientVideoModel
    .getAllPatientVideos()
    .then(function (allVideos) {
      Promise.all(
        allVideos.map(function (video) {
          return patientVideoModel
            .decryptPath(video.video_url)
            .then(function (decryptedPath) {
              return {
                user_id: video.user_id, // Assuming user_id corresponds to patient_id
                first_name: video.first_name,
                last_name: video.last_name,
                email: video.email,
                note: video.note,
                video_url: decryptedPath,
              };
            })
            .catch(function (error) {
              console.error(
                "Error decoding path for video:",
                video.user_id,
                error.message
              );
              return {
                user_id: video.user_id, // Assuming user_id corresponds to patient_id
                video_url: null,
              };
            });
        })
      )
        .then(function (decryptedVideos) {
          res.json(decryptedVideos);
        })
        .catch(function (error) {
          res.status(500).send(error.message);
        });
    })
    .catch(function (error) {
      res.status(500).send(error.message);
    });
};

// get all patient decrypt videos by user_id
var getAllPatientVideosByid = function (req, res) {
  var user_id = req.params.user_id;
  console.log("user_id", user_id);
  patientVideoModel
    .getAllPatientVideosByid(user_id)
    .then(function (allVideos) {
      Promise.all(
        allVideos.map(function (video) {
          return patientVideoModel
            .decryptPath(video.video_url)
            .then(function (decryptedPath) {
              return {
                user_id: video.user_id, // Assuming user_id corresponds to patient_id
                first_name: video.first_name,
                last_name: video.last_name,
                email: video.email,
                note: video.note,
                video_url: decryptedPath,
              };
            })
            .catch(function (error) {
              console.error(
                "Error decoding path for video:",
                video.user_id,
                error.message
              );
              return {
                user_id: video.user_id, // Assuming user_id corresponds to patient_id
                video_url: null,
              };
            });
        })
      )
        .then(function (decryptedVideos) {
          res.json(decryptedVideos);
        })
        .catch(function (error) {
          res.status(500).send(error.message);
        });
    })
    .catch(function (error) {
      res.status(500).send(error.message);
    });
};

module.exports = {
  uploadPatientVideo: uploadPatientVideo,
  getAllPatientVideos: getAllPatientVideos,
  getAllPatientVideosByid: getAllPatientVideosByid,
};
