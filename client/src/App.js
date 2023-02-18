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
import Login from './pages/Login';
import UpdateAppointment from './pages/UpdateAppointment';
import Allergies from './pages/Allergies';
import ReminderAppointment from './pages/ReminderAppointment';
import Employee from './pages/Employee';
import EmployeeAdd from './pages/EmployeeAdd';
import EmployeeUpdate from './pages/EmployeeUpdate';
import Completed from './pages/Completed';
import Register from './pages/Register';
import PatientTable from './pages/PatientTable';

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

          <Route path='/admin/employee/add' element={<EmployeeAdd />} />
          <Route path='/admin/employee/update/:id' element={<EmployeeUpdate />} />

          <Route path='/admin/completed' element={<Completed />} />

          <Route path='/admin/patient' element={<PatientTable />} />

          <Route path="/appointment" element={<Appointment />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/reminder' element={<ReminderAppointment />} />

          <Route path='/' element={<Home />} />
          <Route path='/about' element={<AboutUsMain />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/allergies' element={<Allergies />} /> 
      </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
