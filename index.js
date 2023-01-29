const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const moment = require('moment');



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


    const d = new Date(b_date);
    const n = moment(d).day();
    const dayofweek = {0:"Sun ", 1:"Mon", 2:"Tue", 3:"Wed", 4:"Thu", 5:"Fri", 6:"Sat"}  ;

    let day = Object.values(dayofweek)
    const v = day[n] + ', ' + moment(d).format('MMM DD, YYYY'); 
    console.log(v)
   
   const sqlInsert = "INSERT INTO booking_db (b_date, b_time, b_procedure, b_note, b_status) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [v, b_time, b_procedure, b_note, b_status], (err, result) =>{
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
    const {patientID} = req.params
    const sqlGet = "SELECT * FROM booking_db where patientID = ?";
    db.query(sqlGet, patientID ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);


    });
});

app.put("/admin/appointment/update/:patientID", (req, res) =>{
    const b_date = req.body.b_date;
    const b_time = req.body.b_time;
    const b_procedure = req.body.b_procedure;
    const b_note = req.body.b_note;
    const b_status = req.body.b_status;

    const {patientID} = req.params

    const sqlUpdate = "UPDATE booking_db SET b_date = ?, b_time = ?, b_procedure = ?, b_note = ?, b_status = ? WHERE patientID = ?";
    db.query(sqlUpdate, [b_date, b_time, b_procedure, b_note, b_status, patientID] ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);

    });
});









app.listen(5000, () =>{
    console.log("Server is running on port 5000");
})

