import React, {useState, useEffect, useContext} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import '../css/Home.css';
import CompletedCancelledPaid from './CompletedCancelledPaid';
import BillTable from './BillTable';


const ShowDetails = () => {
    const [data, setData] = useState([]);
    const [userID, setUserID] = useState([]);
    const [proceduresData, setProcedures] = useState([]);
    const [sumData, setSumData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const {id} = useParams();

    const loadData = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/get/${id}`);
        setData(response.data);  
    }



    useEffect(()=>{
        loadData();
    }, [id])

    const loadData1 = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/get/${id}`);
        setUserID(response.data[0]);  
    }



    useEffect(()=>{
        loadData1();
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
        setSumData(response.data[0]);  
    }

    useEffect(()=>{
        loadSum();   
    }, [id])

    
    return (
        <div>
            <header>
                <AdminNavbar />
            </header>
            <body className='pending_body'>
            <div className='flex--links'> 
                <Link to={`/admin/user/appointment-history/${userID.patientID}`}>
                        <button className='back__procedures'><span>Back</span></button>
                </Link>
           </div>
                <h1 className='h1__apppointment'>Service Details</h1>
                <div className='pending_body-flex'>
                    <table className='styled-table'>
                        <thead>
                            <tr>
                                <th style={{textAlign: "center"}}>No.</th>
                                <th style={{textAlign: "center"}}>Service ID</th>
                                <th style={{textAlign: "center"}}>Name</th>
                                <th style={{textAlign: "center"}}>Contact</th>
                                <th style={{textAlign: "center"}}>Date</th>
                                <th style={{textAlign: "center"}}>Time</th>
                                <th style={{textAlign: "center"}}>Procedure</th>
                                <th style={{textAlign: "center"}}>Note</th>
                                <th style={{textAlign: "center"}}>Status</th>
                                <th style={{textAlign: "center"}}>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.filter((item) =>{
                                return searchValue.toLowerCase() === '' || item.b_date.toLowerCase().includes(searchValue)  || item.a_ID.toString().includes(searchValue)
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
                                                item.b_status === "Completed" ? 'green': '' || item.b_status === "Walk-In" ? 'gray': '' || item.b_status === "R-Completed" ? 'lightgreen' : '', padding: '5px 10px', color: 'white', borderRadius: '10px', fontSize: '0.8rem', letterSpacing: "1.5px",}
                                        }>{item.b_status}</span>
                                    </td>
                                    <td><span  style={
                                        {backgroundColor: item.b_paymentStatus === "Not-Paid" ? 'red' : '' ||   item.b_paymentStatus === "Fully-Paid" ? 'green': '' ||
                                                item.b_paymentStatus === "EMI" ? 'pink': '' ||   item.b_paymentStatus === "Partly-Paid" ? 'blue': '' , padding: '5px 10px', color: 'white', borderRadius: '10px', fontSize: '0.8rem', letterSpacing: "1.5px",}
                                        }>{item.b_paymentStatus}</span>
                                    </td>
                                   
                                    </tr>
                                )})}
                        </tbody>
                    </table> 
                </div>
                <CompletedCancelledPaid />
                <h1 className='h1__apppointment'>Procedure Details</h1>
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
                                    <td colSpan="4" style={{textAlign:"right", fontWeight: "bold"}}>Total Amount: </td>  
                                    <td colSpan="1" style={{textAlign:"center", fontWeight: "bold"}}>{sumData.totalAmount}</td>  
                                </tr>      
                        </tbody>
                    </table> 
                </div>
                <BillTable />
                
            </body>
        </div>
    )
    }

export default ShowDetails