const registrationManagementModel = require("../../models/userRegistrationManagement/registrationManagementModel");

// get user registration accepted status
const getAllAcceptedStatus = async (req, res) => {
  try {
    const result = await registrationManagementModel.getAllAcceptedStatus();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get user registration pending status
const getAllPendingStatus = async (req, res) => {
  try {
    const result = await registrationManagementModel.getAllPendingStatus();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// update user registration status
const updateRegistrationStatus = async (req, res) => {
  const { id } = req.params;
  const status = req.body.status;
  try {
    const result = await registrationManagementModel.updateRegistrationStatus(
      status,
      id
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllAcceptedStatus,
  getAllPendingStatus,
  updateRegistrationStatus,
};
