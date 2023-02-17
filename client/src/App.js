import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


import Appointment from './pages/Appointment';
import MyProfile from './pages/MyProfile';
import PendingAppointment from './pages/PendingAppointment';
import AdminNavbar from './pages/AdminNavbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import AboutUsMain from './pages/AboutUsMain';
import HomeLogin from './pages/HomeLogin';
import UpdateAppointment from './pages/UpdateAppointment';
import Allergies from './pages/Allergies';
import ReminderAppointment from './pages/ReminderAppointment';
import Employee from './pages/Employee';
import Employee_Add from './pages/Employee_Add';
import Employee_Update from './pages/Employee_Update';
import Completed from './pages/Completed';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
    <ToastContainer position='top-center' />
      <Routes>
         
          <Route path="/admin" element={<AdminNavbar />} />
          <Route path="/admin/employee" element={<Employee />} />
          <Route path="/admin/appointment/update/:id" element={<UpdateAppointment />} />
          <Route path='/admin/appointment' element={<PendingAppointment />} />

          <Route path='/admin/employee/add' element={<Employee_Add />} />
          <Route path='/admin/employee/update/:id' element={<Employee_Update />} />

          <Route path='/admin/completed' element={<Completed />} />


          <Route path="/appointment" element={<Appointment />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/reminder' element={<ReminderAppointment />} />

          <Route path='/' element={<Home />} />
          <Route path='/about' element={<AboutUsMain />} />

          <Route path='/login' element={<HomeLogin />} />
          <Route path='/allergies' element={<Allergies />} /> 
      </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
