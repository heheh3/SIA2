const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");


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
    const [b_date, b_time, b_procedure, b_note] = req.body;
    const sqlInsert = "INSERT INTO booking_db (b_date, b_time, b_procedure, b_note) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [b_date, b_time, b_procedure, b_note], (err, result) =>{
        if (error){
            console.log(error);
        };
    });
});


app.get("/appointment/get", (req, res) =>{
    const sqlGet = "SELECT * FROM booking_db";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});


app.listen(5000, () =>{
    console.log("Server is running on port 5000");
})

