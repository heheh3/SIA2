import React, { useState, useEffect } from 'react';
import {useParams, Link } from "react-router-dom"
import "../css/Appointment.css";  
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import AdminNavbar from './AdminNavbar';
import {parseISO, format} from 'date-fns';




const Payment = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [sumData, setSumData] = useState([]);
    const [amountPaid, setAmountPaid] = useState(); 
    const dateToday = format(new Date(), 'EEE, MMM dd, yyyy');
    console.log(dateToday)
    
    const {id} = useParams();

    const loadData = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/get/${id}`);
        setData1(response.data[0]);  
    }

    console.log(data1)

    useEffect(()=>{
        loadData();
    }, [id])


    const loadSum = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/procedure/sum/${id}`);
        setSumData(response.data[0]);  
    }

    useEffect(()=>{
        loadSum();   
    }, [id])

    



    const cancelledSum = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/completedCancelled/sum/${data1.user_id}/${data1.a_ID}`);
        setData(response.data[0]);  
    }

    useEffect(()=>{
        cancelledSum();
    }, [data1.user_id, data1.a_ID])




  const handleSubmit = (e) =>{
    e.preventDefault();
    
    }
  


const handleChange = (event) => {
    setAmountPaid(event.target.value)
  
}

  return (
    <div>
        <header>
            <AdminNavbar />  
        </header>
        <body>
        <Link to="/admin/appointment">
          <button className='back__procedures'><span>Back</span></button>
        </Link>
        <main className='display--flex m-0'>
          <div className='update appointmentCard'>
            <h3 className='book__title'>PAYMENT DETAILS</h3>

            <form onSubmit={handleSubmit} style={{display: 'relative'}}>
            <div className='book__row1'>
                    <label htmlFor='b_fullname'>NAME:  </label>
                    <div className='amount__total infos'>{data1.p_fullname}</div>
            </div>

            <div className='book__row1'>
                    <label htmlFor='b_fullname'>DATE:  </label>
                    <div className='amount__total infos'>{dateToday}</div>
            </div>    

            <div className='book__row1'>
                    <label htmlFor='b_totProcedFee'>TOTAL PROCEDURAL FREE:  </label>
                    <div className='amount__total'>{(Number(sumData.totalAmount)).toFixed(2)}</div>
            </div>  

            <div className='book__row1'>
                    <label htmlFor='b_addFee'>CANCELLATION/RESCHEDULED FEE:  </label>
                    <div className='amount__total'>{(Number(data.totalAmount)).toFixed(2)}</div>
            </div>   

            <hr className='span__line'></hr>
            
            <div className='book__row1'>
                    <label htmlFor='b_payment'>TOTAL BILL:  </label>
                    <div className='amount__total total'>PHP {(Number((Number(sumData.totalAmount)).toFixed(2)) + Number((Number(data.totalAmount)).toFixed(2))).toFixed(2)}</div>
            </div> 

            <div className='book__row1'>
                  <label htmlFor='b_paymentType'>MODE OF PAYMENT: </label>
                    <select id="b_paymentType" name="b_paymentType" onChange={handleChange} >
                        <option value="" disabled selected>Select your option</option>
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                    </select>
            </div>

              <div className='book__row'>
                <label htmlFor='b_payment'>PAID AMOUNT: </label>
                <input className='b_payment' type='number' id="b_payment" name="b_payment" value={amountPaid} onChange={handleChange} placeholder="Enter Amount Paid" />
 
              </div> 


              <div className='book__row1'>
                    <label htmlFor='b_change'>CHANGE AMOUNT:  </label>
                    <div className='amount__total total'>PHP {amountPaid - ((Number((Number(sumData.totalAmount)).toFixed(2)) + Number((Number(data.totalAmount)).toFixed(2))).toFixed(2))}</div>
            </div> 

           

             

          

              <div className='back__update-buttons'>
                <input type="submit" value="SAVE" className='btn-update' />
                <input type="submit" value="SAVE & NEXT" className='btn-update' />
         
              </div>
           
         
            </form>
          </div>
        </main>
            
      </body>

    </div>
  )
}

export default Payment