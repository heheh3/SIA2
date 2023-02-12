import React from 'react'
import "../css/Appointment.css";
import Navbar from './Navbar'
import { FaLocationArrow } from "react-icons/fa";
import imgHome from "../img/image home.png";


const Home = () => {
  return (
    <div>
        <header>
            <Navbar/>
        </header>
        <body>
        <main className='display--flex'>
        
          <div className='home intro'>
            <h3 className='intro__title'>TOOTHFULLY YOURS</h3>
            <h1 className='intro__description'> We&apos;re open and <br/>welcoming<br/>patients.</h1>
            <p className='intro__description2'>We have implemented a number of safety measures
                      to ensure not <br/> only dental health but also the safety
                      of both our patients and team.</p>
            <p className='intro__description2'><strong>Contact Number: </strong> (+63)9123456789 &nbsp; <strong>Email:</strong> toothfully@gmail.com</p>
                      
            <div className='intro__location'>
                <a href=''><FaLocationArrow /> Sampaguita St., Mintal 8000, Davao City, Philippines</a>  
            </div>
          </div>  
          <div className='home' >
            <div className='home__img'>
                <img src={imgHome} alt="Image Home"/>
            </div>
            </div>    
        </main>
        </body>
    </div>
  )
}

export default Home