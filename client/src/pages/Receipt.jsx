import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import AdminNavbar from './AdminNavbar'
import { FaSearch, FaPlusCircle  } from "react-icons/fa";
import '../css/Home.css';
import '../css/receipt.css';
import { toast } from 'react-toastify';
import axios from 'axios';




const Receipt = () => {

    const [data, setData] = useState({});
    const [p_data, setProceduresData] = useState({});
    const [a_data, setAppointmentData] = useState({});
    const {id} = useParams();


    const loadData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/payment/getOne/${id}`);
            const highestIndex = response.data.length - 1;
            const lastPayment = response.data[highestIndex];
            setData(lastPayment);
        } catch (error) {
            console.error(error);
        }
      };
    
      useEffect(() => {
        loadData();
      }, [id]);

    const loadAppointment = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/get/${id}`);
        setAppointmentData(response.data);  
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

    console.log(data);
    console.log(p_data);
    console.log(a_data);

  return (
    <div>
        <header>
            <AdminNavbar />
        </header>

        <div class="container">
        
            <img src="https://freepngimg.com/save/171638-tooth-free-download-png-hq/878x1280"></img>

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
                    <p> Patient name: </p>
                    <p> Patient email: </p>
                    <p> Patient address: </p>
                </div>
            </div>

            <table className='tableR'>
                <thead>
                    <tr>
                    <th>Procedure</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(p_data) && p_data.length > 0 &&
                    p_data.map((procedure, appointment) => (
                        <tr key={procedure._id}>
                        <td>{procedure.b_procedure}</td>
                        <td>{a_data[0].b_date}</td>
                        <td>{a_data[0].b_time}</td>
                        <td>PHP {procedure.procedFee}</td>
                        </tr>
                    ))}
                </tbody>
                </table>

            <div className="total-info">
                <h4> Subtotal: PHP {data.p_totalProd} </h4>
                <p> Cancellation/Reschedule fee: PHP {data.p_addFee} </p>
                <p> Total: PHP {(Number(data.p_totalProd)  + Number(data.p_addFee)).toFixed(2)} </p>
                <p> Amount paid: PHP {data.p_paidAmount} </p>
                <p> Change: PHP {data.p_change} </p>
                <p> BALANCE: PHP {((Number(data.p_totalProd)  + Number(data.p_addFee)) -  Number(data.p_paidAmount)).toFixed(2)} </p>
            </div>


        </div>

    </div>

  )
}

export default Receipt