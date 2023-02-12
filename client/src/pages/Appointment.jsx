import React, { useState, useEffect } from 'react';
import {useNavigate, useParams, Link } from "react-router-dom"
import "../css/Appointment.css";
import PatientNavbar from './PatientNavbar';
import { FaLocationArrow } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {toast} from "react-toastify";



const initialState = {
  b_date: "",
  b_time: "",
  b_procedure: "",
  b_note: "",
  b_status: ""
};



const Appointment = () => {
  const [state, setState] = useState(initialState);
  const {b_date, b_status, b_time, b_procedure, b_note} = state;

  const navigate = useNavigate();
  // const [b_date, setSelectedDate] = useState("")
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!b_date || !b_time || !b_procedure){
        toast.error("Please provide value into each input field");
    } else{
        axios.post("http://localhost:5000/appointment/post", {
            b_date,
            b_time,
            b_procedure,
            b_note,
            b_status
        })
        .then(()=>{
            setState({b_date: "", b_time: "", b_procedure: "", b_note: ""});
        }).catch((err) => toast.error(err.response.data) );
 
        toast.success("Appointment Added Successfully");
      
      

        setTimeout(()=> navigate("/appointment"), 300)
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

      <body>
        <main className='display--flex'>
          <div className='home intro'>
            <h3 className='intro__title'>TOOTHFULLY YOURS</h3>
            <h1 className='intro__description'> We&apos;re open and <br/>welcoming<br/>patients.</h1>
            <p className='intro__description2'>We have implemented a number of safety measures
                      to ensure not <br/> only dental health but also the safety
                      of both our patients and team.</p>
                      <p className='intro__description2'><strong>Contact Number: </strong> (+63)9123456789 &nbsp; <strong>Email:</strong> toothfully@gmail.com</p>
            <div className='intro__location'>
                <a href=''><FaLocationArrow /> Sampaguita St., Mintal 8000, Davao City, Philippines</a>  
            </div>
          </div>  
          <div className='home appointmentCard'>
            <h3 className='book__title'>BOOK AN APPOINTMENT</h3>
            <p>As soon as you as you contact our expert team, 
                we will get back to you <br /> as soon as possibe! Book
                an appointment at the comfort of your home and <br/>
                we'll take care of the rest!
            </p>

            <form onSubmit={handleSubmit} >
              <div className='book__row'>
                <label htmlFor='date'>DATE: </label>
                <div className='date__container'>
                <DatePicker
                  id='b_date'
                  name='b_date'
                  className='datepicker__style'
                  selected={b_date}
                  onChange={b_date => handleChange({ target: { value: b_date, name: 'b_date' } })}
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
                        <option value="8:00AM">08:00 AM</option>
                        <option value="9:00AM">09:00 AM</option>
                        <option value="10:00AM">10:00 AM</option>
                        <option value="11:00AM">11:00 AM</option>
                        <option value="1:00PM">01:00 PM</option>
                        <option value="2:00PM">02:00 PM</option>
                        <option value="3:00PM">03:00 PM</option>				
                        <option value="4:00PM">04:00 PM</option>
                    </select>

              </div>

              <div className='book__row'>
                <label htmlFor='procedure'>PROCEDURE: </label>
                <select id="b_procedure" name="b_procedure"  value={b_procedure || "" }  onChange={handleChange} >
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
                <label htmlFor='note'>NOTES: </label>
                <textarea for="note" id="b_note" name="b_note" value={b_note || "" }  onChange={handleChange} placeholder='Add some notes... (optional)' />
 
              </div> 

              <input type="submit" className='book-button' value="Book" />
 
            </form>
          </div>
        </main>
            
      </body>
    </div>
  )
}

export default Appointment