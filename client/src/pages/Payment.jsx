import React, { useState, useEffect } from 'react';
import {useParams, Link, useNavigate } from "react-router-dom"
import "../css/Appointment.css";  
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import AdminNavbar from './AdminNavbar';
import {format} from 'date-fns';
import {toast} from "react-toastify";



const initialState = {
  p_date: "",
  p_totalProd: "",
  p_addFee:"",
  p_totalPayment: "",
  p_paymentType: "",
  p_paidAmount: 0,
  p_change: "",
  p_balance: ""
  
};


const Payment = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [state, setState] = useState(initialState);
    const [state1, setState1] = useState(initialState);

    const [invoice_ID, setInvoice_ID] = useState(0);
    const {p_paymentType, p_paidAmount, p_addFee,p_totalProd, p_totalPayment, p_change,p_balance} = state;
    // const {p_paymentType, p_paidAmount} = state;
    const [sumData, setSumData] = useState([]);
    const dateToday = format(new Date(), 'EEE, MMM dd, yyyy h:mm aa');
    const navigate = useNavigate();
    const {id} = useParams();
    const [service_ID, setService_ID] = useState(id);
    const [p_date, setP_date] = useState(dateToday);


    


    console.log(dateToday)


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

      const sumProced = (Number(sumData.totalAmount))
      let p_totalProd = sumProced
      const sumFee= (Number(data.totalAmount))
      let p_addFee = sumFee
      const totalAmount = (Number((Number(sumData.totalAmount)).toFixed(2)) + Number((Number(data.totalAmount)).toFixed(2)))
      let p_totalPayment = totalAmount
      const balance = (Number(p_paidAmount) - ((Number((Number(sumData.totalAmount)).toFixed(2)) + Number((Number(data.totalAmount)).toFixed(2))).toFixed(2)))
      let p_balance = balance
      if(p_balance < 0) p_balance = 0

      const change = (((Number((Number(sumData.totalAmount)).toFixed(2)) + Number((Number(data.totalAmount)).toFixed(2))).toFixed(2)) - p_paidAmount)
      
      let p_change = change
      if(p_change < 0) p_change = 0

      if (!p_paidAmount || p_paidAmount){
  
          toast.error("Please provide value into each input field");
          toast.error(p_paymentType)
          toast.error(p_paidAmount)
          toast.error(p_balance)
          toast.error(p_change)



     
      } else{
           axios.post("http://localhost:5000/appointment/post", {
            invoice_ID,
            service_ID,
            p_date,
            p_totalProd,
            p_addFee,
            p_totalPayment,
            p_paymentType,
            p_paidAmount,
            p_change,
            p_balance
             
            })
          .then(()=>{
              setState({p_paidAmount: "" , p_paidAmount: ""})
              toast.success("Service Updated Successfully");
          }).catch((err) => toast.error(err.response.data) );
   
          setTimeout(()=> navigate("/completed"), 300)
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
        <Link to={`/admin/completed/procedures/${id}`}>
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

            <hr className='span__line'></hr>
            
            <div className='book__row1'>
              <label className='p_label' htmlFor='b_totalpayment'>TOTAL BILL:  </label>
              <div id="p_totalPayment" name="p_totalPayment" className='amount__total total'>PHP {(Number((Number(sumData.totalAmount)).toFixed(2)) + Number((Number(data.totalAmount)).toFixed(2))).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div> 

            <div className='book__row1'>
              <label className='p_label' htmlFor='p_paymentType'>MODE OF PAYMENT: </label>
                <select className=' payment__select' id="p_paymentType" name="p_paymentType" value={p_paymentType} onChange={handleChange} >
                  <option value="" disabled selected>Select your option</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
              </select>
            </div>

              <div className='book__row1'>
                <label className='p_label' htmlFor='p_paidAmount'>PAID AMOUNT: </label>
                <input className='b_payment payment__select' type='number' id="p_paidAmount" name="p_paidAmount" value={p_paidAmount} onChange={handleChange} placeholder="Enter Amount Paid" />
              </div> 
            
            {0 <= (Number(p_paidAmount) - ((Number((Number(sumData.totalAmount)).toFixed(2)) + Number((Number(data.totalAmount)).toFixed(2))).toFixed(2))) ? (
                <>
                    <div className='book__row1'>
                        <label className='p_label' htmlFor='p_change'>CHANGE AMOUNT:  </label>
                        <div id="p_change" name="p_change" className='amount__total total'>PHP {(Number(p_paidAmount) - ((Number((Number(sumData.totalAmount)).toFixed(2)) + Number((Number(data.totalAmount)).toFixed(2))).toFixed(2))).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
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
                        <div id="p_balance" name="p_balance" className='amount__total total'>PHP {(((Number((Number(sumData.totalAmount)).toFixed(2)) + Number((Number(data.totalAmount)).toFixed(2))).toFixed(2))- p_paidAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
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

export default Payment