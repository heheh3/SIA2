import React, {useState, useEffect, useContext} from 'react';
import { useParams,Link} from "react-router-dom";
import axios from 'axios';
import '../css/Home.css';


const CompletedCancelledPaid = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);

    const {id} = useParams();

    const loadData = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/get/${id}`);
        setData1(response.data[0]);  
    }

    useEffect(()=>{
        loadData();
    }, [id])

    console.log(data1)
    console.log(data1.user_id)

    const LoadingData = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/completedCancelled/get/${data1.user_id}`);
        setData(response.data);  
    }

    useEffect(()=>{
        LoadingData();
    }, [data1.user_id])

    return (
        <div>
            <h1 className='h1__apppointment'>Cancelled Appointment Details</h1>
                    <div className='pending_body-flex'>
                        <table className='styled-table'>
                            <thead>
                                <tr>
                                    <th style={{textAlign: "center"}}>No.</th>
                                    <th style={{textAlign: "center"}}>Appointment ID</th>
                                    <th style={{textAlign: "center"}}>Date</th>
                                    <th style={{textAlign: "center"}}>Time</th>
                                    <th style={{textAlign: "center"}}>Procedure</th>
                                    <th style={{textAlign: "center"}}>Note</th>
                                    <th style={{textAlign: "center"}}>Status</th>
                                    <th style={{textAlign: "center"}}>Fee</th>
                                    <th style={{textAlign: "center"}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index)=>{
                                    return(
                                        <tr key={item.a_ID}>
                                            <th scope='row'>{index+1}</th>
                                            <td>{item.a_ID}</td>
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
                                            <td>{"PHP " + 100.00}</td>
                                            <td><span  style={
                                                {backgroundColor: item.b_paymentStatus === "Not-Paid" ? 'red' : '' ||   item.b_paymentStatus === "Fully-Paid" ? 'green': '' ||
                                                        item.b_paymentStatus === "EMI" ? 'pink': '' , padding: '5px 10px', color: 'white', borderRadius: '10px', fontSize: '0.8rem', letterSpacing: "1.5px",}
                                                }>{item.b_paymentStatus}</span>
                                            </td>
                                        </tr>
                                    )})}
                            </tbody>
                        </table> 
                    </div>
                    
        </div>
    )
}

export default CompletedCancelledPaid