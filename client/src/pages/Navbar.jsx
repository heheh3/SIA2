import React from 'react';
import "../css/Navbar.css";
import logo from "../img/logo.png";
import {NavLink, Link} from "react-router-dom";

export default function Navbar() {
  return (
    <header>
        <nav>
            <div className='title'>
                <img className='title__logo' src={logo} alt="React Image" />
                <h2 className='title__name'>TOOTHFULLY YOURS</h2>
            </div>
            <ul>
                <li><NavLink to="/">HOME</NavLink></li>
                <li><NavLink to="/about">ABOUT US</NavLink></li>
            </ul>
            <ul>
                <Link to={'/login'}>
                    <li><button className='btn__login'>LOGIN/SIGN-UP</button></li>
                </Link>
            </ul>
        </nav> 
    </header>
  )
}

