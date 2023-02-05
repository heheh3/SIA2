import React from 'react'
import PatientNavbar from './PatientNavbar'
import reminder from "../img/reminder.svg";
import time from "../img/image 17.png";
import date from "../img/image 18.png";
import "../css/Reminder.css";


const ReminderAppointment = () => {
  return (
    <div>
        <header>
            <PatientNavbar />
        </header>
        <main style={{margin: '0'}}>
        
          <div className='reminder'>
              <div className='reminder__col move-right'>
                  <img className='reminder__image' src={reminder} alt="React Image" />
              </div>
              <div className='reminder__col'>
                <h1 className='reminder-title color'>APPOINTMENT REMINDER</h1>
                <p className='reminder-title--description darkcolor'>This is a reminder that you have an appointment <br/> schedule for this time and date</p>
                <span className='reminder-header'></span>
                <div className='reminder-date-time'>
                  <div className='date-time-icon'>
                    <img className='reminder__icon' src={date} alt="React Image" />    
                    
                    <div  className='reminder__data'>Mon, January 21, 2023</div>
                  </div>
                  <div className='date-time-data'>
                  <img className='reminder__icon' src={time} alt="React Image" />                
                    <div className='reminder__data'>10:00 AM</div>
                  </div>
                </div>
                <div className='reminder-cancel-resched'>
                    <button className='btn-ap resched'>Reschedule</button>
                    <button className='btn-ap cancel'>Cancel</button>
                </div>
              </div>
            </div>
    
        </main>
    </div>
  )
}

export default ReminderAppointment