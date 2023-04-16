import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Appointment from './pages/Appointment';
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
import ProfileSettings from './pages/ProfileSettings';
import MedicalHistory from './pages/MedicalHistory';
import AppointmentHistory from './pages/AppointmentHistory';
import UpdatePatient from './pages/UpdatePatient';
import Walkin from './pages/Walkin';
import Procedures from './pages/Procedures';
import AdminPatientHistory from './pages/AdminPatientHistory';
import AdminMedicalHistory from './pages/AdminMedicalHistory';
import CancelledUpdate from './pages/CancelledUpdate';
import CompletedUpdate from './pages/CompletedUpdate';
import CompletedDetails from './pages/CompletedDetails';
import PatientBook from './pages/PatientBook';
import ProceduresAdd from './pages/ProceduresAdd';
import ProceduresUpdate from './pages/ProceduresUpdate';
import Inventory from './pages/Inventory';
import InventoryAdd from './pages/InventoryAdd';
import Services from './pages/Services';
import Payment from './pages/Payment';
import PaymentPartly from './pages/PaymentPartly';
import ShowDetails from './pages/ShowDetails';
import ShowDetailsPatient from './pages/ShowDetailsPatient';
import Receipt from './pages/Receipt';
import Receipt2 from './pages/ReceiptPartial';
import AddWalkin from './pages/AddWalkin';



function App() {
  return (
    <BrowserRouter>
    <div className='App'>
    <ToastContainer position='top-center' />
      <Routes>
         
          <Route path="/admin" element={<AdminNavbar />} />
          <Route path="/admin/employee" element={<Employee />} />
          <Route path="/admin/appointment/update/:id" element={<UpdateAppointment />} />
          <Route path='/admin/services/procedures/:id' element={<Procedures />} />
          <Route path='/admin/appointment/cancelled/:id' element={<CancelledUpdate />} />
          <Route path='/admin/appointment' element={<PendingAppointment />} />
          <Route path='/admin/completed/update/:id' element={<CompletedUpdate />} />
          <Route path='/admin/completed/procedures/:id' element={<CompletedDetails />} />
          <Route path='/admin/completed/payment/:id' element={<Payment />} />
          <Route path='/admin/completed/ff-payment/:id' element={<PaymentPartly />} />
          <Route path='/admin/user/appointment-history/show-details/:id' element={<ShowDetails />} />

          <Route path='/admin/employee/add' element={<EmployeeAdd />} />
          <Route path='/admin/employee/update/:id' element={<EmployeeUpdate />} />

          <Route path='/admin/completed' element={<Completed />} />
          <Route path='/admin/user/update/:id' element={<UpdatePatient />} />
          <Route path='/admin/user/profile-settings/:id' element={<UpdatePatient />} />
          <Route path='/admin/user/medical-history/:id' element={<AdminMedicalHistory />} />
          <Route path='/admin/user/appointment-history/:id' element={<AdminPatientHistory />} />
          <Route path='/profile/appointment-history/show-details/:id' element={<ShowDetailsPatient />} />
          <Route path='/admin/completed/receipt/:id' element={<Receipt/>} />
          <Route path='/admin/completed/receipt2/:id' element={<Receipt2 />} />
          <Route path='/admin/user/book/:id' element={<PatientBook />} />
          <Route path='/admin/user/walkin/:id' element={<AddWalkin />} />
          
          <Route path='/admin/services/procedures/add/:id' element={<ProceduresAdd />} /> 
          <Route path='/admin/services/procedures/update/:id' element={<ProceduresUpdate />} /> 

          <Route path='/admin/user' element={<PatientTable />} />
          <Route path='/allergies' element={<Allergies />} /> 

          <Route path='/admin/inventory' element={<Inventory />} /> 
          <Route path='/admin/inventory/add' element={<InventoryAdd />} />


          <Route path='/admin/walk-in' element={<Walkin />} /> 
          <Route path='/admin/services' element={<Services />} /> 


          <Route path="/appointment" element={<Appointment />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          
          <Route path='/profile/profile-settings/:id' element={<ProfileSettings />} />
          <Route path='/profile/medical-history/:id' element={<MedicalHistory />} />
          <Route path='/profile/appointment-history/:id' element={<AppointmentHistory />} />

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
