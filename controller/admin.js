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
    console.log(patientID)


    const date = parseISO(b_date);
    const formattedDate = format(date, 'EEE, MMM dd, yyyy');

    const sqlInsert = "INSERT INTO booking_db (patientID, b_date, b_time, b_procedure, b_note, b_status) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [patientID, formattedDate, b_time, b_procedure, b_note, b_status], (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send("Values Added")
        }
    });


}

export const appointment_get = (req, res) =>{
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE NOT b_status = 'Completed' ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";

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
    const sqlGet = "SELECT * FROM booking_db where a_ID = ?";
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

    const d = new Date(b_date);
    const v =  moment(d).format('ddd, MMM DD, YYYY'); 

    const sqlUpdate = "UPDATE booking_db SET b_date = ?, b_time = ?, b_procedure = ?, b_note = ?, b_status = ? WHERE a_ID = ?";
    db.query(sqlUpdate, [v, b_time, b_procedure, b_note, b_status, a_ID] ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });
}

export const appointment_getCompleted = (req, res) =>{
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE b_status = 'Completed' ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}