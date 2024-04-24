import db from  "../../config/DBConnection.js";


const createSchedule =  () => {
    
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO schedule (schedule_id, schedule_date, schedule_time,status, patient_id, note_id) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(query, [schedule_id, schedule_date, schedule_time, status ,patient_id, doctor_id], (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


export default {
    createSchedule
}