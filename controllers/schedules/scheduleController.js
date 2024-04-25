import scheduleModel from "../../models/schedules/scheduleModel.js";


// create schedule
const createSchedule = async (req, res) => {
    const { schedule_date, schedule_time, status ,patient_id, note_id } = req.body;
  
    try {
        const result = await scheduleModel.createSchedule(schedule_date, schedule_time, status ,patient_id, note_id);
        res.status(201).json({ message: "Schedule created successfully", schedule: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get all schedules
const getAllSchedules = async (req, res) => {
    try {
        const result = await scheduleModel.getAllSchedules();
        res.status(200).json({ schedules: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get schedule by id
const getScheduleById = async (req, res) => {
    const schedule_id = req.params.id;
    try {
        const result = await scheduleModel.getScheduleById(schedule_id);
        res.status(200).json({ schedule: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update schedule
const updateSchedule = async (req, res) => {
    const schedule_id = req.params.id;
    const { schedule_date, schedule_time, status ,patient_id, note_id } = req.body;
    try {
        const result = await scheduleModel.updateSchedule(schedule_id, schedule_date, schedule_time, status ,patient_id, note_id);
        res.status(200).json({ message: "Schedule updated successfully", schedule: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete schedule
const deleteSchedule = async (req, res) => {
    const schedule_id = req.params.id;
    try {
        const result = await scheduleModel.deleteSchedule(schedule_id);
        res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule

}