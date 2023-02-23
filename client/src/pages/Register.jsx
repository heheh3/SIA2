import React, {useRef, useState, useEffect, useContext } from 'react';
import {useNavigate, useParams, Link } from "react-router-dom"
import "../css/register.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {toast} from "react-toastify";
import DatePicker from 'react-datepicker';
import { parseISO, format } from 'date-fns';
import {faCheck, faTimes, faInfoCircle, faC} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from './Login';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const FULLNAME_REGEX = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
const PHONE_REGEX = /^(09|\+639)\d{9}$/
const DATE_REGEX = /((0?[13578]|10|12)(-|\/)((0[0-9])|([12])([0-9]?)|(3[01]?))(-|\/)((\d{4})|(\d{2}))|(0?[2469]|11)(-|\/)((0[0-9])|([12])([0-9]?)|(3[0]?))(-|\/)((\d{2,4})))/

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


    
    const [user, setUser] = useState('')
    const [validName, setValidName]  = useState(false)
    const [userFocus, setUserFocus]  = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd]  = useState(false)
    const [pwdFocus, setPwdFocus]  = useState(false)
    
    const [validEmail, setValidEmail]  = useState(false)
    const [emailFocus, setEmailFocus]  = useState(false)

    const [validPhone, setValidPhone]  = useState(false)
    const [phoneFocus, setPhoneFocus]  = useState(false)

    const [valiDate, setValidDate]  = useState(false)
    const [dateFocus, setDateFocus]  = useState(false)

    const [validFullName, setValidFullName]  = useState(false)
    const [FullNameFocus, setFullNameFocus]  = useState(false)

    const [matchPwd, setMatchPwd]  = useState('')
    const [validMatch, setValidMatch]  = useState(false)
    const [matchFocus, setMatchFocus]  = useState(false)

    const [errMsg, setErrMsg]  = useState("")
    const [success, setSuccess]  = useState(false)

    const userRef = useRef();
    const errRef = useRef();

    useEffect(()=>{
        userRef.current.focus()
    }, [])

    useEffect(()=>{
        const result = USER_REGEX.test(p_username)
        console.log(typeof(p_username))
        console.log(result);
        setValidName(result);
    }, [p_username]);

    useEffect(()=>{
        const result = PWD_REGEX.test(p_password)
        console.log(result);
        console.log(p_username);
        setValidPwd(result);
        const match = p_password === matchPwd;
        setValidMatch(match)
    }, [p_password, matchPwd]);

    useEffect(()=>{
        const result = EMAIL_REGEX.test(p_email)
        console.log(result);
        console.log(p_email);
        setValidEmail(result);
    }, [p_email]);

    useEffect(()=>{
        const result = FULLNAME_REGEX.test(p_fullname)
        console.log(result);
        console.log(p_fullname);
        setValidFullName(result);
    }, [p_fullname]);

    useEffect(()=>{
        const result = PHONE_REGEX.test(p_contact)
        console.log(result);
        console.log(p_contact);
        setValidPhone(result);
    }, [p_contact]);

    useEffect(()=>{
        const result = DATE_REGEX.test(p_birthdate)
        console.log(result);
        console.log(p_birthdate);
        setValidDate(result);
    }, [p_birthdate]);



    useEffect(()=>{
        setErrMsg('')
    }, [p_username, p_password, matchPwd]);
    const navigate = useNavigate();

    const [err, setErr] = useState(null)

    const handleSubmit = (e) =>{
        e.preventDefault();

        if (!p_username || !p_email || !p_password || !p_fullname || !p_contact || !p_birthdate){
            toast.error("Please provide value into each input field");
        }else{
            try{
            const response =  axios.post("http://localhost:5000/users/post", {
                p_username,
                p_email,
                p_password,
                p_fullname,
                p_contact,
                p_birthdate
            
            }).then(()=>{
                setState({p_username: "", p_email: "", p_password: "", p_fullname: "", p_contact: "", p_birthdate: "" });
                setSuccess(true);
                toast.success("Registered Successfully");
            })
            
            }  catch(err){
                // if (!err.response){
                //     setErrMsg("No Server Response")
                // } else if (err.response?.errno == 23000){
                //     setErrMsg("Username Taken")
                // } else{
                //     setErrMsg("Registration Failed")
                // }
                console.log(err)
                setErrMsg("Hello")
                errRef.current.focus()


            }
            
  
               
                // setTimeout(()=> navigate("/register"), 500)
    }   

        }

        const handleChange = (event) => {
            const {name, value} = event.target;
            setState({...state, [name]: value});
          }
          
    
    return (
     
        <section className="register">
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
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className='register__right-title'>Register</h1>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className='register-form__row'>
                            <div className='register-form__input'>
                              
                            <label className='register-form-name' htmlFor='p_username'>Username:
                                <span className={validName ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck }  className="icon-add"/>
                                </span>
                                <span className={validName || !p_username ? "hide" : "Invalid"}>
                                    <FontAwesomeIcon className='icon-times' icon={faTimes} />
                                </span>
                            </label>
                            <input
                                className='register-username' 
                                type="text" 
                                placeholder="Enter Your Username..." 
                                ref={userRef}
                                autoComplete="off"
                                id="p_username" 
                                name="p_username" 
                                value={p_username || ""} 
                                onChange={handleChange} 
                                aria-invalid = {validName ? "false" : "true"}
                                aria-describedby = "uidnode"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                 
                            />
                            </div>
                   
                           <p id="uidnode" className={userFocus && p_username && !validName ? "Intructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> 4 to 25 characters. <br />
                                Must begin with a letter. <br />
                                Letters, numbers, underscores, hypens allowed.

                            </p>
                        </div>
                            
               
                        <div className='register-form__row'>
                            <div className='register-form__input'>
                              
                            <label className='register-form-name' htmlFor='p_email'>Email: 
                                <span className={validEmail ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck }  className="icon-add"/>
                                </span>
                                <span className={validEmail || !p_email ? "hide" : "Invalid"}>
                                    <FontAwesomeIcon className='icon-times' icon={faTimes} />
                                </span>
                            </label>
                            <input 
                                className='register-email'
                                type="email" 
                                placeholder="Enter Your Email" 
                                id="p_email" 
                                name="p_email" 
                                value={p_email || ""} 
                                onChange={handleChange} 
                                aria-invalid = {validEmail ? "false" : "true"}
                                aria-describedby = "uidnode"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                 
                            /> 
                         
                            </div>
                   
                           <p id="uidnode" className={emailFocus && p_email && !validEmail ? "Intructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Allowed characters: letters (a-z), numbers, underscores, periods, and dashes. <br />
                           
                      

                            </p>
                        </div>

                        <div className='register-form__row'>
                            <div className='register-form__input'>
                              
                            <label className='register-form-name' htmlFor='p_password'>Password: 
                                <span className={validPwd ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck }  className="icon-add"/>
                                </span>
                                <span className={validPwd || !p_password ? "hide" : "Invalid"}>
                                    <FontAwesomeIcon className='icon-times' icon={faTimes} />
                                </span>
                            </label>

                            <input 
                                className='register-password'
                                type="password" 
                                placeholder="Enter Password" 
                                id="p_password" 
                                name="p_password" 
                                value={p_password || ""} 
                                onChange={handleChange} 
                                aria-invalid = {validPwd ? "false" : "true"}
                                aria-describedby = "uidnode"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                 
                            /> 
                         
                            </div>
                   
                           <p id="uidnode" className={pwdFocus && p_password && !validPwd ? "Intructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters. <br />
                                Must include uppercase and lowercase letters, a number and a special character. <br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span>
                                <span aria-label="at symbol">@</span> <span aria-label="dollar Sign">$</span><span aria-label='percent'>%</span>

                            </p>
                        </div>

                        <div className='register-form__row'>
                            <div className='register-form__input'>
                              
                            <label className='register-form-name' htmlFor='p_password'>Confirm Password: 
                                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck }  className="icon-add"/>
                                </span>
                                <span className={validMatch || !matchPwd ? "hide" : "Invalid"}>
                                    <FontAwesomeIcon className='icon-times' icon={faTimes} />
                                </span>
                            </label>
                            <input 
                                className='register-password'
                                type="password" 
                                placeholder="Confirmation Password" 
                                id="cp_password" 
                                name="cp_password" 
                         
                                onChange={(e) => setMatchPwd(e.target.value)} 
                                aria-invalid = {validMatch ? "false" : "true"}
                                aria-describedby = "confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                 
                            /> 
                         
                            </div>
                   
                           <p id="confirmnote" className={matchFocus && !validMatch ? "Intructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Must match the first password input

                            </p>
                        </div>


                        <div className='register-form__row'>
                            <div className='register-form__input'>
                              
                            <label className='register-form-name' htmlFor='p_fullname'>Enter Your Full Name: 
                            <span className={validFullName ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck }  className="icon-add"/>
                                </span>
                                <span className={validFullName || !p_fullname ? "hide" : "Invalid"}>
                                    <FontAwesomeIcon className='icon-times' icon={faTimes} />
                                </span>

                            </label>
                            <input 
                                className='register-fullname'
                                type="text" 
                                placeholder="Enter your Full Name" 
                                id="p_fullname" 
                                name="p_fullname" 
                                value={p_fullname || ""}
                                onChange={handleChange} 
                                aria-invalid = {validFullName ? "false" : "true"}
                                aria-describedby = "uidnote"
                                onFocus={() => setFullNameFocus(true)}
                                onBlur={() => setFullNameFocus(false)}
                                 
                                 
                            />
          
                        
                         
                            </div>
                   
                            <p id="uidnode" className={FullNameFocus && p_fullname && !validFullName ? "Intructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Invalid Name. Name must starts with letter <br />
                            </p>
                        </div>

                        <div className='register-form__row'>
                            <div className='register-form__input'>
                              
                            <label className='register-form-name' htmlFor='p_contact'>Phone Number: 
                            <span className={validPhone ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck }  className="icon-add"/>
                                </span>
                                <span className={validPhone || !p_contact ? "hide" : "Invalid"}>
                                    <FontAwesomeIcon className='icon-times' icon={faTimes} />
                                </span>

                            </label>
                            <input 
                                className='register-phone'
                                type="text" 
                                placeholder="Enter your Phone Number" 
                                id="p_contact" 
                                name="p_contact" 
                                value={p_contact || ""}
                                onChange={handleChange} 
                                aria-invalid = {validPhone ? "false" : "true"}
                                aria-describedby = "uidnote"
                                onFocus={() => setPhoneFocus(true)}
                                onBlur={() => setPhoneFocus(false)}
                                 
                                 
                            />
          
                        
                         
                            </div>
                   
                            <p id="uidnode" className={phoneFocus && p_contact && !validPhone ? "Intructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Phone Number must be 11 digits and starts with 09xxxxxxxxx   <br />
                            </p>
                        </div>


                        <div className='register-form__row'>
                            <div className='register-form__input'>
                              
                            <label className='register-form-name' htmlFor='p_birthdate'>Birth Date: 
                            <span className={valiDate ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck }  className="icon-add"/>
                                </span>
                                <span className={valiDate || !p_birthdate ? "hide" : "Invalid"}>
                                    <FontAwesomeIcon className='icon-times' icon={faTimes} />
                                </span>
                            </label>

                            <input 
                                className='register-birthdate'
                                type="date" 
                                placeholder="mm/dd/yyyy" 
                                id="p_birthdate" 
                                name="p_birthdate" 
                                value={p_birthdate || ""}
                                onChange={handleChange} 
                                aria-invalid = {p_birthdate ? "false" : "true"}
                                aria-describedby = "uidnote"
                                onFocus={() => setDateFocus(true)}
                                onBlur={() => setDateFocus(false)}
                                 
                                 
                            />
          
                        
                         
                            </div>
                   
                            <p id="uidnode" className={dateFocus && p_birthdate && !valiDate ? "Intructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Date Must be Valid!<br />
                            </p>
                        </div>
                     
                  
                        {err && err}            

                
                            <button className='book-register'>Sign Up</button>
              

                    
                    </form>
                </div>
            </div>
        </section>
          
    )
}

export default Register