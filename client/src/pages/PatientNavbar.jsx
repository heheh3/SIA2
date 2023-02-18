import React from 'react';
import "../css/Navbar.css";
import logo from "../img/logo.png";
import {NavLink, Link} from "react-router-dom";

export default function PatientNavbar() {
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
                <li><NavLink to="/profile">MY PROFILE</NavLink></li>
                <li><NavLink to="/reminder">REMINDER</NavLink></li>
            </ul>
            <ul>
                <Link to="/">
                    <li><button className='btn__logout'>LOGOUT</button></li>
                </Link>
                
            </ul>
        </nav> 
    </header>
  )
}

