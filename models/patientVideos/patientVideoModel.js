import db from "../../config/DBConnection.js";
import CryptoJS from "crypto-js";

const SECRET_KEY = "asdsajdaoeiqwedkasdaskdjaskdklas";

const encryptPath = (path) => {
  return CryptoJS.AES.encrypt(path, SECRET_KEY).toString();
};

const decryptPath = async (encryptedPath) => {
  console.log("Encrypted path:", encryptedPath);
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPath, SECRET_KEY);
    const decryptedPath = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedPath;
  } catch (error) {
    throw error;
  }
};
const createPatientVideo = (patient_id, video_url) => {
  const encryptedPath = encryptPath(video_url);
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO patient_videos (patient_id, video_url) VALUES (?, ?)`;
    db.query(query, [patient_id, encryptedPath], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const getAllPatientVideos = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM patient_videos";
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default {
  createPatientVideo,
  decryptPath,
  getAllPatientVideos,
};
