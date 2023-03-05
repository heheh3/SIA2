import AdminNavbar from './AdminNavbar'
import "../css/Profile.css";
import React, {useState, useEffect} from 'react';
import { FaSearch  } from "react-icons/fa";
import axios from 'axios';
import {useParams, Link} from "react-router-dom";
import AdminProfileNavbar from './AdminProfileNavbar';


const AdminPatientHistory = () => {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const { id } = useParams();


    const loadData = async () =>{
        const response = await axios.get(`http://localhost:5000/appointment/completed/get/${id}`);
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
        <body>
            <Link to="/admin/user">
              <button className='back__patient'><span>Back</span></button>
            </Link>

            <main className='patient-settings'>
                <div className='profileNavbar__container'>
                    <AdminProfileNavbar />
                    <div className='profile__container'>
                    <div className='pending_body'>
                        <div className='pending_body-flex'>
                        <div className='search__bar-container-history'>
                        <input type='text' className='search__bar' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search Here..."/>
                        <span className='search__bar-icon'><FaSearch className="bar-icon"/></span>
                    </div>
                    <table className='styled-table-history'>
                        <thead>
                            <tr>
                                <th style={{textAlign: "center"}}>No.</th>
                                <th style={{textAlign: "center"}}>Appointment ID</th>
                                <th style={{textAlign: "center"}}>Date</th>
                                <th style={{textAlign: "center"}}>Time</th>
                                <th style={{textAlign: "center"}}>Procedure</th>
                                <th style={{textAlign: "center"}}>Note</th>
                                <th style={{textAlign: "center"}}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.filter((item) =>{
                            return searchValue.toLowerCase() === '' || item.b_date.toLowerCase().includes(searchValue) || item.a_ID.toString().includes(searchValue)
                                || item.b_note.toLowerCase().includes(searchValue) || item.b_time.toLowerCase().includes(searchValue) 
                                || item.b_procedure.toLowerCase().includes(searchValue) || item.patientID.toString().includes(searchValue) 
                                || item.b_status.toLowerCase().includes(searchValue) 
                                
                        }).map((item, index)=>{
                            return(
                                <tr key={item.a_ID}>
                                    <th scope='row'>{index+1}</th>
                                    <td>{item.a_ID}</td>
                                    <td>{item.b_date}</td>
                                    <td>{item.b_time}</td>
                                    <td>{item.b_procedure}</td>
                                    <td>{item.b_note}</td> 
                                    <td>{item.b_paid}</td> 
                                </tr>
                                    )})}
                            </tbody>
                            </table> 
                        </div>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    </div>
  )
}


export default AdminPatientHistory