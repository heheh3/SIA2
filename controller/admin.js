import {parseISO, format} from 'date-fns';
import { db } from "../connection.js";
import moment from 'moment'

export const appointment_post = (req, res) =>{

    const patientID = req.body.patientID;
    const b_date = req.body.b_date;
    const b_time = req.body.b_time;
    const b_procedure = req.body.b_procedure;
    const b_note = req.body.b_note;
    const b_status = "Pending";
    const b_paymentStatus = "Not-Paid";
    console.log(patientID)


    const date = parseISO(b_date);
    const formattedDate = format(date, 'EEE, MMM dd, yyyy');

    const sqlInsert = "INSERT INTO booking_db (patientID, b_date, b_time, b_procedure, b_note, b_status, b_paymentStatus) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [patientID, formattedDate, b_time, b_procedure, b_note, b_status, b_paymentStatus], (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send("Values Added")
        }
    });


}

export const appointment_get = (req, res) =>{
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE NOT b_status = 'Completed' AND NOT b_status = 'Cancelled' ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";

    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}

export const appointment_delete = (req, res) =>{
    const {a_ID} = req.params
   
    const sqlRemove = "DELETE FROM booking_db where a_ID = ?";
    db.query(sqlRemove, a_ID, (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
}

export const appointment_getUser = (req, res) =>{
    const { a_ID } = req.params;
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id  WHERE a_ID = ?"
    db.query(sqlGet, a_ID ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });

}


export const appointment_updateUser = (req, res) =>{
    const {a_ID} = req.params;

    const b_date = req.body.b_date;
    const b_time = req.body.b_time;
    const b_procedure = req.body.b_procedure;
    const b_note = req.body.b_note;
    const b_status = req.body.b_status;
    const b_paymentStatus = req.body.b_paymentStatus;
    

    const d = new Date(b_date);
    const v =  moment(d).format('ddd, MMM DD, YYYY'); 

    const sqlUpdate = "UPDATE booking_db SET b_date = ?, b_time = ?, b_procedure = ?, b_note = ?, b_status = ?, b_paymentStatus = ? WHERE a_ID = ?";
    db.query(sqlUpdate, [v, b_time, b_procedure, b_note, b_status, b_paymentStatus, a_ID] ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });
}

export const appointment_getCompleted = (req, res) =>{
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE b_status = 'Completed' ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";
    db.query(sqlGet ,(error, result)=>{
        res.send(result);
    });
}

export const appointment_getCompletedCancelled = (req, res) =>{
    const { user_id } = req.params;
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE b.b_status = 'Cancelled' AND b.b_paymentStatus = 'Fully-Paid' AND u.user_id = ?"
    db.query(sqlGet, user_id ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });
}

export const appointment_getDateTime = (req, res) =>{
    const sqlGet = "SELECT b_date, b_time FROM booking_db";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}

export const appointment_getPending = (req, res) =>{
    const { user_id } = req.params;
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE (b.b_status = 'Pending' OR b.b_status = 'Rescheduled') AND u.user_id = ? ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";
    db.query(sqlGet, user_id, (error, result)=>{
        res.send(result);
    });
}


export const appointment_getCompletedHistory = (req, res) =>{
    const { user_id } = req.params;
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE b.b_status = 'Completed' AND u.user_id = ? ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";
    db.query(sqlGet, user_id, (error, result)=>{
        res.send(result);
    });
}


export const appointment_getAppointmentCancel = (req, res) =>{
    const { user_id } = req.params;
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE b.b_status = 'Cancelled' AND b.b_paymentStatus = 'Not-Paid' AND u.user_id = ?"
    db.query(sqlGet, user_id ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });


}



