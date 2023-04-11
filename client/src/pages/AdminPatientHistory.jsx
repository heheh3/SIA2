import AdminNavbar from './AdminNavbar'
import "../css/Profile.css";
import React, {useState, useEffect} from 'react';
import { FaSearch  } from "react-icons/fa";
import axios from 'axios';
import {useParams, Link} from "react-router-dom";
import AdminProfileNavbar from './AdminProfileNavbar';


const AdminPatientHistory = () => {
    const [data, setData] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const { id } = useParams();


    const loadData = async () =>{
        const response = await axios.get(`http://localhost:5000/appointment/fully-completed/get/${id}`);
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
                    <table className='styled-table1'>
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
                            <th style={{textAlign: "center"}}>Service Updated</th>
                            <th style={{textAlign: "center"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((item) =>{
                            return searchValue.toLowerCase() === '' || item.b_date.toLowerCase().includes(searchValue) || item.p_fullname.toLowerCase().includes(searchValue) || item.a_ID.toString().includes(searchValue) 
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
                                                item.b_status === "Completed" ? 'green': '' || item.b_status === "R-Completed" ? 'lightgreen': '' , padding: '5px 10px', color: 'white', borderRadius: '10px', fontSize: '0.8rem', letterSpacing: "1.5px",}
                                        }>{item.b_status}</span>
                                    </td>
                                    <td><span  style={
                                        {backgroundColor: item.b_paymentStatus === "Not-Paid" ? 'red' : '' ||   item.b_paymentStatus === "Fully-Paid" ? 'green': '' ||
                                                item.b_paymentStatus === "EMI" ? 'pink': ''  ||   item.b_paymentStatus === "Partly-Paid" ? 'blue': ''  , padding: '5px 10px', color: 'white', borderRadius: '10px', fontSize: '0.8rem', letterSpacing: "1.5px",}
                                        }>{item.b_paymentStatus}</span>
                                    </td>
                                    <td>{item.b_update}</td>
                                    <td>
                               
                                     {item.b_paymentStatus === 'Fully-Paid' || item.b_paymentStatus === 'Partly-Paid'  ? (
                                        <>
                                         {item.b_paymentStatus === 'Fully-Paid' ? (
                                             <>
                                                <Link to={`/admin/completed/receipt/${item.a_ID}`}>
                                                    <button className='btn btn-receipt'>Generate Receipt</button>
                                                </Link>
                                             </>
                                            ) : (
                                            <>
                                                <Link to={`/admin/completed/ff-payment/${item.a_ID}`}>
                                                    <button className='btn btn-view' style={{backgroundColor: 'pink'}}>Payment</button>
                                                </Link>
                                                <Link to={`/admin/completed/receipt/${item.a_ID}`}>
                                                    <button className='btn btn-receipt'>Generate Receipt</button>
                                                </Link>
                                                <Link to={`/admin/completed/procedures/${item.a_ID}`}>
                                                    <button className='btn btn-view'>Show Details</button>
                                                </Link>
                                            </>
                                        
                                        )}
                                            
                                        </>
                                        ) : (
                                        <>
                                            <Link to={`/admin/completed/procedures/${item.a_ID}`}>
                                                <button className='btn btn-view'>Show Details</button>
                                            </Link>
                                           
                                        </>
                                        )}   
                                    </td>
                                </tr>
                                        
                                    )
                                })}
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