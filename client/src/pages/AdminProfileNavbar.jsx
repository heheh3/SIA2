// import React, {useContext} from 'react'
// import "../css/ProfileNavbar.css";
// import {NavLink} from "react-router-dom";
// import { AuthContext } from "../context/authContext";



// const ProfileNavbar = () => {

//   const { currentUser } = useContext(AuthContext);

//   return (
//     <div>
//         <nav className='ProfileNavbar__header'>
//             <ul>
//                 <li className='ProfileNavbar__list'><NavLink className='PNList' to={`/profile/profile-settings/${currentUser.user_id}`}>PROFILE SETTINGS</NavLink></li>
//                 <li className='ProfileNavbar__list'><NavLink className='PNList' to={`/profile/medical-history/${currentUser.user_id}`}>MEDICAL HISTORY</NavLink></li>
//                 <li className='ProfileNavbar__list'><NavLink className='PNList' to={`/profile/appointment-history/${currentUser.user_id}`}>APPOINTMENT HISTORY</NavLink></li>
//             </ul>
//         </nav> 
//     </div>
//   )
// }

// export default ProfileNavbar