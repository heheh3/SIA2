import React, { useState, useEffect } from 'react';
import {useNavigate, useParams, Link } from "react-router-dom"
import "../css/Appointment.css";
import { FaLocationArrow } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {toast} from "react-toastify";
import AdminNavbar from './AdminNavbar';

const initialState = {
  b_date: "",
  b_time: "",
  b_procedure: "",
  b_note: "",
  b_status: ""
};



const UpdateAppointment = () => {
  const [state, setState] = useState(initialState);
  const {b_status, b_time, b_procedure, b_note} = state;

  const {patientID} = useParams();

  useEffect (() => {

    axios.get(`http://localhost:5000/admin/appointment/get/${patientID}`)
    .then((resp) => setState({...resp.data[0] }))
  }, [patientID])

  const navigate = useNavigate();
  const [b_date, setSelectedDate] = useState('');
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!b_date || !b_time || !b_procedure){
        toast.error("Please provide value into each input field");
    } else{
        axios
        .put(`http://localhost:5000/admin/appointment/update/${patientID}`, {
          b_date,
          b_time,
          b_procedure,
          b_note,
          b_status
    })
    .then(()=>{
      setState({b_date: "", b_time: "", b_procedure: "", b_note: "", b_status: ""});
    })
     .catch((err) => toast.error(err.response.data));
    toast.success("Appointment Updated Successfully");
    }

    setTimeout(()=> navigate("/appointment"),500)
      }
    


const handleChange = (event) => {
  const {name, value} = event.target;
  setState({b_time, b_procedure, b_note, b_status, [name]: value});
}

const handleChangeDate = (date) => {

  setSelectedDate(date);

}




  return (
    
    <div>
      <header>
        <AdminNavbar />  
      </header>

      <body>
        <main>
          <div className='update appointmentCard'>
            <h3 className='book__title'>UPDATE AN APPOINTMENT</h3>

            <form onSubmit={handleSubmit} >
              <div className='book__row'>
                <label htmlFor='date'>DATE: </label>
                <div className='date__container'>
                <DatePicker
                  id='b_date'
                  name='b_date'
                  selected={b_date}
                  onChange={handleChangeDate}
                  minDate={minDate}
                  dateFormat="MM-dd-yyyy"
                  filterDate={date => date.getDay() !== 0}
                  placeholderText="Select a date"
                  value={b_date || ""}     
                  
            
                />
               
                </div>
           
            
              </div>

            <div className='book__row'> 
                <label htmlFor='time'>TIME: </label>
                <select name="b_time" id="b_time" value={b_time || ""} onChange={handleChange}  >
                        <option value="" disabled selected>Select your option</option>
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

              <div className='book__row'>
                <label htmlFor='procedure'>STATUS: </label>
                <select id="b_status" name="b_status"  value={b_status || "" }  onChange={handleChange} >
                        <option value="" disabled selected>Select your option</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Rescheduled">Rescheduled</option>
                        <option value="Pending">Pending</option>
                        <option value="Canceled">Cancelled</option>
                    
                        
                </select>
              </div>

              <input type="submit" value="UPDATE" />
 
            </form>
          </div>
        </main>
            
      </body>
    </div>
  )
}

export default UpdateAppointment