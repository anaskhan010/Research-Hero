import express from 'express';
import scheduleController from "../../controllers/schedules/scheduleController.js";

const router = express.Router();

router.post('/createSchedule', scheduleController.createSchedule);
router.get('/getAllSchedules', scheduleController.getAllSchedules);
router.get('/getScheduleById/:id', scheduleController.getScheduleById);
router.put('/updateSchedule/:id', scheduleController.updateSchedule);
router.delete('/deleteSchedule/:id', scheduleController.deleteSchedule);

export default router;