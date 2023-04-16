import React, {useState, useEffect} from 'react';
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import {Link} from "react-router-dom";
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import '../css/Home.css';
import { toast } from 'react-toastify';




const PatientTable = () => {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const loadData = async () =>{
        const response = await axios.get("http://localhost:5000/users/get");
        setData(response.data);  
    }


    useEffect(()=>{
        loadData();
    }, [])

    const deleteAppointment = (id)=>{
        if(window.confirm("Are you sure you wanted to delete this user?")){
            axios.delete(`http://localhost:5000/users/delete/${id}`);
            toast.success("Appointment Deleted Successfully!");
            setTimeout(()=> loadData(), 500);
       
        }
    }

 return (
    <div>
        <header>
            <AdminNavbar />
        </header>
        <body className='pending_body'>
            <div className='pending_body-flex'>
            <div className='employee__header'>
                  <div className='add__ebutton'>
                      <Link to="/admin/user/add">
                        <button className='add__ebutton-style'><span>REGISTER NEW PATIENT</span> <FaPlusCircle className="add-icon"/></button>
                      </Link>
                     
                  </div>
                  <div className='search__bar-container'>
                      <input type='text' className='search__bar' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search Here..."/>
                      <span className='search__bar-icon'><FaSearch className="bar-icon"/></span>
                  </div>
                </div>
                <table className='styled-table'>
                    <thead>
                        <tr>
                            <th style={{textAlign: "center"}}>No.</th>
                            <th style={{textAlign: "center"}}>Patient ID</th>
                            <th style={{textAlign: "center"}}>Username</th>
                            <th style={{textAlign: "center"}}>Email</th>
                            <th style={{textAlign: "center"}}>Name</th>
                            <th style={{textAlign: "center"}}>Contact</th>
                            <th style={{textAlign: "center"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((item) =>{
                            return searchValue.toLowerCase() === '' || item.p_username.toLowerCase().includes(searchValue) 
                                || item.p_email.toLowerCase().includes(searchValue) || item.p_contact.toLowerCase().includes(searchValue) 
                                || item.p_fullname.toLowerCase().includes(searchValue) || item.user_id.toString().includes(searchValue) 
                       
            
                                
                        }).map((item, index)=>{
                            return(
                                <tr key={item.user_id}>
                                    <th scope='row'>{index+1}</th>
                                    <td>{item.user_id}</td>
                                    <td>{item.p_username}</td>
                                    <td>{item.p_email}</td>
                                    <td>{item.p_fullname}</td>
                                    <td>{item.p_contact}</td>
                                    <td>
                                        <Link to={`/admin/user/profile-settings/${item.user_id}`}>
                                            <button className='btn btn-view'>View/Edit</button>
                                        </Link>
                                        <button className='btn btn-delete' onClick={() => deleteAppointment(item.user_id)}>Delete</button>
                           
                                        <Link to={`/admin/user/walkin/${item.user_id}`}>
                                            <button className='btn walk__in'>Book/Walk-In</button>
                                        </Link>
                                    </td>
                                </tr>
                                
                            )
                        })}
                    </tbody>
                    
                </table> 
        </div>
        </body>

    </div>
  )
}

export default PatientTable