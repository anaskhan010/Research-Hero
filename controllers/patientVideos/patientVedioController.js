import crypto from "crypto";
import patientVideoModel from "../../models/patientVideos/patientVideoModel.js";

// Encryption setup
const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || "asdfghjklmnbvcxzqwertyuioplkjhgf"; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY, "utf-8"),
    iv
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

function decrypt(text) {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY, "utf-8"),
    iv
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

const uploadPatientVideo = async (req, res) => {
  const { patient_id } = req.body;
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("Please upload a video file.");
    }

    const filePath = `/videos/${file.filename}`;
    const encryptedFilePath = encrypt(filePath);

    await patientVideoModel.createPatientVideo(patient_id, encryptedFilePath);
    res.send("Video uploaded successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get Patient Video
const getPatientVedio = async (req, res) => {
  try {
    const patientVideos = await patientVideoModel.getPatientVideos();
    const decryptedVideos = patientVideos.map((video) => {
      return {
        id: video.video_id,
        patient_id: video.patient_id,
        video_url: decrypt(video.video_url),
      };
    });
    res.send(decryptedVideos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default {
  uploadPatientVideo,
  decrypt,
  getPatientVedio,
};
