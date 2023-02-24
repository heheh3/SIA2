import React, { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom"
import "../css/login.css";
import { AuthContext } from "../context/authContext";

const Login = () => {

    
    const [inputs, setInputs] = useState({
        p_username: "",
        p_password: "",
      });
      const [err, setErr] = useState(null);
      const errRef = useRef();
    
      const navigate = useNavigate()
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
      const { login } = useContext(AuthContext);

    // Username: admin 
    // Password: Admin123@

      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await login(inputs);
            if(inputs.p_username === "admin"){
              setTimeout(()=> navigate("/admin/appointment"), 500)
            } else{
              setTimeout(()=> navigate("/appointment/"), 500)
            } 
           
   

        } catch (err) {
          setErr(err.response.data);
          errRef.current.focus()
      
        
        }
      };
    
    return (
   
        <div className="login">
            <div className="card">
                <div className="login__left">
                    <h1 className='login__left-title'>ToothFully Yours</h1>
                    <h2 className='login__left-title2'>Dental Clinic</h2>
                    <p className='login__left-description'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Quas fugiat, pariatur reprehenderit facere quod dolore non corporis sit porro eos iste sunt, 
                        et accusamus iusto modi aliquam. Dignissimos, velit porro.
                    </p>
                    <span className='login__left-span'>Don't you have an account?</span>
                    <Link to="/register">
                        <button className='register-button'>Register</button>
                    </Link>
                </div>
                <div className="login__right">
                    <h1 className='login__right-title'>Login</h1>
                    <form onSubmit={handleLogin} className='login__form'>
                        <input 
                            className='login__form-username' 
                            type="text"
                            autoComplete="off" 
                            onChange={handleChange}
                            placeholder="Username" 
                            id="p_username"
                            name = "p_username"
                            required 
                        />
                        <input 
                            className='login__form-password' 
                            type="password" 
                            placeholder="Password" 
                            name = "p_password" 
                            onChange={handleChange}
                            id="p_password"
                            required  
                            
                        />
                        
                         <p ref={errRef} className={err && err ? "errorStyle" : "offscreen"} aria-live="assertive">  {err && err }</p>
              
                
                      
                        <input type="submit" className='book-login' value="Login" />

                    </form>
                </div>
            </div>
        </div>
    )
    
}

export default Login