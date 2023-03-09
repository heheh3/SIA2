import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import '../css/Home.css';
import {toast} from "react-toastify";


const initialState = {
    a_ID: "",
    b_procedure: "",
    b_note: "",
    toothNo: "",
    procedFee: ""
  }


const ProceduresAdd = () => {
    const [state, setState] = useState(initialState);
    const {a_ID, b_procedure, b_note, toothNo, procedFee} = state;
    const {id} = useParams();
    console.log(id)
    const navigate = useNavigate();


    const handleSubmit = (e) =>{
        e.preventDefault();
        if (!b_procedure || !toothNo || !procedFee){
            toast.error("Please provide value into each input field");
    
        } else{
            axios.post(`http://localhost:5000/admin/appointment/procedure/post/${id}`, {
                a_ID,
                b_procedure,
                b_note,
                toothNo,  
                procedFee
          })
          
            .then(()=>{
                setState({a_ID: "", b_procedure: "", b_note: "", toothNo: "", procedFee: ""});
                toast.success("Procedure Added Successfully");
                setTimeout(()=> navigate(`/admin/appointment/procedures/${id}`),500)
            })
            .catch((err) => toast.error(err.response.data));
            
          }
        }
      
    
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
      
    }
    

    return (
        <div>
            <header>
                <AdminNavbar />
            </header>
            <body>
                <Link to={`/admin/appointment/procedures/${id}`}>
                    <button className='back__procedures'><span>Back</span></button>
                </Link>           
                <main className='display--flex m-0'>
                    <div className='add-procedure appointmentCard'>
                        <h3 className='book__title'>ADD PROCEDURE DETAILS</h3>
                        <form onSubmit={handleSubmit} style={{display: 'relative'}}>
                            <div className='book__row'>
                                <label htmlFor='procedure'>PROCEDURE: </label>
                                <select id="b_procedure" name="b_procedure"  value={b_procedure || "" }  onChange={handleChange} >
                                        <option value="" disabled selected>Select your option</option>
                                        <option value="Fillings">Fillings</option>
                                        <option value="Root Canal">Root Canal</option>
                                        <option value="Consultation">Consultation</option>
                                        <option value="Fixing Bridge">Fixing Bridge</option>
                                        <option value="Dental Implant">Dental Implant</option>
                                        <option value="Dental Crown">Dental Crown</option>
                                        <option value="X-Ray">X-Ray</option>
                                        <option value="Teeth Whitening"> Teeth Whitening</option>
                                        <option value="Dental Brace">Dental Brace</option>
                                        <option value="Tooth Extraction">Tooth Extraction</option>
                                        <option value="Scaling">Scaling</option>						
                                        <option value="Others">Others (Add a Note)</option>
                                </select>
                            </div>
                            <div className='book__row'>
                                <label htmlFor='note'>NOTES: </label>
                                <textarea for="note" id="b_note" name="b_note" value={b_note || "" }  onChange={handleChange} placeholder='Add some notes... (optional)' />
                            </div> 
                            <div className='book__row'>
                                <label htmlFor='toothNo'>TOOTH NUMBER: </label>
                                <input type="text" className='toothNoStyle' for="toothNo" id="toothNo" name="toothNo" value={toothNo || "" }  onChange={handleChange} placeholder='Enter Tooth Position/Number' />
                            </div>
                            <div className='book__row'>
                                <label htmlFor='procedFee'>PROCEDURE FEE: </label>
                                <input type="number" className='procedFee' for="procedFee" id="procedFee" name="procedFee" value={procedFee || "" }  onChange={handleChange} placeholder='Enter the Procedure Fee' />
                            </div> 
                            <div className='book__row' hidden>
                                <label htmlFor='a_ID' hidden>APPOINTMENT ID: </label>
                                <input type="number" className='a_ID' for="a_ID" id="a_ID" name="a_ID" value={id}  onChange={handleChange} placeholder='Enter the Procedure Fee' hidden />
                            </div> 
        

                            <div className='back__update-buttons1'>
                                <input type="submit" value="SUBMIT" className='btn-update1' />
                            </div>
                     </form>
                </div>
            </main>
        </body>
    </div>
    )
    }

    export default ProceduresAdd