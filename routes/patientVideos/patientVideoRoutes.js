import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import patientVedioController from "../../controllers/patientVideos/patientVedioController.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const videoPath = path.join(__dirname, "../../public/videos");

if (!fs.existsSync(videoPath)) {
  fs.mkdirSync(videoPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, videoPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.single("file"),
  patientVedioController.uploadPatientVideo
);
router.get("/getPatientVideos", patientVedioController.getPatientVedio);

export default router;
