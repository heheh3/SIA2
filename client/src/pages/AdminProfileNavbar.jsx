import React from 'react';
import "../css/ProfileNavbar.css";
import {NavLink, useParams} from "react-router-dom";


  

const AdminProfileNavbar = () => {
    const {id} = useParams();
 
    return (
        <div>
            <nav className='ProfileNavbar__header'>
                <ul>
                    <li className='ProfileNavbar__list'><NavLink className='PNList' to={`/admin/user/profile-settings/${id}`}>PROFILE SETTINGS</NavLink></li>
                    <li className='ProfileNavbar__list'><NavLink className='PNList' to={`/admin/user/medical-history/${id}`}>MEDICAL HISTORY</NavLink></li>
                    <li className='ProfileNavbar__list'><NavLink className='PNList' to={`/admin/user/appointment-history/${id}`}>APPOINTMENT HISTORY</NavLink></li>
                </ul>
            </nav> 
        </div>
        
  )
}

export default AdminProfileNavbar