import React, { useState, useEffect, useRef, useContext } from 'react';
import {useNavigate, useParams } from "react-router-dom"
import ProfileNavbar from './ProfileNavbar'
import PatientNavbar from './PatientNavbar'
import "../css/Profile.css";
import { FaAt  } from "react-icons/fa";
import axios from "axios";
import {toast} from "react-toastify";
import { parseISO, format } from 'date-fns';
import { AuthContext } from "../context/authContext";


const initialState = {
  p_username: "",
  p_email: "",
  p_fullname: "",
  p_contact: "",
  p_birthdate: ""
};




const ProfileSettings = () => {
  const [state, setState] = useState(initialState);
  const {p_username, p_email, p_fullname , p_contact, p_birthdate} = state;
  const {id} = useParams();

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!p_username || !p_email || !p_fullname || !p_contact || !p_birthdate ){
        
        toast.error("Please provide value into each input field");
        toast.error(p_username )
        console.log(p_username)
        console.log(p_email)

    } else{
        axios.put(`http://localhost:5000/admin/patient/update/${id}`, {
          p_username,
          p_email,
          p_fullname,
          p_contact,
          p_birthdate,  
      })
      
        .then(()=>{
          setState({p_username: "", p_email: "", p_fullname: "", p_contact: "", p_birthdate: ""});
      
        
        })
        .catch((err) => toast.error(err.response.data));
        toast.success("Profile Settings Updated Successfully");
      

        setTimeout(()=> navigate("/profile/profile-settings"),500)
      }
    }

    
  // useEffect (() => {

  //   axios.get(`http://localhost:5000/admin/patient/get/${id}`)
  //   .then(response => {
  //     const { b_date, b_time, b_procedure, b_note, b_status } = response.data[0];
  //     const isoDateString = format(new Date(b_date), 'yyyy-MM-dd');
  //     const parsedDate = parseISO(isoDateString);

  //     setState({b_date: parsedDate, b_time: b_time, b_procedure: b_procedure, b_note: b_note, b_status: b_status}); 
  //   }).catch(error => {
  //     console.error(error);
  //   });
      
  // }, [id])

  


const handleChange = (event) => {
  const {name, value} = event.target;
  setState({...state, [name]: value});
  
}




  const ref = useRef();
  return (
    <div>
      <header>
        <PatientNavbar />
      </header>
      <body>
        <main>
            <div className='profileNavbar__container'>
              <ProfileNavbar />
              <div className='profile__container'>
                <form onSubmit={handleSubmit} className='profileSettings__form'>
                    <div className='profileSettings__row'>
                      <div className='profileSettings__row--col'>
                        <label className='label__input' htmlFor='user_id'>Patient ID:</label>
                        <input type='text' 
                          name='user_id' 
                          id='user_id'
                          className='patient__input' 
                          placeholder='' 
                          onChange={handleChange}
                          value={currentUser.user_id} 
                  
                          disabled 
                          />

                      </div>
                      <div className='profileSettings__row--col'>
                        <label className='label__input' htmlFor='p_fullname'>Full Name:</label>
                        <input type='text' 
                          name='p_fullname' 
                          id='p_fullname'
                          className='patient__input' 
                          onChange={handleChange}
                          placeholder='Enter your Full Name ...' 
                          value={p_fullname || "" || currentUser.p_fullname} 

                          />
                      </div>
                    </div>

                    <div className='profileSettings__row'>
                      <div className='profileSettings__row--col'>
                        <label className='label__input' htmlFor='p_username'>Username:</label>
                        <div className='username__input--container'>
                          <span className='faAt-container'><FaAt className="faAt-icon"/></span>
                          <input type='text' 
                            name='p_username' 
                            id='p_username'
                            className='patient__input username__style' 
                            onChange={handleChange}
                            placeholder='Enter your Username ...' 
                            value={p_username || "" || currentUser.p_username} 
                          />
              
                        </div>
                       
                      </div>
                      <div className='profileSettings__row--col'>
                        <label className='label__input' htmlFor='p_email'>Email:</label>
                        <input type='email' 
                          name='p_email' 
                          id='p_email'
                          className='patient__input' 
                          onChange={handleChange}
                          placeholder='Enter your Email ...' 
                          value={p_email || "" || currentUser.p_email} 

                            />
                      </div>
                    </div>
                    <div className='profileSettings__row'>
                      <div className='profileSettings__row--col'>
                        <label className='label__input' htmlFor='p_contact'>Phone:</label>
                        <input type='text' 
                          name='p_contact' 
                          id='p_contact'
                          className='patient__input' 
                          onChange={handleChange}
                          placeholder='Enter your Contact Number ...' 
                          value={p_contact || "" || currentUser.p_contact} 

                        />
                      </div>
                      <div className='profileSettings__row--col'>
                      <label className='label__input' htmlFor='p_birthdate'>Birth Date:</label>
                        <input type='text'
                          name='p_birthdate' 
                          id='p_birthdate'
                          className='patient__input' 
                          onChange={handleChange}
                          placeholder='mm/dd/yyyy'
                          ref={ref}  
                          onFocus={() => (ref.current.type = "date")}
                          onBlur={() => (ref.current.type = "date")}            
                          value={p_birthdate || "" || currentUser.p_birthdate} 

                              />
                      </div>
                    </div>
                    <div className='profileSettings__row'>
                      <div className='profileSettings__row--col'>
                            <input type="submit" className='profile-update' value="UPDATE" />
                      </div>
                    </div>
                </form>
              </div>
            </div>
        </main>
      </body>
    </div>
  )
}

export default ProfileSettings