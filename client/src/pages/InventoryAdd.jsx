import React, { useState } from 'react';
import {useNavigate, Link } from "react-router-dom"
import AdminNavbar from './AdminNavbar'
import '../css/Home.css';
import DatePicker from 'react-datepicker';
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    i_item: "",
    i_room: "",
    i_model: "",
    i_serial: "",
    i_place: "",
    i_datepurchased: "",
    i_quantity: 0,
    i_price: 0,
}

const InventoryAdd = () => {
    const [state, setState] = useState(initialState);
    const {i_item, i_room, i_model, i_serial, i_place, i_datepurchased, i_quantity, i_price} = state
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
      e.preventDefault();

      const i_totalprice = i_quantity * i_price;

      if (!i_item || !i_room || !i_model || !i_serial || !i_place || !i_datepurchased || !i_quantity || !i_price){
          toast.error("Please provide value into each input field");
   
      } else{
          axios.post("http://localhost:5000/inventory/post", {
              i_item,
              i_room,
              i_model,
              i_serial,
              i_place,
              i_datepurchased,
              i_quantity,
              i_price,
              i_totalprice,
          })
          .then(()=>{
              setState(initialState);
              toast.success("Item Added Successfully");
              setTimeout(()=> navigate("/admin/inventory"), 300)
          }).catch((err) => toast.error(err.response.data) );
            // console.log(i_item)
            // console.log(i_room)

            // console.log(i_model)

            // console.log(i_serial)
            // console.log(i_place)
            // console.log(i_datepurchased)

            // console.log(i_quantity)

            // console.log(i_price)
            // console.log(i_totalprice)

   
        
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
        <main className='margin--10'>
          <Link to="/admin/inventory">
                <button className='back__ebutton-style'><span>Back</span></button>
          </Link>
          <div className='employee__container'>
              <h1 className='employee__form-title'>ADD ITEM</h1>
              <div className='employee__form'>
                <form onSubmit={handleSubmit}>
                    <div className='employee__form-row'>
                        <label htmlFor='i_item'>Item/Description:</label>
                        <input 
                        name='i_item'
                        id='i_item'
                        type='text' 
                        className='i_information' 
                        placeholder='Enter Item...' 
                        value={i_item || ""} 
                        onChange={handleChange}/>
                    </div>

                    <div className='employee__form-row'>
                        <label htmlFor='i_room'>Room/Area:</label>
                        <input 
                        name='i_room'
                        id='i_room'
                        type='text' 
                        className='i_information' 
                        placeholder='Enter Room...' 
                        value={i_room || ""} 
                        onChange={handleChange}/>
                    </div>

                    <div className='employee__form-row'>
                        <label htmlFor='i_item'>Model/Make:</label>
                        <input 
                        name='i_model'
                        id='i_model'
                        type='text' 
                        className='i_information' 
                        placeholder='Enter Model Name...' 
                        value={i_model || ""} 
                        onChange={handleChange}/>
                    </div>

                    <div className='employee__form-row'>
                        <label htmlFor='i_item'>Serial Number:</label>
                        <input 
                        name='i_serial'
                        id='i_serial'
                        type='text' 
                        className='i_information' 
                        placeholder='Enter Serial Number...' 
                        value={i_serial || ""} 
                        onChange={handleChange}/>
                    </div>

                    <div className='employee__form-row'>
                        <label htmlFor='i_item'>Place of Purchase:</label>
                        <input 
                        name='i_place'
                        id='i_place'
                        type='text' 
                        className='i_information' 
                        placeholder='Enter Place of Purchase...' 
                        value={i_place || ""} 
                        onChange={handleChange}/>
                    </div>

                    <div className='employee__form-row'>
                        <label htmlFor='e_birthdate'>Date of Purchase: </label>
                        <div className='date__container'>
                        <DatePicker
                            id='i_datepurchased'
                            name='i_datepurchased'
                            className='datepicker__style'
                            selected={i_datepurchased}
                            onChange={(date) => handleChange({target: {name: 'i_datepurchased', value: date}})}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="mm/dd/yyyy"
                            showYearPicker
                            value={i_datepurchased || ""}  

                        />
                        </div>
                    </div>

                    <div className='employee__form-row'>
                        <label htmlFor='i_item'>Quantity:</label>
                        <input 
                        name='i_quantity'
                        id='i_quantity'
                        type='number' 
                        className='i_information' 
                        placeholder='Enter Quantity...' 
                        value={i_quantity || ""} 
                        onChange={handleChange}/>
                    </div>

                    <div className='employee__form-row'>
                        <label htmlFor='i_item'>Purchase Price:</label>
                        <input 
                        name='i_price'
                        id='i_price'
                        type='number' 
                        className='i_information' 
                        placeholder='Enter Purchase Price...' 
                        value={i_price || ""} 
                        onChange={handleChange}/>
                    </div>

                    <input type="submit" className='book-button' value="SAVE" />
                
                </form>
            </div>
          </div>
        </main>
    </div>
  )
}

export default InventoryAdd