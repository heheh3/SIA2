import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminProfileNavbar from './AdminProfileNavbar'
import {Link} from 'react-router-dom'

const AdminMedicalHistory = () => {
    return (
        <div>
            <header>
                <AdminNavbar />
            </header>
            <body>
                <Link to="/admin/user">
                    <button className='back__patient'><span>Back</span></button>
                </Link>
                <main className='patient-settings'>
                    <div className='profileNavbar__container'>
                        <AdminProfileNavbar />
                        <div className='profile__container'>
    
                        </div>
                    </div>
                </main>
            </body>
      </div>
      )
}

export default AdminMedicalHistory