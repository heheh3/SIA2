import {parseISO, format} from 'date-fns';
import { db } from "../connection.js";

// // REGISTER CRUD

// app.get("/users/get", (req, res) =>{
//     const sqlGet = "SELECT * FROM users_db"

//     db.query(sqlGet, (error, result)=>{
//         res.send(result);
//     });
// });

// app.post("/users/post", (req,res)=>{ 
//     const p_username = req.body.p_username;
//     const p_email = req.body.p_email;
//     const p_password = req.body.p_password;
//     const p_fullname = req.body.p_fullname;
//     const p_contact = req.body.p_contact;
//     const p_birthdate = req.body.p_birthdate;

//     const date = parseISO(p_birthdate);
//     const formattedDate = format(date, 'EEE, MMM dd, yyyy');

//     const sqlInsert = "INSERT INTO users_db (p_username, p_email, p_password, p_fullname, p_contact, p_birthdate) VALUES (?, ?, ?, ?, ?, ?)";
//     db.query(sqlInsert, [p_username, p_email, p_password, p_fullname, p_contact, formattedDate], (err, result) =>{
//         if (err){
//             console.log(err);
//         }else {
//             res.send("Values Added")
//         }
//     });
// });

// app.delete("/users/delete/:user_id", (req,res)=>{ 
//     const {user_id} = req.params;
   
//     const sqlRemove = "DELETE FROM users_db where user_id = ?";
//     db.query(sqlRemove, user_id, (err, result) =>{
//         if (err){
//             console.log(err);
//         }else {
//             res.send(result);
//         }
//     });
// });

// app.get("/admin/patient/get/:user_id", (req, res) =>{
//     const { user_id } = req.params;
//     const sqlGet = "SELECT * FROM users_db where user_id = ?";
//     db.query(sqlGet, user_id ,(error, result)=>{
//         if(error){
//             console.log(error)
//         }
//         res.send(result);
   


//     });
// });

// app.put("/admin/patient/update/:user_id", (req, res) =>{
//     const {user_id} = req.params;

//     const p_username = req.body.p_username;
//     const p_email = req.body.p_email;
//     const p_password = req.body.p_password;
//     const p_fullname = req.body.p_fullname;
//     const p_contact = req.body.p_contact;
//     const p_birthdate = req.body.p_birthdate;

//     const date = parseISO(p_birthdate);
//     const formattedDate = format(date, 'EEE, MMM dd, yyyy');

   
//     const sqlUpdate = "UPDATE users_db SET p_username = ?, p_email = ?, p_password = ?, p_fullname = ?, p_contact = ?, p_birthdate = ? WHERE user_id = ?";
//     db.query(sqlUpdate, [p_username, p_email, p_password, p_fullname, p_contact, formattedDate, user_id] ,(error, result)=>{
//         if(error){
//             console.log(error)
//         }
//         res.send(result);

//     });
// });
