import { db } from "../connection.js";
import bcrypt from "bcrypt";
import {parseISO, format} from 'date-fns';
import jwt from "jsonwebtoken";


export const register = (req, res) =>{

    const p_username = req.body.p_username;
    const p_email = req.body.p_email;
    const p_password = req.body.p_password;
    const p_fullname = req.body.p_fullname;
    const p_contact = req.body.p_contact;
    const p_birthdate = req.body.p_birthdate;
    const p_gender = req.body.p_gender;
    

    //CHECK IF USER EXISTS
    const q = "SELECT * FROM users_db WHERE p_username = ?";
    db.query(q, [p_username], (err, data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("User Already Exists!")

         //CREATE NEW USER
            // HASH THE PASSWORD
            console.log
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(p_password, salt)
            const date = parseISO(p_birthdate);
            console.log(date)
            const formattedDate = format(date, 'MM/dd/yyyy');
            console.log(p_birthdate)
            console.log(formattedDate)

            const sqlInsert = "INSERT INTO users_db (p_username, p_email, p_password, p_fullname, p_contact, p_birthdate, p_gender) VALUES (?, ?, ?, ?, ?, ?, ?)";
            db.query(sqlInsert, [p_username, p_email, hashedPassword, p_fullname, p_contact, formattedDate, p_gender], (err, result) =>{
                if (err) return res.status(500).json(err)
                return res.status(200).json("User has been created")
        

           
            
        });
    })


}





export const login = (req, res) =>{

    const p_username = req.body.p_username;
    const q = "SELECT * FROM users_db WHERE p_username = ?";
    db.query(q, [p_username], (err, data)=>{
        if(err) return res.status(500).json(err);
        if(data.length === 0 ) return res.status(404).json("User Not Found!");

        const checkPassword = bcrypt.compareSync(req.body.p_password, data[0].p_password);

        if (!checkPassword) return res.status(400).json("Wrong Password!");

        const token = jwt.sign({user_id:data[0].user_id}, "secretkey");

        const { p_password, ...others } = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);

    
    })
}

export const logout = (req, res) => {
    res.clearCookie("accessToken",{
      secure:true,
      sameSite:"none"
    }).status(200).json("User has been logged out.")
  };
  