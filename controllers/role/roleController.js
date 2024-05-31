const roleModel = require("../../models/role/roleModel");

const createRole = async (req, res) => {
  const { role_name } = req.body;

  try {
    const result = await roleModel.createRole(role_name);
    res
      .status(201)
      .json({ message: "Role created successfully", role: result });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteRole = async (req, res) => {
  const role_id = req.params.id;

  try {
    const result = await roleModel.deleteRole(role_id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Role deleted successfully" });
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get All Roles
const getAllRoles = async (req, res) => {
  try {
    const result = await roleModel.getAllRoles();
    res.status(200).json({ roles: result });
  } catch (error) {
    console.error("Error getting all roles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createRole: createRole,
  deleteRole: deleteRole,
  getAllRoles,
};
