import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import AdminNavbar from './AdminNavbar'
import { FaSearch, FaPlusCircle  } from "react-icons/fa";
import '../css/Home.css';
import '../css/receipt.css';
import { toast } from 'react-toastify';
import axios from 'axios';




const Receipt2 = () => {

    const [patientData, setPatientData] = useState({});
    const [data, setData] = useState({});
    const [p_data, setProceduresData] = useState({});
    const [a_data, setAppointmentData] = useState({});
    const {id} = useParams();


    const loadPatient = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/patient/get/${id}`);
        setPatientData(response.data);  
    }

    useEffect(()=>{
        loadPatient();   
    }, [id])




    const loadData = async () => {
          const response = await axios.get(`http://localhost:5000/admin/payment/getOne/${id}`);
        setData(response.data[0]);
      
      };
    
      useEffect(() => {
        loadData();
      }, [id]);

    const loadAppointment = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/get/${id}`);
        setAppointmentData(response.data[0]);  
    }

    useEffect(()=>{
        loadAppointment();   
    }, [id])


    const loadProcedures = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/procedure/get/${id}`);
        setProceduresData(response.data);  
    }

    useEffect(()=>{
        loadProcedures();   
    }, [id])

    

    const handlePrint = () => {
        window.print();
    }

    console.log(a_data)


  return (
    <div>
        <header>
            <AdminNavbar />
        </header>

        <div class="containerR">
        
            <img className='imgR' src="https://freepngimg.com/save/171638-tooth-free-download-png-hq/878x1280"></img>

            <div class="header-container">
                <h1> Dental Invoice </h1>
                <ul>
                    <button onClick={handlePrint} className='btn btn-receipt2'>Print</button>

                </ul>
                <div className="header-container_p">
                    <p> Invoice no.: {data.invoice_ID} </p>
                    <p> Invoice date: {new Date().toLocaleDateString()} </p>
                </div>
            </div>
            

            <div className="bill-info">
                <div className="bill-info-left">
                    <h3> Bill From: </h3>
                    <p> Toothfully Yours Dental Clinic </p>
                    <p> 0908 988 2163 </p>
                    <p> Door # 3, Quisa Realty, Mintal, Davao City </p>
                </div>
                <div className="bill-info-right">
                    <h3> Bill To: </h3>
                    <p>{a_data.p_fullname}</p>
                    <p>{a_data.p_contact}</p>
                    <p>{a_data.p_email}</p>
                
                </div>
            </div>

            <table className='tableR'>
                <thead>
                    <tr>
                    <th style={{fontSize: "14px"}}>Procedure</th>
                    <th style={{fontSize: "14px"}}>Appointment Date</th>
                    <th style={{fontSize: "14px"}}>Appointment Time</th>
                    <th style={{fontSize: "14px"}}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(p_data) && p_data.length > 0 &&
                    p_data.map((procedure, index) => (
                        <tr key={procedure._id}>
                        <td style={{fontSize: "14px"}}>{procedure.b_procedure}</td>
                        <td style={{fontSize: "14px"}}>{a_data.b_date}</td>
                        <td style={{fontSize: "14px"}}>{a_data.b_time}</td>
                        <td style={{fontSize: "14px"}}>PHP {procedure.procedFee}</td>
                        </tr>
                    ))}
                </tbody>
                </table>

                <div className="total-info">
                <div className='payment__vflex'>
                    <div className='payment__flex-mr'>Total Procedural Fee:</div>
                    <div className='payment__flex-mr'>Cancellation/Reschedule Fee:</div>
                    <div className='payment__flex-mr'>Remaining Balance:</div>
                    <div className='payment__flex-mr'>Amount paid:</div>
                    <div className='payment__flex-mr'>Change:</div>
                    <div className='payment__flex-mr'> Balance:</div>
                </div>

                <div className='payment__vflex'>
                    <p> {data.p_totalProd} </p>
                    <p> {data.p_addFee} </p>
                    <p> PHP {data.p_totalPayment} </p>
                    <p>PHP {data.p_paidAmount} </p>
                    <p>PHP {data.p_change} </p>
                    <p className=''>PHP {data.p_balance} </p>
                </div>

                        
            </div>


        </div>

    </div>

  )
}

export default Receipt2