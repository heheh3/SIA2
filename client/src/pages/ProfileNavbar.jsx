import React from 'react'
import "../css/ProfileNavbar.css";
import {NavLink} from "react-router-dom";

const ProfileNavbar = () => {
  return (
    <div>
        <nav className='ProfileNavbar__header'>
            <ul>
                <li className='ProfileNavbar__list'><NavLink className='PNList' to="/profile/profile-settings">PROFILE SETTINGS</NavLink></li>
                <li className='ProfileNavbar__list'><NavLink className='PNList' to="/profile/medical-history">MEDICAL HISTORY</NavLink></li>
                <li className='ProfileNavbar__list'><NavLink className='PNList' to="/profile/appointment-history">APPOINTMENT HISTORY</NavLink></li>
            </ul>
        </nav> 
    </div>
  )
}

export default ProfileNavbar