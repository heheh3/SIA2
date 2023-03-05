import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminProfileNavbar from './AdminProfileNavbar'

const AdminMedicalHistory = () => {
    return (
        <div>
            <header>
                <AdminNavbar />
            </header>
            <body>
                <main>
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