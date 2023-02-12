import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import AdminNavbar from './AdminNavbar'
import { FaSearch, FaPlusCircle  } from "react-icons/fa";
import '../css/Home.css';
import { toast } from 'react-toastify';
import axios from 'axios';




const Employee = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const loadData = async () =>{
    const response = await axios.get("http://localhost:5000/employee/get");
    setData(response.data);  
  };

  useEffect(()=>{
    loadData();
  }, []);

  const deleteAppointment = (id)=>{
    if(window.confirm("Are you sure you wanted to delete this employee?")){
        axios.delete(`http://localhost:5000/employee/delete/${id}`);
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
                      <Link to="/admin/employee/add">
                        <button className='add__ebutton-style'><span>ADD EMPLOYEE</span> <FaPlusCircle className="add-icon"/></button>
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
                            <th style={{textAlign: "center"}}>Employee ID</th>
                            <th style={{textAlign: "center"}}>Name</th>
                            <th style={{textAlign: "center"}}>Email</th>
                            <th style={{textAlign: "center"}}>Address</th>
                            <th style={{textAlign: "center"}}>Conctact</th>
                            <th style={{textAlign: "center"}}>Gender</th>
                            <th style={{textAlign: "center"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((item) =>{
                            return searchValue.toLowerCase() === '' || item.e_name.toLowerCase().includes(searchValue) 
                                || item.e_email.toLowerCase().includes(searchValue) || item.e_address.toLowerCase().includes(searchValue) 
                                || item.e_birthdate.toLowerCase().includes(searchValue) || item.e_contact.toString().includes(searchValue) 
                                || item.e_gender.toLowerCase().includes(searchValue) ||  item.employeeID.toString().includes(searchValue) 
                                
                        }).map((item, index)=>{
                            return(
                                <tr key={item.employeeID}>
                                    <th scope='row'>{index+1}</th>
                                    <td>{item.employeeID}</td>
                                    <td>{item.e_name}</td>
                                    <td>{item.e_email}</td>
                                    <td>{item.e_address}</td>
                                    <td>{item.e_contact}</td>
                                    <td>{item.e_gender}</td>
                                    <td>
                                    
                                        <Link to={'/admin/employee'}>
                                            <button className='btn btn-view'>View/Edit</button>
                                        </Link>
                                        <button className='btn btn-delete' onClick={() => deleteAppointment(item.employeeID)}>Delete</button>
                                        
                                        
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

export default Employee