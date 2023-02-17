import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import "../css/login.css"

const Login = () => {

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
                    <form className='login__form'>
                        <input className='login__form-email' type="email" placeholder="Email" name = "email"  />
                        <input className='login__form-password' type="password" placeholder="Password" name = "password"  />
                        
                        <input type="submit" className='book-login' value="Login" />

                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login