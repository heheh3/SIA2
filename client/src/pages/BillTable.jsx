import React, {useState, useEffect, } from 'react';
import { useParams} from "react-router-dom";
import axios from 'axios';
import '../css/Home.css';


const BillTable = () => {
    const [data, setData] = useState([]);
    const {id} = useParams();

    const loadData = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/payment/getOne/${id}`);
        setData(response.data);  
    }

    useEffect(()=>{
        loadData();
    }, [id])


    return (
        <div>
            <h1 className='h1__apppointment'>Payment Details</h1>
                    <div className='pending_body-flex'>
                        <table className='styled-table'>
                            <thead>
                                <tr>
                                    <th style={{textAlign: "center"}}>No.</th>
                                    <th style={{textAlign: "center"}}>Invoice ID.</th>
                                    <th style={{textAlign: "center"}}>Payment Logs</th>
                                    <th style={{textAlign: "center"}}>Payment Type</th>
                                    <th style={{textAlign: "center"}}>Total Bill</th>
                                    <th style={{textAlign: "center"}}>Paid Amount</th>
                                    <th style={{textAlign: "center"}}>Change</th>
                                    <th style={{textAlign: "center"}}>Balance</th>
          
                               
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index)=>{
                                    return(
                                        <tr key={item.invoice_ID}>
                                            <th scope='row'>{index+1}</th>
                                            <td>{item.invoice_ID}</td>
                                            <td>{item.p_date}</td>
                                            <td>{item.p_paymentType}</td>
                                            <td>PHP {item.p_totalPayment}</td>   
                                            <td>PHP {item.p_paidAmount}</td>
                                            <td>PHP {item.p_change}</td>
                                            <td>PHP {item.p_balance}</td>
                                        
                                        </tr>
                                    )})}
                            </tbody>
                        </table> 
                    </div>
                    
        </div>
    )
}

export default BillTable