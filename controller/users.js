
import {parseISO, format} from 'date-fns';
import { db } from "../connection.js";


export const users_get = (req, res) =>{
    const sqlGet = "SELECT * FROM users_db"

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

