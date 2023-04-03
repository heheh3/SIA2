import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import AdminNavbar from './AdminNavbar'
import { FaSearch, FaPlusCircle  } from "react-icons/fa";
import '../css/Home.css';
import { toast } from 'react-toastify';
import axios from 'axios';




const Inventory = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [nearlyRunningOutItems, setNearlyRunningOutItems] = useState([]);
  //const [nearlyExpiredItems, setNearlyExpiredItems] = useState([]);
  //const [statusExpired, setStatusExpired] = useState([]);
  
  

  const loadData = async () =>{
    const response = await axios.get("http://localhost:5000/inventory/get");
    setData(response.data);  
  };

  useEffect(()=>{
    loadData();
  }, []);


  const deleteInventory = (id)=>{
    if(window.confirm("Are you sure you wanted to delete this item from inventory?")){
        axios.delete(`http://localhost:5000/inventory/delete/${id}`);
        toast.success("Item Deleted Successfully!");
        setTimeout(()=> loadData(), 500);
   
    }
}

  

  const handleInputChange = (id, field, value) => {
    const newData = data.map((item) => {
      if (item.inventoryID === id) {
        const updatedItem = { ...item, [field]: value };
        updatedItem.i_totalprice = updatedItem.i_quantity * updatedItem.i_price; // calculate the new total price
        return updatedItem;
      } else {
        return item;
      }
    });
    setData(newData);
  };

  // const handleQuantityChange = (id, value) => {
  //   const newData = data.map((item) => {
  //     if (item.inventoryID === id) {
  //       const updatedItem = { ...item, i_quantity: item.i_quantity + value };
  //       updatedItem.i_totalprice = updatedItem.i_quantity * updatedItem.i_price; // calculate the new total price
  //       return updatedItem;
  //     } else {
  //       return item;
  //     }
  //   });
  //   setData(newData);
  // };

  const handleQuantityOHChange = (id, value) => {
    const newData = data.map((item) => {
      if (item.inventoryID === id) {
        const updatedQuantityOH = item.i_quantityOH + value;
        const newQuantityOH = updatedQuantityOH < 0 ? 0 : updatedQuantityOH;
        const updatedItem = { ...item, i_quantityOH: newQuantityOH };
        //updatedItem.i_totalprice = updatedItem.i_quantity * updatedItem.i_price; // calculate the new total price
        return updatedItem;
      } else {
        return item;
      }
    });
    setData(newData);
  };

  const handleSaveClick = async (id) => {
    const item = data.find((item) => item.inventoryID === id);
    console.log(item);
    const response = await axios.put(`http://localhost:5000/admin/inventory/update/${id}`, item);
    if (response.status === 200) {
      toast.success("Item Updated Successfully!");
    } else {
      toast.error("Item Update Failed!");
    }
  };

  

  useEffect(() => {
    const total = data.reduce((sum, item) => sum + Number(item.i_totalprice), 0);
    setTotalPrice(total);
  }, [data]);

  const today = new Date(); // get the current date
  const nearlyExpiredItems = data
    .map(item => {
      const expiryDate = new Date(item.i_expirydate); // parse the expiry date
      const daysLeft = Math.round((expiryDate - today) / (1000 * 60 * 60 * 24)); // calculate days left
      return { ...item, daysLeft: daysLeft < 0 ? 0 : daysLeft }; // set daysLeft to 0 if expired today
    })
    .filter(item => item.daysLeft >= 0 && item.daysLeft <= 30) // filter out items with more than 30 days left
    .sort((a, b) => a.i_expirydate.localeCompare(b.i_expirydate));

  const nearlyRunOutItems = data.filter(item => item.i_quantityOH > 0 && item.i_quantityOH <= 10);
  const runOutItems = data.filter(item => item.i_quantityOH === 0);

    
  return (
    <div>
        <header>
            <AdminNavbar />
        </header>
        <body className='pending_body'>
          <div className='pending_body-flex'>
            <div className='employee__header'>
                <div className='add__ebutton'>
                  <Link to="/admin/inventory/add">
                    <button className='add__ebutton-style'><span>ADD ITEM</span> <FaPlusCircle className="add-icon"/></button>
                  </Link>
                </div>

                <div className='search__bar-container'>
                    <input type='text' className='search__bar' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search Here..."/>
                    <span className='search__bar-icon'><FaSearch className="bar-icon"/></span>
                </div>
            </div>

            <table className='styled-table'>
              <thead>
                <tr>
                  <th style={{textAlign: "center"}}>No.</th>
                  <th style={{textAlign: "center"}}>Item ID</th>
                  <th style={{textAlign: "center"}}>Item</th>
                  <th style={{textAlign: "center"}}>Room/Area</th>
                  <th style={{textAlign: "center"}}>Make/Model</th>
                  <th style={{textAlign: "center"}}>Serial Number</th>
                  <th style={{textAlign: "center"}}>Place of Purchase</th>
                  <th style={{textAlign: "center"}}>Date Purchased</th>
                  <th style={{textAlign: "center"}}>Expiry Date</th>
                  <th style={{textAlign: "center"}}>Quantity Bought</th>
                  <th style={{textAlign: "center"}}>Purchase Price</th>
                  <th style={{textAlign: "center"}}>Quantity On-hand</th>
                  <th style={{textAlign: "center"}}>Total Price</th>
                  <th style={{textAlign: "center"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.filter((item) =>{
                    return searchValue.toLowerCase() === '' || item.i_item.toLowerCase().includes(searchValue) 
                        || item.i_room.toLowerCase().includes(searchValue) || item.i_model.toLowerCase().includes(searchValue) 
                        || item.i_serial.toLowerCase().includes(searchValue) || item.i_place.toString().includes(searchValue)
                        || item.i_datepurchased.toLowerCase().includes(searchValue) || item.i_price.toString().includes(searchValue)   
                        || item.inventoryID.toString().includes(searchValue) 
                        
                }).map((item, index)=>{
                    return(
                        <tr key={item.inventoryID}>
                            <th scope='row'>{index+1}</th>
                            <td>{item.inventoryID}</td>
                            <td>
                            <input type="text" className="i_inputs" name="i_item" value={item.i_item} onChange={(e) => handleInputChange(item.inventoryID, 'i_item', e.target.value)} />
                            </td>
                            <td>
                              <input type="text" className="i_inputs" name="i_room" value={item.i_room} onChange={(e) => handleInputChange(item.inventoryID, 'i_room', e.target.value)} />
                            </td>
                            <td>
                              <input type="text" className="i_inputs" name="i_model" value={item.i_model} onChange={(e) => handleInputChange(item.inventoryID, 'i_model', e.target.value)} />
                            </td>
                            <td>
                              <input type="text" className="i_inputs" name="i_serial" value={item.i_serial} onChange={(e) => handleInputChange(item.inventoryID, 'i_serial', e.target.value)} />
                            </td>
                            <td>
                              <input type="text" className="i_inputs" name="i_place" value={item.i_place} onChange={(e) => handleInputChange(item.inventoryID, 'i_place', e.target.value)} />
                            </td>
                            <td>
                              <input type="text" className="i_inputs" name="i_datepurchased" value={item.i_datepurchased} onChange={(e) => handleInputChange(item.inventoryID, 'i_datepurchased', e.target.value)} />
                            </td>
                            <td>
                              <input type="text" className="i_inputs" name="i_datepurchased" value={item.i_expirydate} onChange={(e) => handleInputChange(item.inventoryID, 'i_expirydate', e.target.value)} />
                            </td>
                            <td>
                              <input type="text" className="i_inputs" value={item.i_quantity} onChange={(e) => handleInputChange(item.inventoryID, 'i_quantity', parseInt(e.target.value))} />
                            </td>
                            <td>
                              <input type="number" className="i_inputs" step="0.01" value={item.i_price} onChange={(e) => handleInputChange(item.inventoryID, 'i_price', parseFloat(e.target.value))} />
                            </td>
                            <td>
                            <div className='quantity-container'>
                              <button className='quantity-btn minus' onClick={() => handleQuantityOHChange(item.inventoryID, -1)}> - </button>
                              <input type="text" className="i_inputs"  value={item.i_quantityOH} onChange={(e) => handleInputChange(item.inventoryID, 'i_quantityOH', parseInt(e.target.value))} />
                            </div>
                            </td>
                            <td>{item.i_totalprice}</td>
                            <td>
                              <div className='quantity-container'>
                              <button className='btn btn-delete' onClick={() => handleSaveClick(item.inventoryID)}>Save</button>
                              <button className='btn btn-delete' onClick={() => deleteInventory(item.inventoryID)}>Delete</button>  
                              </div>                            
                            </td>
                        </tr>   
                      )})}
                </tbody>
                <tfoot>
                <tr>
                  <td colSpan="12" style={{ textAlign: "right" }}>Total Spent:</td>
                  <td>{"PHP " + totalPrice}</td>
                  <td></td>
                </tr>
                </tfoot>
              </table> 
              <div className='employee__header'>
                <div className='add__ebutton'>
                      <h2 className='expired_header'> Nearly Expired Items</h2>
                </div>
            </div>
              <table className='styled-table'>
                <thead>
                  <tr>
                    <th style={{textAlign: "center"}}>No.</th>
                    <th style={{textAlign: "center"}}>Item ID</th>
                    <th style={{textAlign: "center"}}>Item</th>
                    <th style={{textAlign: "center"}}>Serial</th>
                    <th style={{textAlign: "center"}}>Expiry Date</th>
                    <th style={{textAlign: "center"}}>Days Left</th>
                    <th style={{textAlign: "center"}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                {nearlyExpiredItems.map((item, index) => {
                  const status = item.daysLeft === 0 ? "Expired" : item.daysLeft <= 7 ? "Nearly Expired" : "Good to Use";
                  return (
                    <tr key={item.inventoryID}>
                      <th scope='row'>{index+1}</th>
                      <td>{item.inventoryID}</td>
                      <td>{item.i_item}</td>
                      <td>{item.i_serial}</td>
                      <td>{item.i_expirydate}</td>
                      <td>{item.daysLeft}</td>
                      <td>{status}</td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
              <div className='employee__header'>
                <div className='add__ebutton'>
                      <h2 className='expired_header'> Nearly Running Out Items <code>(10 & Below Quantity)</code> </h2>
                </div>
            </div>
              <table className='styled-table'>
                <thead>
                  <tr>
                    <th style={{textAlign: "center"}}>No.</th>
                    <th style={{textAlign: "center"}}>Item ID</th>
                    <th style={{textAlign: "center"}}>Item</th>
                    <th style={{textAlign: "center"}}>Quantity On-hand</th>
                    <th style={{textAlign: "center"}}>Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                {nearlyRunOutItems.map((item, index) => {
                  return (
                    <tr key={item.inventoryID}>
                    <td>{index + 1}</td>
                    <td>{item.inventoryID}</td>
                    <td>{item.i_item}</td>
                    <td>{item.i_quantityOH}</td>
                    <td>{item.i_expirydate}</td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
            
          </body>
        </div>
  )
}

export default Inventory