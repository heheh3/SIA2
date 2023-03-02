import PatientNavbar from './PatientNavbar'
import reminder from "../img/reminder.svg";
import time from "../img/image 17.png";
import date from "../img/image 18.png";
import "../css/Reminder.css";
import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {toast} from "react-toastify";
import { parseISO, format } from 'date-fns';
import { AuthContext } from "../context/authContext";


const initialState = {
  b_date: "",
  b_time: "",
};



const ReminderAppointment = () => {
  const [state, setState] = useState(initialState);
  const {b_date, b_time} = state;
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);



  useEffect (() => {

    axios.get(`http://localhost:5000/admin/appointment/get/${currentUser.user_id}`)
    .then(response => {
      const { b_date, b_time } = response.data[0];
      const isoDateString = format(new Date(b_date), 'yyyy-MM-dd');
      const parsedDate = parseISO(isoDateString);

      console.log(isoDateString)
      console.log("parse:" + parsedDate)

      setState({b_date: parsedDate, b_time: b_time}); 
    }).catch(error => {
      console.error(error);
    });
      
  }, [currentUser.user_id])


  return (
    <div>
        <header>
            <PatientNavbar />
        </header>
        <main style={{margin: '0'}}>


  
        
          <div className='reminder'>
              <div className='reminder__col move-right'>
                  <img className='reminder__image' src={reminder} alt="React Image" />
              </div>
              <div className='reminder__col'>
                <h1 className='reminder-title color'>APPOINTMENT REMINDER</h1>
                <p className='reminder-title--description darkcolor'>This is a reminder that you have an appointment <br/> schedule for this time and date</p>
                <span className='reminder-header'></span>
                <div className='reminder-date-time'>
                  <div className='date-time-icon'>
                    <img className='reminder__icon' src={date} alt="React Image" />    
                    
                    <div className='reminder__data'>{}</div>
                  </div>
                  <div className='date-time-data'>
                  <img className='reminder__icon' src={time} alt="React Image" />                
                    <div className='reminder__data'>{}</div>
                  </div>
                </div>
                <div className='reminder-cancel-resched'>
                    <button className='btn-ap resched'>Reschedule</button>
                    <button className='btn-ap cancel'>Cancel</button>
                </div>
              </div>
            </div>
   
        </main>
    </div>
  )
}

export default ReminderAppointment