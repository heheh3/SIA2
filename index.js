const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const moment = require('moment');
const {parseISO, format} = require('date-fns');



const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "AdDU2202001318896",
    database: "crud_booking",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


// BOOKING BACKEND CRUD
app.post("/appointment/post", (req,res)=>{ 
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
});


app.get("/appointment/get", (req, res) =>{
    const sqlGet = "SELECT * FROM booking_db ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC;";

    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});


app.delete("/appointment/delete/:patientID", (req,res)=>{ 
    const {patientID} = req.params
   
    const sqlRemove = "DELETE FROM booking_db where patientID = ?";
    db.query(sqlRemove, patientID, (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get("/admin/appointment/get/:patientID", (req, res) =>{
    const { patientID } = req.params;
    const sqlGet = "SELECT * FROM booking_db where patientID = ?";
    db.query(sqlGet, patientID ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
   


    });
});

app.put("/admin/appointment/update/:patientID", (req, res) =>{
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
});


//  EMPLOYEE BACKEND CRUD

app.get("/employee/get", (req, res) =>{
    const sqlGet = "SELECT * FROM employee_db"

    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});


app.delete("/employee/delete/:employeeID", (req,res)=>{ 
    const {employeeID} = req.params
   
    const sqlRemove = "DELETE FROM employee_db where patientID = ?";
    db.query(sqlRemove, employeeID, (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});


app.listen(5000, () =>{
    console.log("Server is running on port 5000");
})

