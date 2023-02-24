import React, {useContext} from 'react';
import logo from "../img/logo.png";
import {NavLink, Link} from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FaUserNurse  } from "react-icons/fa";

export default function AdminNavbar() {
    const { currentUser } = useContext(AuthContext);
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
                <li><NavLink to="/admin/user">PATIENT</NavLink></li>
                <li><NavLink to="/admin/walk-in">WALK IN</NavLink></li>
            </ul>
            <ul>
                <FaUserNurse className='User-Icon' />
                <div className='username__navbar'> {currentUser.p_username} </div>
                <Link to="/">
                    <li><button className='btn__logout'>LOGOUT</button></li>
                </Link>
            </ul>
        </nav>
    </header>
  )
}

