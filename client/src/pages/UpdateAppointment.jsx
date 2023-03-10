import React, { useState, useEffect } from 'react';
import {useNavigate, useParams, Link } from "react-router-dom"
import "../css/Appointment.css";  
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {toast} from "react-toastify";
import AdminNavbar from './AdminNavbar';
import { parseISO, format } from 'date-fns';

const initialState = {
  b_date: "",
  b_time: "",
  b_procedure: "",
  b_note: "",
  b_status: "",
  b_paymentStatus: "",
  procedFee: ""
};



const UpdateAppointment = () => {
  const [state, setState] = useState(initialState);
  const {b_date, b_time, b_procedure, b_note, b_status, b_paymentStatus, procedFee} = state;
  const {id} = useParams();
  const [dateTime, setDateTime] = useState([])
  const [time, setTime] = useState([])

  console.log(id)


  const navigate = useNavigate();
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);


  
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


  useEffect (() => {

    axios.get(`http://localhost:5000/admin/appointment/get/${id}`)
    .then(response => {
      const { b_date, b_time, b_procedure, b_note, b_status, b_paymentStatus, procedFee} = response.data[0];
      const isoDateString = format(new Date(b_date), 'yyyy-MM-dd');
      const parsedDate = parseISO(isoDateString);

      console.log(isoDateString)
      console.log("parse:" + parsedDate)
      

      setState({b_date: parsedDate, b_time: b_time, b_procedure: b_procedure, b_note: b_note, b_status: b_status, b_paymentStatus: b_paymentStatus, procedFee: procedFee}); 
    }).catch(error => {
      console.error(error);
    });
      
  }, [id])





  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!b_date || !b_time || !b_procedure || !b_status){
        toast.error("Please provide value into each input field");

    } else{
        axios.put(`http://localhost:5000/admin/appointment/update/${id}`, {
          b_date,
          b_time,
          b_procedure,
          b_note,
          b_status,  
          b_paymentStatus,
          procedFee,
      })
      
        .then((response)=>{
          if(response.data.b_status === "Cancelled"){
            setState({b_date: "", b_time: "", b_procedure: "", b_note: "", b_status: "", b_paymentStatus: "", procedFee: 100});
          }else{
            setState({b_date: "", b_time: "", b_procedure: "", b_note: "", b_status: "", b_paymentStatus: "", procedFee: 0});
          }
        
          // toast.success(response.data.b_status)
          
          toast.success("Appointment Updated Successfully");
          if(b_status === "In Progress"){
            setTimeout(()=> navigate(`/admin/appointment/procedures/${id}`),500)
          }else{
            setTimeout(()=> navigate("/admin/appointment"),500)
          }
           
          
      
        
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
        <AdminNavbar />  
      </header>
      <body>
        <Link to="/admin/appointment">
          <button className='back__procedures'><span>Back</span></button>
        </Link>
        <main className='display--flex m-0'>
          <div className='update appointmentCard'>
            <h3 className='book__title'>UPDATE/ VIEW AN APPOINTMENT</h3>

            <form onSubmit={handleSubmit} style={{display: 'relative'}}>
              <div className='book__row'>
                <label htmlFor='date'>DATE: </label>
                <div className='date__container'>
                <DatePicker
                  id='b_date'
                  name='b_date'
                  selected={b_date}
                  className='datepicker__style'
                  onChange={b_date => handleChange({ target: { value: b_date, name: 'b_date' } })}
                  minDate={minDate}
                  dateFormat="MM-dd-yyyy"
                  filterDate={date => date.getDay() !== 0}
                  placeholderText="Select a date"
                  value={b_date  || ""}     
               
                  
            
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

              <div className='book__row'>
                <label htmlFor='procedure'>STATUS: </label>
                <select id="b_status" name="b_status"  value={b_status || "" }  onChange={handleChange} >
                        <option value="" disabled selected>Select your option</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Rescheduled">Rescheduled</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Walk-In">Walk-In</option>
                </select>
              </div>

              <div className='book__row'>
                <label htmlFor='payment'>PAYMENT: </label>
                <select id="b_paymentStatus" name="b_paymentStatus"  value={b_paymentStatus || "" }  onChange={handleChange} >
                        <option value="" disabled selected>Select your option</option>
                        <option value="EMI">EMI</option>
                        <option value="Fully-Paid">Fully-Paid</option>
                        <option value="Not-Paid">Not-Paid</option>
                    
                        
                </select>
              </div>

              <div className='back__update-buttons'>
                <input type="submit" value="UPDATE" className='btn-update' />
                <Link to={`/admin/appointment/procedures/${id}`} className="button-a">
                  <button className='btn-back1'>PROCEDURES</button>
                </Link>
              </div>
           
         
            </form>
          </div>
        </main>
            
      </body>
    </div>
  )
}


export default UpdateAppointment