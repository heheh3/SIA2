import React from 'react';
import logo from "../img/logo.png";
import {NavLink, Link} from "react-router-dom";

export default function AdminNavbar() {
  return (
    <header>
        <nav>
            <div className='title'>
                <img className='title__logo' src={logo} alt="title" />
                <h2 className='title__name'>TOOTHFULLY YOURS</h2>
            </div>
            <ul>
                <li><NavLink to="/admin/appointment">APPOINTMENT</NavLink></li>
                <li><NavLink to="/admin/completed">TRANSACTION</NavLink></li>
                <li><NavLink to="/admin/employee">EMPLOYEE</NavLink></li>
                <li><NavLink to="/admin/patient">PATIENT</NavLink></li>
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

