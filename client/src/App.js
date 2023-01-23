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




function App() {
  return (
    <BrowserRouter>
    <div className='App'>
    <ToastContainer position='top-center' />
      <Routes>
          <Route path="/" element={<AdminNavbar />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/addContact" element={<AddEdit />} />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <Route path="/update/:id" element={<Appointment />} />
          <Route path="/addContact" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/addContact" element={<AddEdit />} />
=======
>>>>>>> parent of 9a6cdf1 (Part 2)
=======
>>>>>>> parent of 9a6cdf1 (Part 2)
=======
>>>>>>> parent of 9a6cdf1 (Part 2)
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/admin/appointment' element={<PendingAppointment />} />
         
        
      </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
