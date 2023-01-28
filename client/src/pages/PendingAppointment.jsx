import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import '../css/Home.css';
import { toast } from 'react-toastify';




const PendingAppointment = () => {
    const [data, setData] = useState([]);
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
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Appointment ID</th>
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>Date</th>
                        <th style={{textAlign: "center"}}>Time</th>
                        <th style={{textAlign: "center"}}>Procedure</th>
                        <th style={{textAlign: "center"}}>Note</th>
                        <th style={{textAlign: "center"}}>Status</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index)=>{
                        return(
                            <tr key={item.patientID}>
                                <th scope='row'>{index+1}</th>
                                <td>{item.appointID}</td>
                                <td>{item.p_name}</td>
                                <td>{item.b_date}</td>
                                <td>{item.b_time}</td>
                                <td>{item.b_procedure}</td>
                                <td>{item.b_note}</td>
                                <td style={{color: "Blue"}}>{item.b_status}</td>
                                <td>
                                    <Link to={`/view/${item.patientID}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>
                                    <Link to={`/update/${item.patientID}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteAppointment(item.patientID)}>Delete</button>
                                    
                                </td>
                            </tr>
                            
                        )
                    })}
                </tbody>
                
            </table> 
        
        </body>

    </div>
  )
}

export default PendingAppointment