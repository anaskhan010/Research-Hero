var organizationModel = require("../../models/organization/organizationModel.js");
var crypto = require("crypto");
var authMiddleware = require("../../middleware/authMiddleware.js");

var createOrganization = async function (req, res) {
  var {
    first_name,
    last_name,
    email,
    password,
    status,
    gender,
    address,
    contact_number,
    date_of_birth,
    stipend,
    study_enrolled,
    notification,
    note,

    role_id,
  } = req.body;

  var hashPassword = crypto.createHash("sha256").update(password).digest("hex");
  try {
    var result = await organizationModel.createOrganization(
      first_name,
      last_name,
      status,
      gender,
      address,
      contact_number,
      date_of_birth,
      stipend,
      study_enrolled,
      notification,
      note,
      email,
      hashPassword,
      role_id
    );

    res.status(200).json({
      status: true,
      message: "Organization Created Successfully",
      result: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Internal Server Error", error: error });
  }
};

// signin organization
var signinOrganization = async function (req, res) {
  var email = req.body.email,
    password = req.body.password;

  try {
    const userExist = await organizationModel.isUserExist(email);
    console.log(userExist, "userExist");
    if (userExist.length === 0) {
      return res.status(404).json({ status: false, message: "User Not Found" });
    }
    var user = await organizationModel.signinOrganization(email);
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User Not Verified" });
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Compare hashed password with stored hashed password
    if (user.password !== hashedPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Email or Password" });
    } else {
      // Generate token
      var token = authMiddleware(user);

      // Construct response object
      var newUser = {
        user_id: user.user_id,
        email: user.email,
        // Include other user details as needed
      };

      return res.status(201).json({
        status: true,
        message: "User Signin Successfully",
        user: newUser,
        token: token, // Send token along with the response
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error", error: error });
  }
};

// get all organizations
var getAllOrganizations = async function (req, res) {
  try {
    var organizations = await organizationModel.getAllOrganizations();
    res.status(200).json({
      status: true,
      message: "All Organizations",
      organizations: organizations,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Internal Server Error", error: error });
  }
};

// get organization by id
var getOrganizationById = async function (req, res) {
  var user_id = req.params.id;
  try {
    var organization = await organizationModel.getOrganizationById(user_id);
    res.status(200).json({
      status: true,
      message: "Organization",
      organization: organization,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Internal Server Error", error: error });
  }
};

// update organization
var updateOrganization = async function (req, res) {
  var organization_id = req.params.id;

  var {
    first_name,
    last_name,
    status,
    gender,
    address,
    contact_number,
    date_of_birth,
    stipend,
    study_enrolled,
    notification,
    note,
    email,
  } = req.body;

  try {
    var organization = await organizationModel.updateOrganization(
      organization_id,
      first_name,
      last_name,
      status,
      gender,
      address,
      contact_number,
      date_of_birth,
      stipend,
      study_enrolled,
      notification,
      note,
      email
    );
    res.status(200).json({
      status: true,
      message: "Organization Updated Successfully",
      organization: organization,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Internal Server Error", error: error });
  }
};

// delete organization
var deleteOrganization = async function (req, res) {
  var user_id = req.params.id;
  try {
    var result = await organizationModel.deleteOrganization(user_id);
    res
      .status(200)
      .json({ status: true, message: "Organization Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Internal Server Error", error: error });
  }
};

module.exports = {
  createOrganization: createOrganization,
  signinOrganization: signinOrganization,
  getAllOrganizations: getAllOrganizations,
  getOrganizationById: getOrganizationById,
  updateOrganization: updateOrganization,
  deleteOrganization: deleteOrganization,
};
