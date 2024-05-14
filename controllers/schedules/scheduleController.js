var scheduleModel = require("../../models/schedules/scheduleModel.js");

// create schedule
var createSchedule = async function (req, res) {
  var { schedule_date, schedule_time, status, note, user_id } = req.body;

  try {
    const result = await scheduleModel.createSchedule(
      schedule_date,
      schedule_time,
      status,
      note,
      user_id
    );
    res.status(200).json({ message: "Schedule created successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all schedules
var getAllSchedules = function (req, res) {
  scheduleModel
    .getAllSchedules()
    .then(function (result) {
      res.status(200).json({ schedules: result });
    })
    .catch(function (error) {
      res.status(500).json({ error: error.message });
    });
};

// get schedule by id
var getScheduleById = function (req, res) {
  var schedule_id = req.params.id;
  scheduleModel
    .getScheduleById(schedule_id)
    .then(function (result) {
      res.status(200).json({ schedule: result });
    })
    .catch(function (error) {
      res.status(500).json({ error: error.message });
    });
};

// update schedule
var updateSchedule = function (req, res) {
  var schedule_id = req.params.id;
  var { schedule_date, schedule_time, status, user_id, note } = req.body;
  console.log(
    "Controller",
    schedule_id,
    schedule_date,
    schedule_time,
    status,
    user_id,
    note
  );
  try {
    scheduleModel
      .updateSchedule(
        schedule_id,
        schedule_date,
        schedule_time,
        status,
        note,
        user_id
      )
      .then(function (result) {
        res
          .status(200)
          .json({ message: "Schedule updated successfully", schedule: result });
      })
      .catch(function (error) {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete schedule
var deleteSchedule = function (req, res) {
  var schedule_id = req.params.id;
  try {
    scheduleModel
      .deleteSchedule(schedule_id)
      .then(function (result) {
        res.status(200).json({ message: "Schedule deleted successfully" });
      })
      .catch(function (error) {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSchedule: createSchedule,
  getAllSchedules: getAllSchedules,
  getScheduleById: getScheduleById,
  updateSchedule: updateSchedule,
  deleteSchedule: deleteSchedule,
};
