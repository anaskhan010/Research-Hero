const express = require("express");

const notificationController = require("../../controllers/notification/notificationController");

const router = express.Router();

router.get("/getNotification/:id", notificationController.getNotification);

module.exports = router;
