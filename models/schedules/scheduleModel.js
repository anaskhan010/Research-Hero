import db from  "../../config/DBConnection.js";


const createSchedule =  (schedule_date, schedule_time, status ,patient_id, note_id) => {
    
    
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO schedule (schedule_date, schedule_time,status, patient_id, note_id) VALUES (?, ?, ?, ?, ?)`;
        db.query(query, [schedule_date, schedule_time, status ,patient_id, note_id], (err, result) => {
            if(err) {
                reject(err);
            } else {
                const selectQuery = 'SELECT * FROM schedule WHERE schedule_id = ?';
                db.query(selectQuery, [result.insertId], (error, rows) => {
                    if(error) {
                        reject(error);
                    } else {
                        console.log("model row", rows[0]);
                        resolve(rows[0]);
                    }        
               });
              
            }
        });
    });
}

// get all schedules
const getAllSchedules = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT s.schedule_id, s.schedule_date , s.schedule_time, s.status AS schedule_status , p.first_name, p.last_name, p.gender, p.address, p.stipend, p.study_enrolled , n.note  FROM schedule AS s 
        JOIN patient AS p ON s.patient_id = p.patient_id
        JOIN note AS n ON s.note_id = n.note_id`;
        db.query(query, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        }
        );
    }
    );
}

// get schedule by id
const getScheduleById = (schedule_id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT s.schedule_id, s.schedule_date , s.schedule_time, s.status AS schedule_status , p.first_name, p.last_name, p.gender, p.address, p.stipend, p.study_enrolled , n.note FROM schedule AS s JOIN patient AS p ON s.patient_id = p.patient_id JOIN note AS n ON s.note_id = n.note_id WHERE s.schedule_id = ?`;
        db.query(query, [schedule_id], (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

// update schedule
const updateSchedule = (schedule_id, schedule_date, schedule_time, status ,patient_id, note_id) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE schedule SET schedule_date = ?, schedule_time = ?, status = ?, patient_id = ?, note_id = ? WHERE schedule_id = ?`;
        db.query(query, [schedule_date, schedule_time, status ,patient_id, note_id, schedule_id], (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

// delete schedule
const deleteSchedule = (schedule_id) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM schedule WHERE schedule_id = ?`;
        db.query(query, [schedule_id], (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


export default {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule

}