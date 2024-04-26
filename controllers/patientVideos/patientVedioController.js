import patientVideoModel from "../../models/patientVideos/patientVideoModel.js";

const uploadPatientVideo = async (req, res) => {
  const { patient_id } = req.body;
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("Please upload a video file.");
    }
    const filePath = `/videos/${file.filename}`;

    await patientVideoModel.createPatientVideo(patient_id, filePath);
    res.send("Video uploaded successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllPatientVideos = async (req, res) => {
  try {
    const allVideos = await patientVideoModel.getAllPatientVideos();

    const decryptedVideos = await Promise.all(
      allVideos.map(async (video) => {
        try {
          const decryptedPath = await patientVideoModel.decryptPath(
            video.video_url
          );
          return {
            ...video,
            video_url: decryptedPath,
          };
        } catch (error) {
          console.error(
            "Error decoding path for video:",
            video.id,
            error.message
          );
          return {
            ...video,
            video_url: null,
          };
        }
      })
    );
    res.json(decryptedVideos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default {
  uploadPatientVideo,
  getAllPatientVideos,
};
