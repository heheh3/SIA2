import {parseISO, format} from 'date-fns';
import { db } from "../connection.js";


//  EMPLOYEE BACKEND CRUD
export const employee_get = (req, res) =>{
    const sqlGet = "SELECT * FROM employee_db"
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}

export const employee_post = (req, res) =>{
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

}




export const employee_delete = (req, res) =>{
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

}


export const employee_getEmployee = (req, res) =>{
    const { employeeID } = req.params;
    const sqlGet = "SELECT * FROM employee_db where employeeID = ?";
    db.query(sqlGet, employeeID ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });
}


export const employee_updateEmployee = (req, res) =>{
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


}
  

