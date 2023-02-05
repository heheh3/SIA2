import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
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

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
    <ToastContainer position='top-center' />
      <Routes>
          <Route path="/admin" element={<AdminNavbar />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/addContact" element={<AddEdit />} />
          <Route path="/admin/appointment/update/:id" element={<UpdateAppointment />} />
          <Route path="/view/:id" element={<View />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/admin/appointment' element={<PendingAppointment />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/about' element={<AboutUsMain />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<HomeLogin />} />
          <Route path='/allergies' element={<Allergies />} />
          <Route path='/reminder' element={<ReminderAppointment />} />
        
      </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
