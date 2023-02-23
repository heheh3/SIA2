import { db } from "../connection.js";
import bcrypt from "bcrypt";
import {parseISO, format} from 'date-fns';


export const register = (req, res) =>{

    const p_username = req.body.p_username;
    const p_email = req.body.p_email;
    const p_password = req.body.p_password;
    const p_fullname = req.body.p_fullname;
    const p_contact = req.body.p_contact;
    const p_birthdate = req.body.p_birthdate;
    

    //CHECK IF USER EXISTS
    const q = "SELECT * FROM users_db WHERE p_username = p_username";
    db.query(q, [p_username], (err, data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("User Already Exists!")

         //CREATE NEW USER
            // HASH THE PASSWORD
            console.log
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(p_password, salt)
            const date = parseISO(p_birthdate);
            const formattedDate = format(date, 'EEE, MMM dd, yyyy');

            const sqlInsert = "INSERT INTO users_db (p_username, p_email, p_password, p_fullname, p_contact, p_birthdate) VALUES (?, ?, ?, ?, ?, ?)";
            db.query(sqlInsert, [p_username, p_email, hashedPassword, p_fullname, p_contact, formattedDate], (err, result) =>{
                if (err) return res.status(500).json(err)
                return res.status(200).json("User has been created")
               
            
        });
    })



    


}


export const login = (req, res) =>{


}

export const logout = (req, res) =>{

}
