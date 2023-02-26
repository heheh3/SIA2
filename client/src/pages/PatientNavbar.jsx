import React, {useContext} from 'react';
import "../css/Navbar.css";
import logo from "../img/logo.png";
import {NavLink, Link} from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FaUserCircle  } from "react-icons/fa";


export default function PatientNavbar() {
    const { currentUser } = useContext(AuthContext);
    return (
        <header>
            <nav>
                <div className='title'>
                    <img className='title__logo' src={logo} alt="React Image" />
                    <h2 className='title__name'>TOOTHFULLY YOURS</h2>
                </div>
                <ul>
                    <li><NavLink to="/appointment">HOME</NavLink></li>
                    <li><NavLink to="/aboutUs">ABOUT US</NavLink></li>
                    <li><NavLink className='PNList active' to={`/profile/profile-settings/${currentUser.user_id}`}>MY PROFILE</NavLink></li>
                    <li><NavLink to="/reminder">REMINDER</NavLink></li>
                </ul>
                <ul>
                    <FaUserCircle className='User-Icon' />
                    <div className='username__navbar'> {currentUser.p_username} </div>
                    <Link to="/">
                        <li><button className='btn__logout'>LOGOUT</button></li>
                    </Link>
                    
                </ul>
            </nav> 
        </header>
    )
}

