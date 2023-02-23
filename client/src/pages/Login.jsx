import React, { useRef ,useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom"
import "../css/login.css"
import AuthContext from '../js/authContext';
import axios from "axios";
const LOGIN_URL = '/auth'

const Login = () => {

    // const {setAuth} = useContext(AuthContext)

    const userRef = useRef();
    const errRef = useRef();

    const[p_email, setEmail] = useState('')
    const[p_password, setPassword] = useState('')

    const[errMsg, setErrMsg] = useState('')
    const[success, setSucess] = useState(false)

    useEffect(()=>{
        userRef.current.focus()
    }, [])


    useEffect(()=>{
        setErrMsg('')
    }, [p_email, p_password])

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const response = await axios.post(LOGIN_URL, JSON.stringify({p_email, p_password}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });

            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            // setAuth({p_email, p_password, roles, accessToken})
            // setEmail('')
            // setPassword('')
            // setSucess(true)
        }catch{
            // if(!err?.response){
            //     setErrMsg("No Server Response")
            // }else if(err.response?.status === 400){
            //     setErrMsg("Missing Username or Password")

            // }else if(err.response?.status === 401){
            //     setErrMsg("Unauthorized")
            // }else{
            //     setErrMsg("Login Failed")
            // }
            errRef.current.focus();
        }
      
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Hello</h1>
                </section>
            ) : (
        
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
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit} className='login__form'>
                        <input 
                            className='login__form-email' 
                            type="email"
                            ref={userRef}
                            autoComplete="off" 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email" 
                            id="p_email"
                            name = "p_email"
                            value={p_email} 
                            required 
                        />
                        <input 
                            className='login__form-password' 
                            type="password" 
                            placeholder="Password" 
                            name = "p_password" 
                            onChange={(e) => setPassword(e.target.value)}
                            id="p_password"
                            value={p_password} 
                            required  
                            
                        />
                        
                        <input type="submit" className='book-login' value="Login" />

                    </form>
                </div>
            </div>
        </div>
        )}
            </>
    )
    
}

export default Login