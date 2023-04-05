import React, {useState, useEffect, useContext} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import '../css/Home.css';
import CancelledAppointment from './CancelledAppointment';
import { toast } from 'react-toastify';



const Procedures = () => {
    const [data, setData] = useState([]);
    const [proceduresData, setProcedures] = useState([]);
    const [sumData, setSumData] = useState([]);
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

    console.log(proceduresData)

    const loadSum = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/procedure/sum/${id}`);
        setSumData(response.data[0]);  
    }

    useEffect(()=>{
        loadSum();   
    }, [id])

    
    const deleteProcedure = (id)=>{
        if(window.confirm("Are you sure you wanted to delete this user?")){
            axios.delete(`http://localhost:5000/admin/appointment/procedure/delete/${id}`);
            toast.success("Procedure Deleted Successfully!");
            setTimeout(()=>  loadProcedures(), 500);
            setTimeout(()=>  loadSum(), 500);
       
        }
    }
    
    return (
        <div>
            <header>
                <AdminNavbar />
            </header>
            <body className='pending_body'>
                <div className='flex--links'> 
                    <Link to={`/admin/services`}>
                        <button className='back__procedures'>Back</button>
                    </Link>
                    <Link to={`/admin/services/update/${id}`}>
                        <button className='back__procedures'>Next</button>
                    </Link>
                </div>
             
                <h1 className='h1__apppointment'>Services Details</h1>
                <div className='pending_body-flex'>
                    <table className='styled-table'>
                        <thead>
                            <tr>
                                <th style={{textAlign: "center"}}>No.</th>
                                <th style={{textAlign: "center"}}>Services ID</th>
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
                                        {backgroundColor: item.b_status === "In Progress" ? 'orange' : '' ||   item.b_status === "R-In Progress" ? 'violet': '' ||
                                                item.b_status === "Cancelled" ? 'red': '' ||  item.b_status === "Rescheduled" ? 'violet': '' ||  
                                                item.b_status === "Completed" ? 'green': '' || item.b_status === "Walk-In" ? 'gray': '' || item.b_status === "R-Completed" ? 'lightgreen' : '' , padding: '5px 10px', color: 'white', borderRadius: '10px', fontSize: '0.8rem', letterSpacing: "1.5px",}
                                        }>{item.b_status}</span>
                                    </td>
                                    </tr>
                                )})}
                        </tbody>
                    </table> 
                </div>
                <h1 className='h1__apppointment'>Procedure Details</h1>
                <div className='add_pcontainer'>
                    <Link to={`/admin/services/procedures/add/${id}`}>
                        <button className='add__procedures-btn'><span>ADD PROCEDURE</span></button>
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
                                <th style={{textAlign: "center"}}>Action</th>
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
                                        <td>
                                            <button className='btn1 btn-delete' onClick={() => deleteProcedure(item.procedNum)}>Delete</button>
                                            <Link to={`/admin/services/procedures/update/${item.procedNum}`}>
                                                <button className='btn1 btn-view mx-10'>Edit</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    
                                )})}
                                <tr>
                                    <td colSpan="4" style={{textAlign:"right", paddingRight: "rem", fontWeight: "bold"}}>Total Amount: </td>  
                                    <td colSpan="1" style={{textAlign:"center", fontWeight: "bold"}}>{"PHP " + (Number(sumData.totalAmount)).toFixed(2)}</td>  
                                </tr>          
                        </tbody>         
                    </table> 
                </div>
                
            </body>
        </div>
    )
    }

export default Procedures