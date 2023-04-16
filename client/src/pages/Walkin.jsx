import React, {useRef, useState, useEffect } from 'react';
import "../css/Walkin.css";
import AdminNavbar from './AdminNavbar';
import {faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {toast} from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const FULLNAME_REGEX = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
const PHONE_REGEX = /^(09|\+639)\d{9}$/;
const DATE_REGEX = /((0?[13578]|10|12)(-|\/)((0[0-9])|([12])([0-9]?)|(3[01]?))(-|\/)((\d{4})|(\d{2}))|(0?[2469]|11)(-|\/)((0[0-9])|([12])([0-9]?)|(3[0]?))(-|\/)((\d{2,4})))/;

const initialState = {
    p_username: "",
    p_fullname: "",
    p_email: "",
    p_password: "",
    p_contact: "",
    p_birthdate: "",
    p_gender: ""
};



const Walkin = () => {  
  const [state, setState] = useState(initialState);
    const {p_username, p_email, p_fullname, p_contact, p_birthdate, p_gender} = state;

    const [validName, setValidName]  = useState(false)
    const [userFocus, setUserFocus]  = useState(false)
    
    const [validEmail, setValidEmail]  = useState(false)
    const [emailFocus, setEmailFocus]  = useState(false)

    const [validPhone, setValidPhone]  = useState(false)
    const [phoneFocus, setPhoneFocus]  = useState(false)

    const [valiDate, setValidDate]  = useState(false)
    const [dateFocus, setDateFocus]  = useState(false)

    const [validFullName, setValidFullName]  = useState(false)
    const [FullNameFocus, setFullNameFocus]  = useState(false)

    
    const [errMsg, setErrMsg]  = useState("")

    const userRef = useRef();
    const errRef = useRef();


    useEffect(()=>{
        userRef.current.focus()
    }, [])

    useEffect(() => {
      if (p_fullname) {
        const formattedUsername = p_fullname
          .toLowerCase()
          .replace(/\s+/g, "");
        setState((prevState) => ({
          ...prevState,
          p_username: formattedUsername
        }));
        userRef.current.placeholder = formattedUsername;
        userRef.current.disabled = true;
      } else {
        setState((prevState) => ({
          ...prevState,
          p_username: ""
        }));
        userRef.current.placeholder = "username";
        userRef.current.disabled = true;
      }
    }, [p_fullname]);

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


    const handleSubmit = (e) => {
        e.preventDefault();
      
        if (!p_email || !p_fullname || !p_contact || !p_birthdate || !p_gender) {
          toast.error('Please provide value into each input field');
        } else {
          const formattedpassword = p_fullname + '123';
          axios
            .post('http://localhost:5000/register', {
              p_username,
              p_email,
              p_password: formattedpassword,
              p_fullname,
              p_contact,
              p_birthdate,
              p_gender
            })
            .then(() => {
              setState(initialState);
              toast.success('Registered Successfully');
            })
            .catch((err) => {
              if (!err.response) {
                setErrMsg('No Server Response');
              } else if (err.response?.status === 409) {
                setErrMsg('Username Taken!');
              } else {
                setErrMsg('Email is Already Exists!');
              }
              errRef.current.focus();
            });
        }
      };
        const handleChange = (event) => {
          const { name, value } = event.target;
          setState((prevState) => ({ ...prevState, [name]: value }));
        };

  return (
    
    <div>
      <header>
        <AdminNavbar />  
      </header>

      <body className='body-walkin'>
        <section className="walkin">
            <div className="walkin__card">
                <div className="walkin__right">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className='walkin__right-title'>Register a New Account Patient</h1>
                    <form className="walkin-form" onSubmit={handleSubmit}>

                    <div className='walkin-form__row'>
                            <div className='walkin-form__input'>
                              
                            <label className='walkin-form-name' htmlFor='p_fullname'>Full Name : 
                            <span className={validFullName ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck }  className="icon-add"/>
                                </span>
                                <span className={validFullName || !p_fullname ? "hide" : "Invalid"}>
                                    <FontAwesomeIcon className='icon-times' icon={faTimes} />
                                </span>

                            </label>
                            <input 
                                className='walkin-fullname'
                                type="text" 
                                placeholder="Enter full name" 
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

                        <div className='walkin-form__row'>
                            <div className='walkin-form__input'>
                              
                            <label className='walkin-form-name' htmlFor='p_username'>Username :</label>
                            <input
                                className='walkin-username' 
                                type="text" 
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

                        
                            
               
                        <div className='walkin-form__row'>
                            <div className='walkin-form__input'>
                              
                            <label className='walkin-form-name' htmlFor='p_email'>Email : 
                                <span className={validEmail ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck }  className="icon-add"/>
                                </span>
                                <span className={validEmail || !p_email ? "hide" : "Invalid"}>
                                    <FontAwesomeIcon className='icon-times' icon={faTimes} />
                                </span>
                            </label>
                            <input 
                                className='walkin-email'
                                type="email" 
                                placeholder="Enter patient email" 
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

                        <div className='walkin-form__row'>
                            <div className='walkin-form__input'>
                            <label htmlFor='p_gender' className="walkin-form-name">Gender: </label>
                                <select name="p_gender" id="p_gender" className="walkin-gender" value={p_gender || ""} onChange={handleChange}>
                                        <option value="" disabled selected> --- Choose One --- </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Another Gender">Another Gender</option>
                                </select>
                                </div>
                        </div>


                        
                        <div className='walkin-form__row'>
                            <div className='walkin-form__input'>
                              
                            <label className='walkin-form-name' htmlFor='p_contact'>Phone Number : 
                            <span className={validPhone ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck }  className="icon-add"/>
                                </span>
                                <span className={validPhone || !p_contact ? "hide" : "Invalid"}>
                                    <FontAwesomeIcon className='icon-times' icon={faTimes} />
                                </span>

                            </label>
                            <input 
                                className='walkin-phone'
                                type="text" 
                                placeholder="Enter phone number" 
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


                        <div className='walkin-form__row'>
                            <div className='walkin-form__input'>
                              
                            <label className='walkin-form-name' htmlFor='p_birthdate'>Birth Date : 
                            <span className={valiDate ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck }  className="icon-add"/>
                                </span>
                                <span className={valiDate || !p_birthdate ? "hide" : "Invalid"}>
                                    <FontAwesomeIcon className='icon-times' icon={faTimes} />
                                </span>
                            </label>

                            <input 
                                className='walkin-birthdate'
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
                            <button className='book-walkin'>Add Patient</button>
                    </form>
                </div>
            </div>
        </section>
            
      </body>
    </div>
  )
}

export default Walkin