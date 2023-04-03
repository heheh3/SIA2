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
                <li><NavLink to="/admin/appointment" style={{fontSize: "1rem"}}>APPOINTMENT</NavLink></li>
                <li><NavLink to="/admin/services" style={{fontSize: "1rem"}}>SERVICES</NavLink></li>
                <li><NavLink to="/admin/completed" style={{fontSize: "1rem"}}>TRANSACTION</NavLink></li>
                <li><NavLink to="/admin/employee" style={{fontSize: "1rem"}}>EMPLOYEE</NavLink></li>
                <li><NavLink to="/admin/user" style={{fontSize: "1rem"}}>PATIENT</NavLink></li>
                <li><NavLink to="/admin/walk-in" style={{fontSize: "1rem"}}>WALK IN</NavLink></li>
                <li><NavLink to="/admin/inventory" style={{fontSize: "1rem"}}>INVENTORY</NavLink></li>
 
            </ul>
            <ul>
                <FaUserNurse className='User-Icon' />
                <div className='username__navbar' style={{fontSize: "0.9rem"}}> {currentUser.p_username} </div>
                <Link to="/">
                    <li><button className='btn__logout'>LOGOUT</button></li>
                </Link>
            </ul>
        </nav>
    </header>
  )
}

