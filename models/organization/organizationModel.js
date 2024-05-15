var db = require("../../config/DBConnection.js");
var notificationMiddleware = require("../../middleware/notificationMIddleware.js");

// create organization
var createOrganization = function (
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
) {
  console.log(
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
  return new Promise(function (resolve, reject) {
    db.beginTransaction(function (err) {
      if (err) {
        reject(err);
      }

      // Step 1: Create the user
      var userQuery = "INSERT INTO user (email, password) VALUES (?, ?)";
      db.query(
        userQuery,
        [email, hashPassword],
        function (userErr, userResult) {
          if (userErr) {
            return db.rollback(function () {
              reject(userErr);
            });
          }

          var userId = userResult.insertId;

          // Step 2: Create the organization
          var organizationQuery =
            "INSERT INTO organization (user_id, first_name, last_name, status, gender, address, contact_number, date_of_birth, stipend, study_enrolled, notification) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
          db.query(
            organizationQuery,
            [
              userId,
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
            ],
            function (orgErr, orgResult) {
              if (orgErr) {
                return db.rollback(function () {
                  reject(orgErr);
                });
              }

              // Step 3: Insert note
              var noteQuery = "INSERT INTO note (user_id, note) VALUES (?, ?)";
              db.query(
                noteQuery,
                [userId, note],
                function (noteErr, noteResult) {
                  if (noteErr) {
                    return db.rollback(function () {
                      reject(noteErr);
                    });
                  }

                  // Step 4: Insert into user_role
                  var userRoleQuery =
                    "INSERT INTO user_role (user_id, role_id) VALUES (?,?)";
                  db.query(
                    userRoleQuery,
                    [userId, role_id],
                    function (roleErr, roleResult) {
                      if (roleErr) {
                        return db.rollback(function () {
                          reject(roleErr);
                        });
                      }

                      // insert into patient_registration_status

                      var patientRegistrationStatusQuery = `INSERT INTO patient_registration_status (user_id, approval_status) VALUES (?,?)`;
                      db.query(
                        patientRegistrationStatusQuery,
                        [userId, "pending"],
                        function (
                          patientRegistrationStatusErr,
                          patientRegistrationStatusResult
                        ) {
                          if (patientRegistrationStatusErr) {
                            return db.rollback(function () {
                              reject(patientRegistrationStatusErr);
                            });
                          }
                          console.log(
                            "Patient registration status inserted successfully."
                          );
                          // Moved db.commit here to ensure it's the last operation
                          db.commit(function (commitErr) {
                            if (commitErr) {
                              return db.rollback(function () {
                                reject(commitErr);
                              });
                            }
                            resolve(patientRegistrationStatusResult);
                          });
                        }
                      );

                      db.commit(function (commitErr) {
                        if (commitErr) {
                          return db.rollback(function () {
                            reject(commitErr);
                          });
                        }

                        resolve(orgResult);
                      });

                      // Step 5: insertion into notification
                      notificationMiddleware.sendNotification(
                        2,
                        "unread",
                        "New Patient Created and awaiting approval"
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  });
};

// signin organization
var signinOrganization = function (email) {
  return new Promise(function (resolve, reject) {
    // Begin transaction
    db.beginTransaction(function (err) {
      if (err) {
        reject(err);
      }

      // Check if user exists by email
      var userQuery = "SELECT * FROM user WHERE email = ?";
      db.query(userQuery, [email], function (userErr, userResult) {
        if (userErr) {
          return db.rollback(function () {
            reject(userErr);
          });
        } else {
          if (userResult.length === 0) {
            // No user found with the provided email
            return db.rollback(function () {
              resolve(null);
            });
          } else {
            // User found, get user_id
            var userId = userResult[0].user_id;

            // Check patient_registration_status table for approval_status
            var statusQuery =
              "SELECT approval_status FROM patient_registration_status WHERE user_id = ?";
            db.query(statusQuery, [userId], function (statusErr, statusResult) {
              if (statusErr) {
                return db.rollback(function () {
                  reject(statusErr);
                });
              } else {
                if (
                  statusResult.length === 0 ||
                  statusResult[0].approval_status !== "accepted"
                ) {
                  // Either no status found or approval_status is not accepted
                  return db.rollback(function () {
                    resolve(null);
                  });
                } else {
                  // User found and approval_status is accepted
                  // Commit transaction
                  db.commit(function (commitErr) {
                    if (commitErr) {
                      return db.rollback(function () {
                        reject(commitErr);
                      });
                    }
                    // Resolve with user details
                    resolve(userResult[0]);
                  });
                }
              }
            });
          }
        }
      });
    });
  });
};
// is user exist
var isUserExist = function (email) {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM user WHERE email = ?";
    db.query(query, [email], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// get all organizations
var getAllOrganizations = function () {
  return new Promise(function (resolve, reject) {
    var query = `
      SELECT o.*, u.email, MAX(n.note) AS note
      FROM organization AS o
      JOIN user AS u ON o.user_id = u.user_id
      JOIN note AS n ON u.user_id = n.user_id
      GROUP BY o.organization_id`;
    db.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// get organization by id
var getOrganizationById = function (user_id) {
  return new Promise(function (resolve, reject) {
    var query = `
      SELECT o.*, u.email, MAX(n.note) AS note
      FROM organization AS o
      JOIN user AS u ON o.user_id = u.user_id
      JOIN note AS n ON u.user_id = n.user_id
      WHERE o.user_id = ?
      GROUP BY o.user_id`;
    db.query(query, [user_id], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

// update organization
var updateOrganization = function (
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
) {
  return new Promise(function (resolve, reject) {
    var query =
      "UPDATE organization AS o JOIN user AS u ON o.user_id = u.user_id JOIN note AS n ON u.user_id = n.user_id SET o.first_name = ?, o.last_name = ?, o.status = ?, o.gender = ?, o.address = ?, o.contact_number = ?, o.date_of_birth = ?, o.stipend = ?, o.study_enrolled = ?, o.notification = ?, u.email = ?, n.note = ? WHERE o.organization_id = ?";
    db.query(
      query,
      [
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
        email,
        note,
        organization_id,
      ],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// delete organization
var deleteOrganization = function (user_id) {
  return new Promise(function (resolve, reject) {
    var query = "DELETE FROM user WHERE user_id = ?";
    db.query(query, [user_id], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  createOrganization: createOrganization,
  signinOrganization: signinOrganization,
  getAllOrganizations: getAllOrganizations,
  getOrganizationById: getOrganizationById,
  updateOrganization: updateOrganization,
  deleteOrganization: deleteOrganization,
  isUserExist: isUserExist,
};
