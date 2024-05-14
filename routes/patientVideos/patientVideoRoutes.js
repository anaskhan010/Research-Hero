var express = require("express");
var multer = require("multer");
var path = require("path");
var url = require("url");
var patientVedioController = require("../../controllers/patientVideos/patientVedioController.js");

var router = express.Router();
var __dirname = path.dirname(module.filename);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var videoPath = path.join(__dirname, "../../public/videos");
    cb(null, videoPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.single("file"),
  patientVedioController.uploadPatientVideo
);
router.get(
  "/getPatientRecordWithVideo",
  patientVedioController.getAllPatientVideos
);

module.exports = router;
