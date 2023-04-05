
import {parseISO, format} from 'date-fns';
import { db } from "../connection.js";


export const users_get = (req, res) =>{
    const sqlGet = "SELECT * FROM users_db where NOT p_username = 'admin' "

    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}

export const users_delete = (req, res) =>{
    const {user_id} = req.params;
   
    const sqlRemove = "DELETE FROM users_db where user_id = ?";
    db.query(sqlRemove, user_id, (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    });

}

export const users_getUser = (req, res) =>{
    const { user_id } = req.params;
    const sqlGet = "SELECT * FROM users_db where user_id = ?";
    db.query(sqlGet, user_id ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });
}

export const users_updateUser = (req, res) =>{
    const {user_id} = req.params;

    const p_username = req.body.p_username;
    const p_email = req.body.p_email;
    const p_fullname = req.body.p_fullname;
    const p_contact = req.body.p_contact;
    const p_birthdate = req.body.p_birthdate;
    const p_gender = req.body.p_gender

    const sqlUpdate = "UPDATE users_db SET p_username = ?, p_email = ?, p_fullname = ?, p_contact = ?, p_birthdate = ?, p_gender = ? WHERE user_id = ?";
    db.query(sqlUpdate, [p_username, p_email, p_fullname, p_contact, p_birthdate, p_gender, user_id] ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);

    });
}