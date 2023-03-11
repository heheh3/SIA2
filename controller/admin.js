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
    const procedFee = 0;
    console.log(patientID)


    const date = parseISO(b_date);
    const formattedDate = format(date, 'EEE, MMM dd, yyyy');

    const sqlInsert = "INSERT INTO booking_db (patientID, b_date, b_time, b_procedure, b_note, b_status, b_paymentStatus, procedFee) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [patientID, formattedDate, b_time, b_procedure, b_note, b_status, b_paymentStatus, procedFee], (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send("Values Added")
        }
    });


}

export const appointment_get = (req, res) =>{
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE NOT b_status = 'Completed' AND NOT b_status = 'Cancelled' AND NOT b_status = 'R-Completed' ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";

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
    let procedFee = 0;

    if (b_status === "Cancelled" || b_status === "Rescheduled"){
        procedFee = 100
    } else{
        procedFee = 0
    }

    const d = new Date(b_date);
    const v =  moment(d).format('ddd, MMM DD, YYYY'); 

    const sqlUpdate = "UPDATE booking_db SET b_date = ?, b_time = ?, b_procedure = ?, b_note = ?, b_status = ?, b_paymentStatus = ?, procedFee = ? WHERE a_ID = ?";
    
    
    db.query(sqlUpdate, [v, b_time, b_procedure, b_note, b_status, b_paymentStatus, procedFee, a_ID] ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });
}

export const appointment_getCompleted = (req, res) =>{
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE (b_status = 'Completed' OR b_status = 'R-Completed') ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";
    db.query(sqlGet ,(error, result)=>{
        res.send(result);
    });
}

export const appointment_getCompletedCancelled = (req, res) =>{
    const {user_id, a_ID}= req.params;
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE ((b.b_status = 'Cancelled' OR b.b_status = 'R-Completed') AND b.b_paymentStatus = 'Fully-Paid') AND u.user_id = ? AND a_ID BETWEEN IFNULL((SELECT a_ID + 1 FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE (b.b_status = 'R-Completed' OR b.b_status = 'Completed') AND b.b_paymentStatus = 'Fully-Paid' AND u.user_id = ? AND a_ID < ? ORDER BY a_ID DESC LIMIT 1), 0) AND ?"

    
    db.query(sqlGet, [user_id, user_id, a_ID, a_ID] ,(error, result)=>{
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
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE (b.b_status = 'Completed' OR b.b_status = 'R-Completed') AND u.user_id = ? ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";
    db.query(sqlGet, user_id, (error, result)=>{
        res.send(result);
    });
}


export const appointment_getAppointmentCancel = (req, res) =>{
    const { user_id } = req.params;
    const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE (b.b_status = 'Cancelled' OR b.b_status = 'Rescheduled') AND b.b_paymentStatus = 'Not-Paid' AND u.user_id = ?"
    db.query(sqlGet, user_id ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });


}

export const appointment_addProcedures = (req, res) =>{

    const {a_ID} = req.params;
    console.log(a_ID)
    const b_procedure = req.body.b_procedure;
    const b_note = req.body.b_note;
    const toothNo = req.body.toothNo;
    const procedFee = req.body.procedFee;
    console.log(procedFee)


    const sqlInsert = "INSERT INTO procedures_db (a_ID, b_procedure, b_note, toothNo, procedFee) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [Number(a_ID), b_procedure, b_note, toothNo, Number(procedFee)], (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send("Values Added")
        }
    });

}

export const appointment_getProcedures = (req, res) =>{
    const {a_ID} = req.params;
    const sqlGet = "SELECT * FROM procedures_db WHERE a_ID = ?"

    db.query(sqlGet, a_ID, (error, result)=>{
        res.send(result);
    });
}

export const appointment_getSum = (req, res) =>{
    const {a_ID} = req.params;
    
    const sqlGet = "SELECT SUM(procedFee) as totalAmount FROM procedures_db WHERE a_ID = ?"
        // const sqlGet = "SELECT * FROM booking_db as b JOIN users_db as u ON b.patientId = u.user_id WHERE b.b_status = 'Cancelled' AND b.b_paymentStatus = 'Not-Paid' AND u.user_id = ?"

    db.query(sqlGet, a_ID, (error, result)=>{
        res.send(result);
    });
}


export const procedure_delete = (req, res) =>{
    const {procedNum} = req.params
   
    const sqlRemove = "DELETE FROM procedures_db where procedNum = ?";
    db.query(sqlRemove, procedNum, (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    });    
}



export const procedure_get = (req, res) =>{
    const { procedNum } = req.params;
    const sqlGet = "SELECT * FROM procedures_db WHERE procedNum = ?"
    db.query(sqlGet, procedNum ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });

}


export const procedure_update = (req, res) =>{
    const {procedNum} = req.params;

    const b_procedure = req.body.b_procedure;
    const b_note = req.body.b_note;
    const toothNo = req.body.toothNo;
    const procedFee = req.body.procedFee;
    

    const sqlUpdate = "UPDATE procedures_db SET b_procedure = ?, b_note = ?, toothNo = ?, procedFee = ? WHERE procedNum = ?";
    db.query(sqlUpdate, [b_procedure, b_note, toothNo, procedFee, procedNum] ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });
}

