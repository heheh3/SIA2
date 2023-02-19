import React from 'react'
import ProfileNavbar from './ProfileNavbar'
import PatientNavbar from './PatientNavbar'
import "../css/Profile.css";



const ProfileSettings = () => {
  return (
    <div>
      <header>
        <PatientNavbar />
      </header>
      <body>
        <main>
            <div className='profileNavbar__container'>
              <ProfileNavbar />
              <div className='profile__container'>

              </div>
            </div>
        </main>
      </body>
    </div>
  )
}

export default ProfileSettings