var express = require("express");
var scheduleController = require("../../controllers/schedules/scheduleController.js");

var router = express.Router();

router.post("/createSchedule", scheduleController.createSchedule);
router.get("/getAllSchedules", scheduleController.getAllSchedules);
router.get("/getScheduleById/:id", scheduleController.getScheduleById);
router.put("/updateSchedule/:id", scheduleController.updateSchedule);
router.delete("/deleteSchedule/:id", scheduleController.deleteSchedule);

module.exports = router;
