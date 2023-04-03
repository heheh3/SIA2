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


const ProceduresUpdate = () => {
    const [state, setState] = useState(initialState);
    const {a_ID, b_procedure, b_note, toothNo, procedFee} = state;
    const [data, setData] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect (() => {

        axios.get(`http://localhost:5000/admin/appointment/procedure/procedure/get/${id}`)
        .then(response => {
          const {a_ID, b_procedure, b_note, toothNo, procedFee } = response.data[0];
          setData(response.data[0]);
          setState({a_ID: a_ID, b_procedure: b_procedure, b_note: b_note, toothNo: toothNo, procedFee: procedFee}); 
        }).catch(error => {
          console.error(error);
        });
          
      }, [id])


    const handleSubmit = (e) =>{
        e.preventDefault();
        if (!b_procedure || !toothNo || !procedFee){
            toast.error("Please provide value into each input field");
    
        } else{
            axios.put(`http://localhost:5000/admin/appointment/procedure/update/${id}`, {
                a_ID,
                b_procedure,
                b_note,
                toothNo,  
                procedFee
          })
          
            .then(()=>{
                setState({a_ID: "", b_procedure: "", b_note: "", toothNo: "", procedFee: ""});
                toast.success("Procedure Updated Successfully");
                setTimeout(()=> navigate(`/admin/appointment/procedures/${a_ID}`),500)
            })
            .catch((err) => toast.error(err.response.data));
            
          }
        }
      
    
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
      
    }

    console.log(data)
    

    return (
        <div>
            <header>
                <AdminNavbar />
            </header>
            <body>
                <Link to={`/admin/appointment/procedures/${data.a_ID}`}>
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
                                        <option value="Others">Other(Add a Note)</option>
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
                            <p className='toothNo__note'>Note: Type <strong>N/A</strong> in Tooth Number if every teeth is included in the procedure</p> 

                            <div className='book__row'>
                                <label htmlFor='procedFee'>PROCEDURE FEE: </label>
                                <input type="number" className='procedFee' for="procedFee" id="procedFee" name="procedFee" value={procedFee || "" }  onChange={handleChange} placeholder='Enter the Procedure Fee' />
                            </div> 
                            <div className='book__row' hidden>
                                <label htmlFor='a_ID' hidden>APPOINTMENT ID: </label>
                                <input type="number" className='a_ID' for="a_ID" id="a_ID" name="a_ID" value={id}  onChange={handleChange} placeholder='Enter the Procedure Fee' hidden />
                            </div> 
        

                            <div className='back__update-buttons1'>
                                <input type="submit" value="UPDATE" className='btn-update1' />
                            </div>
                     </form>
                </div>
            </main>
        </body>
    </div>
    )
    }

    export default ProceduresUpdate