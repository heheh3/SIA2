import React, {useState, useEffect, useContext} from 'react';
import { FaSearch  } from "react-icons/fa";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import '../css/Home.css';
import { toast } from 'react-toastify';

const Procedures = () => {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const {id} = useParams();

    const loadData = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/get/${id}`);
        setData(response.data);  
    }


    useEffect(()=>{
        loadData();
    }, [id])
    
    return (
        <div>
            <header>
                <AdminNavbar />
            </header>
            <body className='pending_body'>
                <Link to={`/admin/appointment/update/${id}`}>
                        <button className='back__procedures'><span>Back</span></button>
                </Link>
           
                <h1 className='h1__apppointment'>Apppointment Details</h1>
                <div className='pending_body-flex'>
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
                                    </tr>
                                )})}
                        </tbody>
                    </table> 
                </div>
                <h1 className='h1__apppointment'>Procedure Details</h1>
                <div className='pending_body-flex'>
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
                                    </tr>
                                )})}
                        </tbody>
                    </table> 
                </div>
                
            </body>
        </div>
    )
    }

export default Procedures