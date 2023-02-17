import React, { useState, useEffect } from 'react';
import {useNavigate, useParams, Link } from "react-router-dom"
import AdminNavbar from './AdminNavbar'
import '../css/Home.css';
import DatePicker from 'react-datepicker';
import axios from "axios";
import {toast} from "react-toastify";
import { parseISO, format } from 'date-fns';


const initialState = {
  e_name: "",
  e_email: "",
  e_contact: "",
  e_address: "",
  e_birthdate: "",
  e_gender: ""
}

const Employee_Update = () => {
    const [state, setState] = useState(initialState);
    const {e_name, e_email, e_contact, e_address, e_birthdate, e_gender} = state
    const navigate = useNavigate();
    const {id} = useParams();
    
    

    
  useEffect (() => {

    axios.get(`http://localhost:5000/admin/employee/get/${id}`)
    .then(response => {
      const {e_name, e_email, e_contact, e_address, e_birthdate, e_gender} = response.data[0];
      const isoDateString = format(new Date(e_birthdate), 'yyyy-MM-dd');
      const parsedDate = parseISO(isoDateString);

      setState({e_name: e_name, e_email: e_email, e_contact: e_contact, e_address: e_address , e_birthdate: parsedDate, e_gender: e_gender}); 
    }).catch(error => {
      console.error(error);
    });
      
  }, [id])



    const handleSubmit = (e) =>{
      e.preventDefault();
      if (!e_name || !e_email || !e_contact || !e_address || !e_birthdate || !e_gender){
          toast.error("Please provide value into each input field");
   
      } else{
          axios.put(`http://localhost:5000/admin/employee/update/${id}`, {
              e_name,
              e_email,
              e_contact,
              e_address,
              e_birthdate,
              e_gender
          })
          .then(()=>{
              setState({e_name: "", e_email: "", e_contact: "", e_address: "",e_birthdate:"", e_gender:""  });
          }).catch((err) => toast.error(err.response.data) );
   
          toast.success("Employee Updated Successfully");
        
        
  
          setTimeout(()=> navigate("/admin/employee"), 300)
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
        <main className='margin--10'>
          <Link to="/admin/employee">
                <button className='back__ebutton-style'><span>Back</span></button>
          </Link>
          <div className='employee__container'>
              <h1 className='employee__form-title'>EMPLOYEE PROFILE</h1>
            <div className='employee__form'>
              <form onSubmit={handleSubmit} >
                <div className='employee__form-row'>
                  <label htmlFor='e_name'>Name:</label>
                  <input 
                    name='e_name'
                    id='e_name'
                    type='text' 
                    className='e_information' 
                    placeholder='Enter a Name...' 
                    value={e_name || ""} 
                    onChange={handleChange}/>
                </div>

                <div className='employee__form-row'>
                  <label htmlFor='e_email'>Email:</label>
                  <input 
                    name='e_email'
                    id='e_email'
                    type='email' 
                    className='e_information' 
                    placeholder='Enter an Email...' 
                    value={e_email || ""} onChange={handleChange} 
                  />
                </div>

                <div className='employee__form-row'>
                  <label htmlFor='e_contact'>Phone:</label>
                  <input
                    name='e_contact' 
                    id='e_contact'
                    type='text' 
                    className='e_information'
                    maxLength={11} placeholder='Enter a Phone Number ...'
                    value={e_contact || ""} onChange={handleChange}
                  />
                </div>

                <div className='employee__form-row'>
                  <label htmlFor='e_address'>Address:</label>
                  <input type='text' 
                    name='e_address' 
                    id='e_address'
                    className='e_information' 
                    placeholder='Enter an Address ...' 
                    value={e_address || ""} onChange={handleChange} />
                </div>

                <div className='employee__form-row'>
                  <label htmlFor='e_birthdate'>Birth Date:</label>
                  <div className='date__container'>
                    <DatePicker
                      id='e_birthdate'
                      name='e_birthdate'
                      className='datepicker__style'
                      selected={e_birthdate}
                      onChange={e_birthdate => handleChange({ target: { value: e_birthdate, name: 'e_birthdate' } })}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      showYearPicker
                      value={e_birthdate || ""}  
                  />
               
                  </div>
                </div>
                <div className='employee__form-row'>
                  <label htmlFor='e_gender'>Gender: </label>
                  <select name="e_gender" id="e_gender" value={e_gender || ""} onChange={handleChange}>
                          <option value="" disabled selected> --- Choose One --- </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Another Gender">Another Gender</option>
                
                      </select>

                </div>

                <input type="submit" className='book-button' value="UPDATE" />
             
                 
              </form>
            </div>
          </div>
         
        
          
        </main>
    </div>
  )
}

export default Employee_Update