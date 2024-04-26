import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import patientVedioController from "../../controllers/patientVideos/patientVedioController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const videoPath = path.join(__dirname, "../../public/videos");
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
router.get(
  "/getPatientRecordWithVideo",
  patientVedioController.getAllPatientVideos
);

export default router;
