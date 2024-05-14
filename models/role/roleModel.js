const db = require("../../config/DBConnection.js");

const createRole = (role_name) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO role (role_name) VALUES (?)";
    db.query(query, [role_name], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const deleteRole = (role_id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM role WHERE role_id = ?";
    db.query(query, [role_id], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = {
  createRole: createRole,
  deleteRole: deleteRole,
};
