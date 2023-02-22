import React, { useState, useEffect } from 'react';
import {useNavigate, useParams, Link } from "react-router-dom"
import "../css/register.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {toast} from "react-toastify";
import DatePicker from 'react-datepicker';
import { parseISO, format } from 'date-fns';


const initialState = {
    p_username: "",
    p_email: "",
    p_password: "",
    p_fullname: "",
    p_contact: "",
    p_birthdate: ""
  };
  

const Register = () => {

    const [state, setState] = useState(initialState);
    const {p_username, p_email, p_password, p_fullname, p_contact, p_birthdate} = state;



    const navigate = useNavigate();

    const [err, setErr] = useState(null)

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (!p_username || !p_email || !p_password || !p_fullname || !p_contact || !p_birthdate){
            toast.error("Please provide value into each input field");
        } else{
            axios.post("http://localhost:5000/users/post", {
                p_username,
                p_email,
                p_password,
                p_fullname,
                p_contact,
                p_birthdate
            })
            .then(()=>{
                setState({p_username: "", p_email: "", p_password: "", p_fullname: "", p_contact: "", p_birthdate: "" });
            }).catch((err) => setErr(err.response.data) );
     
            toast.success("Registered Successfully");
          
          
    
            setTimeout(()=> navigate("/login"), 500)
          }
        }

        const handleChange = (event) => {
            const {name, value} = event.target;
            setState({...state, [name]: value});
          }
          
    
    return (
        <div className="register">
            <div className="register__card">
                <div className="register__left">
                    <h1 className='register__left-title'>Brighter Smiles</h1>
                    <h2 className='register__left-title2'>Create your account!</h2>
                    <p className='register__left-description'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Quas fugiat, pariatur reprehenderit facere quod dolore non corporis sit porro eos iste sunt, 
                        et accusamus iusto modi aliquam. Dignissimos, velit porro.
                    </p>
                    <span className='register_span'>Don't you have an account?</span>
                    <Link to="/login">
                        <button className='login-button'>Login</button>
                    </Link>
                </div>
                <div className="register__right">
                    <h1 className='register__right-title'>Register</h1>
                    <form onSubmit={handleSubmit} className="register-form">
                        <input
                            className='register-username' 
                            type="text" 
                            placeholder="Username" 
                            id="p_username" 
                            name="p_username" 
                            value={p_username || ""} 
                            onChange={handleChange} 
                        />

                        <input 
                            className='register-email' 
                            type="email" 
                            placeholder="Email" 
                            id="p_email" 
                            name="p_email" 
                            value={p_email || ""} 
                            onChange={handleChange} 
                        />

                        <input 
                            className='register-password'
                            type="password" 
                            placeholder="Password" 
                            id="p_password" 
                            name="p_password" 
                            value={p_password || ""} 
                            onChange={handleChange} 
                        /> 

                        <input
                            className='register-fullname' 
                            type="text" 
                            placeholder="Full Name" 
                            id="p_fullname" 
                            name="p_fullname" 
                            value={p_fullname || ""} 
                            onChange={handleChange}
                        />

                        <input 
                            className='register-phone'
                            type="text" 
                            placeholder="Contact Number" 
                            id="p_contact" 
                            name="p_contact" 
                            value={p_contact || ""} 
                            onChange={handleChange} 
                        /> 

                        <input 
                            className='register-birthdate'
                            type="date" 
                            placeholder="mm/dd/yyyy" 
                            id="p_birthdate" 
                            name="p_birthdate" 
                            value={p_birthdate || ""} 
                            onChange={handleChange} 
                        /> 

                        {err && err}            

                    
                        <input type="submit" className='book-register' value="Register" />      
                    
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Register