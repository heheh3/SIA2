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
    const sqlGet = "SELECT * FROM booking_db WHERE NOT b_status = 'Completed' ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";

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

app.get("/appointment/completed/get", (req, res) =>{
    const sqlGet = "SELECT * FROM booking_db WHERE b_status = 'Completed' ORDER BY STR_TO_DATE(b_date,'%a, %b %d, %Y') ASC , STR_TO_DATE(b_time, '%h:%i%p') ASC";    db.query(sqlGet, (error, result)=>{
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

app.post("/employee/post", (req,res)=>{ 
    const e_name = req.body.e_name;
    const e_email = req.body.e_email;
    const e_contact = req.body.e_contact;
    const e_address = req.body.e_address;
    const e_birthdate = req.body.e_birthdate;
    const e_gender = req.body.e_gender;

    const date = parseISO(e_birthdate);
    const formattedDate = format(date, 'EEE, MMM dd, yyyy');

    const sqlInsert = "INSERT INTO employee_db (e_name, e_email, e_contact, e_address, e_birthdate, e_gender) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [e_name, e_email, e_contact, e_address, formattedDate, e_gender], (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send("Values Added")
        }
    });
});



app.delete("/employee/delete/:employeeID", (req,res)=>{ 
    const {employeeID} = req.params;
    console.log(employeeID)
   
    const sqlRemove = "DELETE FROM employee_db where employeeID = ?";
    db.query(sqlRemove, employeeID, (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get("/admin/employee/get/:employeeID", (req, res) =>{
    const { employeeID } = req.params;
    const sqlGet = "SELECT * FROM employee_db where employeeID = ?";
    db.query(sqlGet, employeeID ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
   


    });
});

app.put("/admin/employee/update/:employeeID", (req, res) =>{
    const {employeeID} = req.params;

    const e_name = req.body.e_name;
    const e_email = req.body.e_email;
    const e_contact = req.body.e_contact;
    const e_address = req.body.e_address;
    const e_birthdate = req.body.e_birthdate;
    const e_gender = req.body.e_gender;

    const date = parseISO(e_birthdate);
    const formattedDate = format(date, 'EEE, MMM dd, yyyy');

   
    const sqlUpdate = "UPDATE employee_db SET e_name = ?, e_email = ?, e_contact = ?, e_address = ?, e_birthdate = ?, e_gender = ? WHERE employeeID = ?";
    db.query(sqlUpdate, [e_name, e_email, e_contact, e_address, formattedDate, e_gender, employeeID] ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);

    });
});

// REGISTER CRUD

app.get("/users/get", (req, res) =>{
    const sqlGet = "SELECT * FROM users_db"

    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});

app.post("/users/post", (req,res)=>{ 
    const p_username = req.body.p_username;
    const p_email = req.body.p_email;
    const p_password = req.body.p_password;
    const p_fullname = req.body.p_fullname;
    const p_contact = req.body.p_contact;
    const p_birthdate = req.body.p_birthdate;

    const date = parseISO(p_birthdate);
    const formattedDate = format(date, 'EEE, MMM dd, yyyy');

    const sqlInsert = "INSERT INTO users_db (p_username, p_email, p_password, p_fullname, p_contact, p_birthdate) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [p_username, p_email, p_password, p_fullname, p_contact, formattedDate], (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send("Values Added")
        }
    });
});

app.delete("/users/delete/:user_id", (req,res)=>{ 
    const {user_id} = req.params;
   
    const sqlRemove = "DELETE FROM users_db where user_id = ?";
    db.query(sqlRemove, user_id, (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get("/admin/patient/get/:user_id", (req, res) =>{
    const { user_id } = req.params;
    const sqlGet = "SELECT * FROM users_db where user_id = ?";
    db.query(sqlGet, user_id ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
   


    });
});

app.put("/admin/patient/update/:user_id", (req, res) =>{
    const {user_id} = req.params;

    const p_username = req.body.p_username;
    const p_email = req.body.p_email;
    const p_password = req.body.p_password;
    const p_fullname = req.body.p_fullname;
    const p_contact = req.body.p_contact;
    const p_birthdate = req.body.p_birthdate;

    const date = parseISO(p_birthdate);
    const formattedDate = format(date, 'EEE, MMM dd, yyyy');

   
    const sqlUpdate = "UPDATE users_db SET p_username = ?, p_email = ?, p_password = ?, p_fullname = ?, p_contact = ?, p_birthdate = ? WHERE user_id = ?";
    db.query(sqlUpdate, [p_username, p_email, p_password, p_fullname, p_contact, formattedDate, user_id] ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);

    });
});



app.listen(5000, () =>{
    console.log("Server is running on port 5000");
})

