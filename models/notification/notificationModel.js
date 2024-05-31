const db = require("../../config/DBConnection");

// create Notification Model
var createNotification = function (role_id, status, notification) {
  return new Promise(function (resolve, reject) {
    var notificationQuery =
      "INSERT INTO notification (role_id,status,notification) VALUES (?,?,?)";
    db.query(
      notificationQuery,
      [role_id, status, notification],
      function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};

// get all notification stutus which are unread
var getNotification = function (role_id) {
  return new Promise(function (resolve, reject) {
    // Query to fetch notifications
    var notificationQuery = `SELECT * FROM notification WHERE status = 'unread' AND role_id =?`;
    // Query to count notifications
    var countQuery = `SELECT COUNT(*) AS unread_count FROM notification WHERE status = 'unread' AND role_id =?`;

    db.query(notificationQuery, [role_id], function (err, notifications) {
      if (err) {
        reject(err);
      } else {
        db.query(countQuery, [role_id], function (err, countResult) {
          if (err) {
            reject(err);
          } else {
            resolve({
              notifications: notifications,
              unread_count: countResult[0].unread_count,
            });
          }
        });
      }
    });
  });
};

// update status as read model
var updateNotification = function (notification_id) {
  return new Promise(function (resolve, reject) {
    var notificationQuery =
      "UPDATE notification SET status = 'read' WHERE notification_id = ?";
    db.query(notificationQuery, [notification_id], function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  createNotification,
  getNotification,
  updateNotification,
};
