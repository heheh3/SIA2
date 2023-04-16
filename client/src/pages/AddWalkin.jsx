import React, { useState, useEffect } from 'react';
import {useNavigate, useParams, Link } from "react-router-dom"
import "../css/Appointment.css";
import AdminNavbar from './AdminNavbar';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {toast} from "react-toastify";
import { parseISO, format } from 'date-fns';


const initialState = {
  b_date: "",
  b_time: "",
  b_procedure: "",
  b_note: "",
  b_status: "",
  b_patientType: ""
};



const AddWalkin = () => {

  const [state, setState] = useState(initialState);    
  const {b_date, b_status, b_time, b_procedure, b_note, b_patientType} = state;
  const [dateTime, setDateTime] = useState([])
  const [time, setTime] = useState([])
  const {id} = useParams();
  const [patientID, setPatientID] = useState(id)
  const minDate = new Date();
  const dateToday = format(new Date(), 'EEE, MMM dd, yyyy');
  const timeToday = format(new Date(), 'h:mm aa');
  minDate.setDate(minDate.getDate() + 2);

  const navigate = useNavigate();

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

    
    if (!b_procedure){
      if(!b_time || !b_date)
        toast.error("Please provide value into each input field");
      
    } else{

        if(b_patientType === "WALK-IN"){
          axios.post("http://localhost:5000/appointment/post", {
            patientID,
            b_date: dateToday,
            b_time: timeToday,
            b_procedure,
            b_note,
            b_status,
            b_patientType,
                })
        .then(()=>{
            setState({patientID: null , b_date: "", b_time: "", b_procedure: "", b_note: "", b_patientType: "",   b_patientType: ""})
            toast.success("Appointment Added Successfully");
        }).catch((err) => toast.error(err.response.data) );
 
        setTimeout(()=> navigate("/admin/services"), 300)

        }else{
          axios.post("http://localhost:5000/appointment/post", {
            patientID,
            b_date,
            b_time,
            b_procedure,
            b_note,
            b_status,
            b_patientType,
                })
        .then(()=>{
            setState({patientID: null , b_date: "", b_time: "", b_procedure: "", b_note: "", b_patientType: "",   b_patientType: ""})
            toast.success("Appointment Added Successfully");
        }).catch((err) => toast.error(err.response.data) );
 
        setTimeout(()=> navigate("/admin/appointment"), 300)

        }
      
      }
    }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setState({...state, [name]: value});
  
  }



  return (
    
    <div>
      <header>
        <AdminNavbar />  
      </header>

      <body>
        <Link to={`/admin/user`}>
            <button className='back__procedures'><span>Back</span></button>
        </Link>  
        <main className='display--flex'>
          <div className='home appointmentCard'>
            <h3 className='book__title'>WALK-IN</h3>
            <p>As soon as you as you contact our expert team, 
                we will get back to you <br /> as soon as possibe! Book
                an appointment at the comfort of your home and <br/>
                we'll take care of the rest!
            </p>


            <form onSubmit={handleSubmit} >

              <div className='book__row'>
                  <label htmlFor='b_patientType'>TYPE: </label>
                  <select name="b_patientType" id="b_patientType" value={b_patientType} onChange={handleChange} >
                          <option value="" disabled selected>Select your option</option>
                          <option value="WALK-IN">WALK-IN</option>
                          <option value="BOOK">BOOK</option>
                  </select>

                </div>

                {b_patientType === 'WALK-IN' ? (
                <>
            
                    <div className='book__row'>
                        <label htmlFor='b_date'>DATE: </label>
                        <input type='text' className='addWalkIN' id="b_date" name="b_date" value={dateToday || "" }  onChange={handleChange} disabled />
                  
                    </div>

                    <div className='book__row'>
                        <label htmlFor='b_time'>TIME: </label>
                        <input type='text' className='addWalkIN' id="b_time" name="b_time" value={timeToday || "" }  onChange={handleChange} disabled />
                  
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
                  <input type="submit" className='book-button' value="Add Service" />
                  
                
                </> 



                ) : (
                <>
                <div className='book-row'>
                    <input 
                        type='number' 
                        name='patientID' 
                        id='patientID'
                        value={setPatientID} 
                        hidden
                    />
                </div>
                    
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
                </>
                     
                     )}
     
         
 
            </form>
   
          </div>
   
        </main>
            
      </body>
    </div>
  )
}

export default AddWalkin