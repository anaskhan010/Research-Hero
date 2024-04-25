import db from "../../config/DBConnection.js";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
// Use Buffer directly instead of converting it to a hex string.
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

const decrypt = (text) => {
  if (typeof text !== "string") {
    throw new Error("Input must be a string.");
  }

  const parts = text.split(":");
  if (parts.length !== 2) {
    throw new Error(
      "Invalid input format. The expected format is ivHex:encryptedData."
    );
  }

  const [ivHex, encryptedText] = parts;
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(ivHex, "hex")
  );

  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

const createPatientVideo = (patient_id, video_url) => {
  return new Promise((resolve, reject) => {
    const encryptedUrl = encrypt(video_url);
    const query = `INSERT INTO patient_videos (patient_id, video_url) VALUES (?, ?)`;
    db.query(query, [patient_id, encryptedUrl], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// get all patient videos and decrypt the video url
const getPatientVideos = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM patient_videos`;
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        const decryptedResults = results.map((result) => {
          return {
            ...result,
            video_url: decrypt(result.video_url),
          };
        });
        resolve(decryptedResults);
      }
    });
  });
};

export default {
  createPatientVideo,
  decrypt,
  getPatientVideos,
};
