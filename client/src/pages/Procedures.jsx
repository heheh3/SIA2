import React, {useState, useEffect, useContext} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import '../css/Home.css';
import CancelledAppointment from './CancelledAppointment';


const Procedures = () => {
    const [data, setData] = useState([]);
    const [proceduresData, setProcedures] = useState([]);
    const [sumData, setSumData] = useState(null)
    const {id} = useParams();

    const loadData = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/get/${id}`);
        setData(response.data);  
    }


    useEffect(()=>{
        loadData();
    }, [id])

    const loadProcedures = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/procedure/get/${id}`);
        setProcedures(response.data);  
    }

    useEffect(()=>{
        loadProcedures();   
    }, [id])

    const loadSum = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/procedure/sum/${id}`);
        setSumData(response.data);  
    }

    useEffect(()=>{
        loadSum();   
    }, [id])

    console.log(proceduresData)
    console.log(sumData)

    
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
                            {data.map((item, index)=>{
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
                <CancelledAppointment />
                <h1 className='h1__apppointment'>Procedure Details</h1>
                <div className='add__ebutton'>
                      <Link to={`/admin/appointment/procedures/add/${id}`}>
                        <button className='add__ebutton-style'><span>ADD PROCEDURE</span></button>
                      </Link>   
                     
                </div>
                <div className='pending_body-flex'>
                    <table className='styled-table'>
                        <thead>
                            <tr>
                                <th style={{textAlign: "center"}}>No.</th>
                                <th style={{textAlign: "center"}}>Procedure Done</th>
                                <th style={{textAlign: "center"}}>Note</th>
                                <th style={{textAlign: "center"}}>Tooth Number</th>
                                <th style={{textAlign: "center"}}>Procedure Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proceduresData.map((item, index)=>{
                                return(
                                    <tr key={item.a_ID}>
                                        <th scope='row'>{index+1}</th>
                                        <td>{item.b_procedure}</td>
                                        <td>{item.b_note}</td>
                                        <td>{item.toothNo}</td>
                                        <td>{item.procedFee}</td>
                                    </tr>
                                    
                                )})}
                                <tr>
                                <td colSpan="4" style={{textAlign:"right", fontWeight: "bold"}}>Total Amount: {sumData} </td>
                                </tr>
                        </tbody>
                    </table> 
                </div>
                
            </body>
        </div>
    )
    }

export default Procedures