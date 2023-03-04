import PatientNavbar from './PatientNavbar'
import reminder from "../img/reminder.svg";
import atime from "../img/image 17.png";
import date from "../img/image 18.png";
import "../css/Reminder.css";
import "../css/Reschedule.css";
import React, { useState, useEffect, useContext } from 'react';
import {useNavigate, useParams} from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import DatePicker from 'react-datepicker';
import { parseISO, format } from 'date-fns';
import {toast} from "react-toastify";



const initialState = {
  b_date: "",
  b_time: "",
  b_procedure: "",
  b_note: "",
  b_status: "",
  b_paymentStatus: "",
  a_ID: null
};


const ReminderAppointment = () => {
  const [state, setState] = useState(initialState);
  const {b_date, b_time, b_procedure, b_note, b_status, b_paymentStatus, a_ID} = state;
  const [data, setData] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const [dateTime, setDateTime] = useState([])
  const [time, setTime] = useState([])



  const toggleVisibility = () => {
    setIsVisible(!isVisible);

  };


  const navigate = useNavigate();

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);



  useEffect (() => {
    axios.get(`http://localhost:5000/appointment/pending/get/${currentUser.user_id}`)
    .then(response => {
      const { b_date, b_time, b_procedure, b_note, b_paymentStatus, a_ID } = response.data[0];
      const isoDateString = format(new Date(b_date), 'yyyy-MM-dd');
      const parsedDate = parseISO(isoDateString);

      console.log(isoDateString)
      console.log("parse:" + parsedDate)
      setData({b_date:b_date, b_time: b_time})
      setState({b_date: parsedDate, b_time: b_time, b_procedure: b_procedure, b_note: b_note, b_paymentStatus: b_paymentStatus, a_ID: a_ID}); 
    }).catch(error => {
      console.error(error);
    });
      
  }, [currentUser.user_id])


  useEffect(() => {
    axios.get('http://localhost:5000/appointment/date-time')
      .then(response => {
        response.data.forEach(item => {
          const isoDateString = format(new Date(item.b_date), 'yyyy-MM-dd');
          const parsedDate = parseISO(isoDateString);
          setDateTime(prevArray => [...prevArray, {b_date: parsedDate, b_time: item.b_time}]);
          
       
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);



  useEffect(() => {
    setTime(new Array())
    dateTime.forEach(item => {
      if(JSON.stringify(b_date) === JSON.stringify(item.b_date)){
        setTime(prevArray => [...prevArray, item.b_time]);
       
      }else{
        console.log("No Reserved Date")
      }
    });
  }, [state, dateTime]);


  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!b_date || !b_time || !b_status){
        toast.error("Please provide value into each input field");

    } else{
        axios.put(`http://localhost:5000/admin/appointment/update/${a_ID}`, {
          b_date,
          b_time,
          b_procedure,
          b_note,
          b_status,  
          b_paymentStatus
      })
      
        .then(()=>{
          setState({b_date: "", b_time: "", b_procedure: "", b_note: "", b_status: "", b_paymentStatus: ""});
          toast.success("Appointment Updated Successfully");
          setTimeout(()=> navigate("/appointment"),500)
          
      
        
        })
        .catch((err) => toast.error(err.response.data));
        
      }
    }
  


const handleChange = (event) => {
  const {name, value} = event.target;
  setState({...state, [name]: value});
  
}





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
                {data && (
                <div className='reminder-date-time'>
                  <div className='date-time-icon'>
                    <img className='reminder__icon' src={date} alt="React Image" />    
                    
                    <div className='reminder__data'>{data.b_date}</div>
                  </div>
                  <div className='date-time-data'>
                  <img className='reminder__icon' src={atime} alt="React Image" />                
                    <div className='reminder__data'>{data.b_time}</div>
                  </div>
                </div>
                )}
                <div className='reminder-cancel-resched'>

                    <button class="open-button" onClick={toggleVisibility}>Reschedule/Cancel</button>
                    {isVisible && (
                          <div className="form-popup">
                          <form className="form-container" onSubmit={handleSubmit} >
                            <h1 className='form-container-h1'>Reschedule/Cancel</h1>  

                            <div className='book__row'>
                                <label htmlFor='date'>DATE: </label>
                                  <div className='date__container'>
                                  <DatePicker
                                    id='b_date'
                                    name='b_date'
                                    className='datepicker__style'
                                    selected={b_date}
                                    onChange={b_date => handleChange({ 
                                      target: { value: b_date, name: 'b_date' }
                                      
                                    })}
                                    minDate={minDate}
                                    dateFormat="MMM-dd-yyyy"
                                    filterDate={date => date.getDay() !== 0}
                                    placeholderText="Select a date"
                                    value={b_date || ""}
                                  />                          
                                  </div>
                                </div>
    
                                <div className='book__row'> 
                                  <label htmlFor='time'>TIME: </label>
                                  <select name="b_time" id="b_time" value={b_time || ""} onChange={handleChange} >
                                    <option value="" disabled selected>Select your option</option>
                                    <option value="8:00AM" disabled={time.includes('8:00AM')} >08:00 AM</option>
                                    <option value="9:00AM" disabled={time.includes('9:00AM')}>09:00 AM</option>
                                    <option value="10:00AM" disabled={time.includes('10:00AM')}>10:00 AM</option>
                                    <option value="11:00AM" disabled={time.includes('11:00AM')}>11:00 AM</option>
                                    <option value="1:00PM" disabled={time.includes('1:00PM')} >01:00 PM</option>
                                    <option value="2:00PM" disabled={time.includes('2:00PM')}>02:00 PM</option>
                                    <option value="3:00PM" disabled={time.includes('3:00PM')}>03:00 PM</option>				
                                    <option value="4:00PM" disabled={time.includes('4:00PM')}>04:00 PM</option>
                                </select>
                                </div>

                                <div className='book__row'>
                                  <label htmlFor='procedure' hidden>PROCEDURE: </label>
                                  <select id="b_procedure" name="b_procedure"  value={b_procedure || "" }  onChange={handleChange} hidden>
                                          <option value="" disabled selected>Select your option</option>
                                          <option value="Fillings">Fillings</option>
                                          <option value="Root Canal">Root Canal</option>
                                          <option value="Consultation">Consultation</option>
                                          <option value="Fixing Bridge">Fixing Bridge</option>
                                          <option value="Dental Implant">Dental Implant</option>
                                          <option value="Dental Crown">Dental Crown</option>
                                          <option value="X-Ray">X-Ray</option>
                                          <option value="Teeth Whitening"> Teeth Whitening</option>
                                          <option value="Dental Brace">Dental Brace</option>
                                          <option value="Tooth Extraction">Tooth Extraction</option>
                                          <option value="Scaling">Scaling</option>						
                                          <option value="Others">Others</option>
                                  </select>
                                </div>

                                <div className='book__row'>
                                  <label htmlFor='note' hidden>NOTES: </label>
                                  <textarea for="note" id="b_note" name="b_note" value={b_note || "" }  onChange={handleChange} placeholder='Add some notes... (optional)' hidden/>
                  
                                </div> 

                                <div className='book__row'>
                                  <label htmlFor='procedure'>STATUS: </label>
                                  <select id="b_status" name="b_status"  value={b_status || "" }  onChange={handleChange} >
                                          <option value="" disabled selected>Select your option</option>
                                          <option value="Rescheduled">Rescheduled</option>
                                          <option value="Cancelled">Cancelled</option>
                                  </select>
                                </div>

                                <input type="submit" value="UPDATE" className='btn-appointment-update' />
                                <button className='cancel-appointment' onClick={toggleVisibility}>CLOSE</button>
    
    
                            
                          </form>
                          </div>
                    )}
                </div>
              </div>
            </div>
   
        </main>
    </div>
  )
}

export default ReminderAppointment