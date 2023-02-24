import {parseISO, format} from 'date-fns';
import { db } from "../connection.js";
import moment from 'moment'

export const appointment_post = (req, res) =>{
    const b_date = req.body.b_date;
    const b_time = req.body.b_time;
    const b_procedure = req.body.b_procedure;
    const b_note = req.body.b_note;
    const b_status = "Pending";

    const date = parseISO(b_date);
    const formattedDate = format(date, 'EEE, MMM dd, yyyy');

    const sqlInsert = "INSERT INTO booking_db (b_date, b_time, b_procedure, b_note, b_status) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [formattedDate, b_time, b_procedure, b_note, b_status], (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send("Values Added")
        }
    });


}

export const appointment_get = (req, res) =>{
    const sqlGet = "SELECT * FROM booking_db WHERE NOT b_status = 'Completed' ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";

    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}

export const appointment_delete = (req, res) =>{
    const {patientID} = req.params
   
    const sqlRemove = "DELETE FROM booking_db where patientID = ?";
    db.query(sqlRemove, patientID, (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
}

export const appointment_getUser = (req, res) =>{
    const { patientID } = req.params;
    const sqlGet = "SELECT * FROM booking_db where patientID = ?";
    db.query(sqlGet, patientID ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });

}

export const appointment_updateUser = (req, res) =>{
    const {patientID} = req.params;

    const b_date = req.body.b_date;
    const b_time = req.body.b_time;
    const b_procedure = req.body.b_procedure;
    const b_note = req.body.b_note;
    const b_status = req.body.b_status;

    const d = new Date(b_date);
    const v =  moment(d).format('ddd, MMM DD, YYYY'); 

    const sqlUpdate = "UPDATE booking_db SET b_date = ?, b_time = ?, b_procedure = ?, b_note = ?, b_status = ? WHERE patientID = ?";
    db.query(sqlUpdate, [v, b_time, b_procedure, b_note, b_status, patientID] ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });
}

export const appointment_getCompleted = (req, res) =>{
    const sqlGet = "SELECT * FROM booking_db WHERE b_status = 'Completed' ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}