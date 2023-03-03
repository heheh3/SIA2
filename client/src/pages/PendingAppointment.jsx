import React, {useState, useEffect, useContext} from 'react';
import { FaSearch  } from "react-icons/fa";
import {Link} from "react-router-dom";
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import '../css/Home.css';
import { toast } from 'react-toastify';

const PendingAppointment = () => {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const loadData = async () =>{
        const response = await axios.get("http://localhost:5000/appointment/get");
        setData(response.data);  
    }


    useEffect(()=>{
        loadData();
    }, [])

    const deleteAppointment = (id)=>{
        if(window.confirm("Are you sure you wanted to delete this appointment?")){
            axios.delete(`http://localhost:5000/appointment/delete/${id}`);
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
                <div className='search__bar-container'>
                    <input type='text' className='search__bar' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search Here..."/>
                    <span className='search__bar-icon'><FaSearch className="bar-icon"/></span>
                </div>
                <table className='styled-table'>
                    <thead>
                        <tr>
                            <th style={{textAlign: "center"}}>No.</th>
                            <th style={{textAlign: "center"}}>Appointment ID</th>
                            <th style={{textAlign: "center"}}>Name</th>
                            <th style={{textAlign: "center"}}>Contact</th>
                            <th style={{textAlign: "center"}}>Date</th>
                            <th style={{textAlign: "center"}}>Time</th>
                            <th style={{textAlign: "center"}}>Procedure</th>
                            <th style={{textAlign: "center"}}>Note</th>
                            <th style={{textAlign: "center"}}>Status</th>
                            <th style={{textAlign: "center"}}>Payment Status</th>
                            <th style={{textAlign: "center"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((item) =>{
                            return searchValue.toLowerCase() === '' || item.b_date.toLowerCase().includes(searchValue) 
                                || item.b_note.toLowerCase().includes(searchValue) || item.b_time.toLowerCase().includes(searchValue) 
                                || item.b_procedure.toLowerCase().includes(searchValue) || item.patientID.toString().includes(searchValue) 
                                || item.b_status.toLowerCase().includes(searchValue) || item.b_paymentStatus.toLowerCase().includes(searchValue)
                                
                        }).map((item, index)=>{
                            return(
                                <tr key={item.a_ID}>
                                    <th scope='row'>{index+1}</th>
                                    <td>{item.a_ID}</td>
                                    <td>{item.p_fullname}</td>
                                    <td>{item.p_contact}</td>
                                    <td>{item.b_date}</td>
                                    <td>{item.b_time}</td>
                                    <td>{item.b_procedure}</td>
                                    <td>{item.b_note}</td>
                                    <td><span  style={
                                        {backgroundColor: item.b_status === "In Progress" ? 'orange' : '' ||   item.b_status === "Pending" ? 'blue': '' ||
                                                item.b_status === "Cancelled" ? 'red': '' ||  item.b_status === "Rescheduled" ? 'violet': '' ||  
                                                item.b_status === "Completed" ? 'green': '' || item.b_status === "Walk-In" ? 'gray': '', padding: '5px 10px', color: 'white', borderRadius: '10px', fontSize: '0.8rem', letterSpacing: "1.5px",}
                                        }>{item.b_status}</span>
                                    </td>
                                    <td><span  style={
                                        {backgroundColor: item.b_paymentStatus === "Not-Paid" ? 'red' : '' ||   item.b_paymentStatus === "Fully-Paid" ? 'green': '' ||
                                                item.b_paymentStatus === "EMI" ? 'pink': '' , padding: '5px 10px', color: 'white', borderRadius: '10px', fontSize: '0.8rem', letterSpacing: "1.5px",}
                                        }>{item.b_paymentStatus}</span>
                                    </td>
                                    <td>

                                    
                                    
                                        <Link to={`/admin/appointment/update/${item.a_ID}`}>
                                            <button className='btn btn-view'>View/Edit</button>
                                        </Link>
                                        <button className='btn btn-delete' onClick={() => deleteAppointment(item.a_ID)}>Delete</button>
                                        
                                        
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

export default PendingAppointment