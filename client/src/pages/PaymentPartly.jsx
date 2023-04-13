import React, { useState, useEffect } from 'react';
import {useParams, Link, useNavigate } from "react-router-dom"
import "../css/Appointment.css";  
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import AdminNavbar from './AdminNavbar';
import {parseISO, format} from 'date-fns';
import {toast} from "react-toastify";




const initialState = {
  p_paymentType: "",
  p_paidAmount: 0,
  p_status: ''
};

const initialState1 = {
  b_date: "",
  b_time: "",
  b_procedure: "",
  b_note: "",
  b_status: "",
  b_paymentStatus: "",
  procedFee: "",
  b_update: ""
};


const PaymentPartly = () => {
    const [data, setData] = useState([]);
    const [payment, setPayment] = useState([]);
    const [data1, setData1] = useState([]);
    const [state, setState] = useState(initialState);
    const [state1, setState1] = useState(initialState1);
    const {b_date, b_time, b_procedure, b_note, b_status, b_paymentStatus, procedFee, b_update} = state1;
    const [invoice_ID, setInvoice_ID] = useState(0);
    const {p_paymentType, p_paidAmount, p_status} = state;
    const [sumData, setSumData] = useState([]);
    const dateToday = format(new Date(), 'EEE, MMM dd, yyyy h:mm aa');
    const navigate = useNavigate();
    const {id} = useParams();
    const [service_ID, setService_ID] = useState(id);

    const loadData = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/get/${id}`);
        const { b_date, b_time, b_procedure, b_note, b_status, b_paymentStatus, procedFee, b_update} = response.data[0];
        const isoDateString = format(new Date(b_date), 'yyyy-MM-dd');
        const parsedDate = parseISO(isoDateString);
        console.log(isoDateString)
        console.log("parse:" + parsedDate)
    
        setState1({b_date: parsedDate, b_time: b_time, b_procedure: b_procedure, b_note: b_note, b_status: b_status, b_paymentStatus: b_paymentStatus, procedFee: procedFee, b_update: b_update}); 
        

        setData1(response.data[0]);  
    }

    console.log(data1)

    useEffect(()=>{
        loadData();
    }, [id])

    const cancelledSum = async () =>{
      const response = await axios.get(`http://localhost:5000/admin/completedCancelled/sum/${data1.user_id}/${data1.a_ID}`);
      setData(response.data[0]);  
    }

  useEffect(()=>{
      cancelledSum();
  }, [data1.user_id, data1.a_ID])


    const loadSum = async () =>{
        const response = await axios.get(`http://localhost:5000/admin/appointment/procedure/sum/${id}`);
        setSumData(response.data[0]);  
    }

    useEffect(()=>{
        loadSum();   
    }, [id])

    
    const Payment = async () =>{
      const response = await axios.get(`http://localhost:5000/admin/payment/getOne/${id}`);
      setPayment(response.data[0]);  
  }

  useEffect(()=>{
    Payment();   
  }, [id])


   


    const handleSubmit = (e) =>{
      e.preventDefault();

      const sumProced = (Number(sumData.totalAmount))
      let p_totalProd = sumProced
      const sumFee= (Number(data.totalAmount))
      let p_addFee = sumFee
      const totalAmount = (Number((Number(payment.p_balance)).toFixed(2)))
      let p_totalPayment = totalAmount
      const change = (Number(p_paidAmount) - ((Number((Number(payment.p_balance)).toFixed(2))).toFixed(2)))
      let p_change = change
      const balance = (((Number((Number(payment.p_balance)).toFixed(2))).toFixed(2)) - p_paidAmount)
      let p_balance = balance
      if(p_balance < 0) p_balance = 0
      if(p_change < 0) p_change = 0
      let paymentStatus = data1.b_paymentStatus
      let p_stat = payment.p_status
      if(paymentStatus === "Partly-Paid" && p_balance === 0){
        paymentStatus = "Fully-Paid" 
        p_stat = 'Full';
      }
      
      if(paymentStatus === "Partly-Paid" && p_balance !== 0) {
        paymentStatus = "Partly-Paid"  
        p_stat = 'Partly';
      }
      let b_paymentStatus = paymentStatus
      let p_status = p_stat

      if (!p_paymentType || !p_paidAmount){
      
  
          toast.error("Please provide value into each input field");

      } else{
           axios.post(`http://localhost:5000/admin/completed/payment/${id}`, {
            invoice_ID,
            service_ID,
            p_date: dateToday,
            p_totalProd,
            p_addFee,
            p_totalPayment,
            p_paymentType,
            p_paidAmount,
            p_change,
            p_balance, 
            p_status
             
            })

            axios.put(`http://localhost:5000/admin/appointment/update/${id}`, {
                b_date,
                b_time,
                b_procedure,
                b_note,
                b_status,  
                b_paymentStatus,
                procedFee,
                b_update
          })
          
          .then(()=>{
              setState({p_paidAmount: "" , p_paymentType: ""})
              toast.success("Service Updated Successfully");
          }).catch((err) => toast.error(err.response.data) );

          setTimeout(()=> navigate("/admin/completed"), 300)
        }
      }



    const handleChange = (event) => {
      const {name, value} = event.target;
      setState({...state, [name]: value});
  
  
  
    
    }
  return (
    <div style={{backgroundColor: "#E0F9F8"}}>
        <header>
            <AdminNavbar />  
        </header>
        <body>
        <Link to={`/admin/completed`}>
          <button className='back__procedures'><span>Back</span></button>
        </Link>
        <main className='display--flex m-0'>
          <div className='update appointmentCard2'>
            <h3 className='payment__title'>PAYMENT DETAILS</h3>

            <form onSubmit={handleSubmit} style={{display: 'relative'}}>

            <div className='book-row1'>
                    <input 
                      type='number' 
                      name='invoice_ID' 
                      id='invoice_ID'
                      value={setInvoice_ID} 
                      hidden
                    />
                  </div>
              <div className='book-row1'>
                    <input 
                      type='number' 
                      name='service_ID' 
                      id='service_ID'
                      value={setService_ID} 
                      hidden
                    />
                </div>

            <div className='book__row1'>
                  <label className='p_label' htmlFor='a_ID'>SERVICE ID:  </label>
                <div className='amount__total infos'>{data1.a_ID}</div>
            </div>   
            <div className='book__row1'>
                    <label className='p_label' htmlFor='b_fullname'>NAME:  </label>
                    <div className='amount__total infos'>{data1.p_fullname}</div>
            </div>

            <div className='book__row1'>
                    <label className='p_label' htmlFor='p_date'>DATE:  </label>
                    <div id="p_date" name="p_date" className='amount__total' >{dateToday}</div>
            </div>    

            <div className='book__row1'>
                <label className='p_label' htmlFor='b_totProcedFee'>TOTAL PROCEDURAL FEE:  </label>
                <div id="p_totalProd" name="p_totalProd" className='amount__total' >{(Number(sumData.totalAmount)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>  

            <div className='book__row1'>
                    <label className='p_label' htmlFor='b_addFee'>CANCELLATION/RESCHEDULED FEE:  </label>
                    <div id="p_addFee" name="p_addFee" className='amount__total'>{(Number(data.totalAmount)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>   

            <div className='book__row1'>
              <label className='p_label' htmlFor='b_totalpayment'>TOTAL BILL:  </label>
              <div id="p_totalPayment" name="p_totalPayment" className='amount__total total' style={{fontWeight: "bold"}}>PHP {(Number((Number(sumData.totalAmount)).toFixed(2)) + Number((Number(data.totalAmount)).toFixed(2))).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div> 


            <hr className='span__line'></hr>
            
            <div className='book__row1'>
              <label className='p_label' htmlFor='b_totalpayment'>REMAINING BILL:  </label>
              <div id="p_totalPayment" name="p_totalPayment" className='amount__total total' style={{fontWeight: "bold"}}>PHP {payment.p_balance}</div>
            </div> 


            <div className='book__row1'>
              <label className='p_label' htmlFor='p_paymentType'>MODE OF PAYMENT: </label>
                <select className=' payment__select' id="p_paymentType" name="p_paymentType" value={p_paymentType} onChange={handleChange} >
                  <option value="" disabled selected>Select your option</option>
                  <option value="Cash">Cash</option>
                  <option value="GCash">GCash</option>
                  <option value="Card">Card</option>
                  
              </select>
            </div>

              <div className='book__row1'>
                <label className='p_label' htmlFor='p_paidAmount'>PAID AMOUNT: </label>
                <input className='b_payment payment__select' type='number' id="p_paidAmount" name="p_paidAmount" value={p_paidAmount} onChange={handleChange} placeholder="Enter Amount Paid" />
              </div> 
            
            {0 <= (Number(p_paidAmount) - (Number((Number(payment.p_balance)).toFixed(2))).toFixed(2)) ? (
                <>
                    <div className='book__row1'>
                        <label className='p_label' htmlFor='p_change'>CHANGE AMOUNT:  </label>
                        <div id="p_change" name="p_change" className='amount__total total'>PHP {(p_paidAmount - (Number((Number(payment.p_balance)).toFixed(2))).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                     </div> 
                
                </> 
                ) : (
                <>
            
                    <div className='book__row1'>
                        <label className='p_label' htmlFor='b_change'>CHANGE AMOUNT:  </label>
                        <div id="p_change" name="p_change"  className='amount__total total'>PHP 0.00</div>
                     </div> 

                     <div className='book__row1'>
                        <label className='p_label' htmlFor='p_balance'>REMAINING BALANCE:  </label>
                        <div id="p_balance" name="p_balance" className='amount__total total'>PHP {(((Number((Number(payment.p_balance)).toFixed(2))).toFixed(2))- p_paidAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                     </div> 

                </>
                     
                )}
              <div className='back__update-buttons'>
  
                <input type="submit" value="SAVE & NEXT" className='payment__btn-update' />
         
              </div>
           
         
            </form>
          </div>
        </main>
            
      </body>

    </div>
  )
}

export default PaymentPartly