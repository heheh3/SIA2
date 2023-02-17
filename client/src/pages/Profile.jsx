// import { useContext, useState } from "react";
// import { useQuery } from "react-query";
// import { makeRequest } from "../../axios";
// import { useLocation } from "react-router-dom";
// import { AuthContext } from "context/authContext";

// const Profile = () => {

//   const { currentUser } = useContext(AuthContext);

//   const [selectedTab, setSelectedTab] = useState("profile-settings")

//   const userId = parseInt(useLocation().pathname.split("/")[2]);

//   const { error, data } = useQuery(["user"], () =>
//   makeRequest.get("/users/find/" + userId).then((res) => {
//     return res.data;
//   })
// );

// function ProfileSettings() {
//   return (
//     <div className="px-8 py-10">
//       <div className="grid grid-cols-2 gap-6">
//         <div className="grid">
//           <label className="font-medium mb-2">Patient ID</label>
//           <input
//             type="text"
//             placeholder="..."
//             className="placeholder:text-slate-300 font-medium border border-slate-200 rounded-md px-4 py-2 outline outline-2 outline-transparent focus:outline-blue-600 transition-all"
//           />
//         </div>
//         <div className="grid">
//           <label className="font-medium mb-2">Full name</label>
//           <span> {data.fullname}</span>
//         </div>
//         <div className="grid">
//           <label className="font-medium mb-2">Username</label>
//           <div className="grid grid-cols-[auto_1fr]">
//             <div className=" border-y border-l border-slate-200 bg-slate-200 h-full px-4 texat-slate-500 flex items-center rounded-l-md">
//               <svg width="1em" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fill-rule="evenodd"
//                   d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
//                   clip-rule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <input
//               type="username"
//               placeholder="@juandelacruz"
//               className="placeholder:text-slate-300 font-medium border border-slate-200 rounded-r-md px-4 py-2 outline outline-2 outline-transparent focus:outline-blue-600 transition-all"
//             />
//           </div>
//         </div>
//         <div className="grid">
//           <label className="font-medium mb-2">Email</label>
//           <input
//             type="email"
//             placeholder="juan@example.com"
//             className="font-medium placeholder:text-slate-300 border border-slate-200 rounded-md px-4 py-2 outline outline-2 outline-transparent focus:outline-blue-600 transition-all"
//           />
//         </div>
//         <div className="grid">
//           <label className="font-medium mb-2">Phone</label>
//           <input
//             type="text"
//             placeholder="0912 345 6789"
//             className="placeholder:text-slate-300 font-medium border border-slate-200 rounded-md px-4 py-2 outline outline-2 outline-transparent focus:outline-blue-600 transition-all"
//           />
//         </div>
//         <div className="grid">
//           <label className="font-medium mb-2">Birth Date</label>
//           <input
//             type="date"
//             className="font-medium border border-slate-200 rounded-md px-4 py-2 outline outline-2 outline-transparent focus:outline-blue-600 transition-all"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// function MedicalHistory() {
//   const [isEnabled, setIsEnabled] = useState({
//     heartAilmentDisease: false,
//     allergies: false,
//     hospitalAdmission: false,
//     operation: false,
//     selfMedication: false,
//     tumorGrowth: false,
//     diabetes: false,
//     hypertension: false,
//     headache: false,
//     cold: false,
//     sinusitis: false,
//     stomachDisease: false,
//     liverDisease: false,
//     kidneyDisease: false,
//     bleedingGums: false,
//     bloodDisease: false,
//     pregnant: false,
//   })

//   return (
//     <div className="px-8 py-10">
//       <div className="grid grid-cols-2 gap-6 mb-3">
//         <div className="grid">
//           <label className="font-medium mb-2">Heart Ailment/Disease</label>
//           <div className="grid grid-cols-[3rem_1fr]">
//             <div className="flex justify-center items-center">
//               <input
//                 type="checkbox"
//                 onChange={(e) => {
//                   setIsEnabled((currState) => {
//                     return {
//                       ...currState,
//                       heartAilmentDisease: e.target.checked,
//                     }
//                   })
//                 }}
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Blood pressure"
//               className="disabled:bg-slate-50 placeholder:text-slate-300 font-medium border border-slate-200 rounded-md px-4 py-2 outline outline-2 outline-transparent focus:outline-blue-600 transition-all"
//               disabled={!isEnabled.heartAilmentDisease}
//             />
//           </div>
//         </div>
//         <div className="grid">
//           <label className="font-medium mb-2">Allergies</label>
//           <div className="grid grid-cols-[3rem_1fr]">
//             <div className="flex justify-center items-center">
//               <input
//                 type="checkbox"
//                 onChange={(e) => {
//                   setIsEnabled((currState) => {
//                     return {
//                       ...currState,
//                       allergies: e.target.checked,
//                     }
//                   })
//                 }}
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Food / medicine"
//               className="disabled:bg-slate-50 placeholder:text-slate-300 font-medium border border-slate-200 rounded-md px-4 py-2 outline outline-2 outline-transparent focus:outline-blue-600 transition-all"
//               disabled={!isEnabled.allergies}
//             />
//           </div>
//         </div>
//         <div className="grid">
//           <label className="font-medium mb-2">Hospital Admission</label>
//           <div className="grid grid-cols-[3rem_1fr]">
//             <div className="flex justify-center items-center">
//               <input
//                 type="checkbox"
//                 onChange={(e) => {
//                   setIsEnabled((currState) => {
//                     return {
//                       ...currState,
//                       hospitalAdmission: e.target.checked,
//                     }
//                   })
//                 }}
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Reason"
//               className="disabled:bg-slate-50 placeholder:text-slate-300 font-medium border border-slate-200 rounded-md px-4 py-2 outline outline-2 outline-transparent focus:outline-blue-600 transition-all"
//               disabled={!isEnabled.hospitalAdmission}
//             />
//           </div>
//         </div>
//         <div className="grid">
//           <label className="font-medium mb-2">Operation</label>
//           <div className="grid grid-cols-[3rem_1fr]">
//             <div className="flex justify-center items-center">
//               <input
//                 type="checkbox"
//                 onChange={(e) => {
//                   setIsEnabled((currState) => {
//                     return {
//                       ...currState,
//                       operation: e.target.checked,
//                     }
//                   })
//                 }}
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="..."
//               className="disabled:bg-slate-50 placeholder:text-slate-300 font-medium border border-slate-200 rounded-md px-4 py-2 outline outline-2 outline-transparent focus:outline-blue-600 transition-all"
//               disabled={!isEnabled.operation}
//             />
//           </div>
//         </div>
//         <div className="grid">
//           <label className="font-medium mb-2">Self-medication</label>
//           <div className="grid grid-cols-[3rem_1fr]">
//             <div className="flex justify-center items-center">
//               <input
//                 type="checkbox"
//                 onChange={(e) => {
//                   setIsEnabled((currState) => {
//                     return {
//                       ...currState,
//                       selfMedication: e.target.checked,
//                     }
//                   })
//                 }}
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="..."
//               className="disabled:bg-slate-50 placeholder:text-slate-300 font-medium border border-slate-200 rounded-md px-4 py-2 outline outline-2 outline-transparent focus:outline-blue-600 transition-all"
//               disabled={!isEnabled.selfMedication}
//             />
//           </div>
//         </div>
//         <div className="grid">
//           <label className="font-medium mb-2">Tumor/Growth</label>
//           <div className="grid grid-cols-[3rem_1fr]">
//             <div className="flex justify-center items-center">
//               <input
//                 type="checkbox"
//                 onChange={(e) => {
//                   setIsEnabled((currState) => {
//                     return {
//                       ...currState,
//                       tumorGrowth: e.target.checked,
//                     }
//                   })
//                 }}
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="..."
//               className="disabled:bg-slate-50 placeholder:text-slate-300 font-medium border border-slate-200 rounded-md px-4 py-2 outline outline-2 outline-transparent focus:outline-blue-600 transition-all"
//               disabled={!isEnabled.tumorGrowth}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="grid grid-cols-4">
//         <div className="grid grid-cols-[3rem_1fr] gap-4">
//           <div className="flex justify-center items-center">
//             <input
//               type="checkbox"
//               onChange={(e) => {
//                 setIsEnabled((currState) => {
//                   return {
//                     ...currState,
//                     diabetes: e.target.checked,
//                   }
//                 })
//               }}
//             />
//           </div>
//           <span className="py-2">Diabetes</span>
//         </div>
//         <div className="grid grid-cols-[3rem_1fr] gap-4">
//           <div className="flex justify-center items-center">
//             <input
//               type="checkbox"
//               onChange={(e) => {
//                 setIsEnabled((currState) => {
//                   return {
//                     ...currState,
//                     hypertension: e.target.checked,
//                   }
//                 })
//               }}
//             />
//           </div>
//           <span className="py-2">Hypertension</span>
//         </div>
//         <div className="grid grid-cols-[3rem_1fr] gap-4">
//           <div className="flex justify-center items-center">
//             <input
//               type="checkbox"
//               onChange={(e) => {
//                 setIsEnabled((currState) => {
//                   return {
//                     ...currState,
//                     headache: e.target.checked,
//                   }
//                 })
//               }}
//             />
//           </div>
//           <span className="py-2">Headache</span>
//         </div>
//         <div className="grid grid-cols-[3rem_1fr] gap-4">
//           <div className="flex justify-center items-center">
//             <input
//               type="checkbox"
//               onChange={(e) => {
//                 setIsEnabled((currState) => {
//                   return {
//                     ...currState,
//                     cold: e.target.checked,
//                   }
//                 })
//               }}
//             />
//           </div>
//           <span className="py-2">Cold</span>
//         </div>
//         <div className="grid grid-cols-[3rem_1fr] gap-4">
//           <div className="flex justify-center items-center">
//             <input
//               type="checkbox"
//               onChange={(e) => {
//                 setIsEnabled((currState) => {
//                   return {
//                     ...currState,
//                     sinusitis: e.target.checked,
//                   }
//                 })
//               }}
//             />
//           </div>
//           <span className="py-2">Sinusitis</span>
//         </div>
//         <div className="grid grid-cols-[3rem_1fr] gap-4">
//           <div className="flex justify-center items-center">
//             <input
//               type="checkbox"
//               onChange={(e) => {
//                 setIsEnabled((currState) => {
//                   return {
//                     ...currState,
//                     stomachDisease: e.target.checked,
//                   }
//                 })
//               }}
//             />
//           </div>
//           <span className="py-2">Stomach Disease</span>
//         </div>
//         <div className="grid grid-cols-[3rem_1fr] gap-4">
//           <div className="flex justify-center items-center">
//             <input
//               type="checkbox"
//               onChange={(e) => {
//                 setIsEnabled((currState) => {
//                   return {
//                     ...currState,
//                     liverDisease: e.target.checked,
//                   }
//                 })
//               }}
//             />
//           </div>
//           <span className="py-2">Liver Disease</span>
//         </div>
//         <div className="grid grid-cols-[3rem_1fr] gap-4">
//           <div className="flex justify-center items-center">
//             <input
//               type="checkbox"
//               onChange={(e) => {
//                 setIsEnabled((currState) => {
//                   return {
//                     ...currState,
//                     kidneyDisease: e.target.checked,
//                   }
//                 })
//               }}
//             />
//           </div>
//           <span className="py-2">Kidney Disease</span>
//         </div>
//         <div className="grid grid-cols-[3rem_1fr] gap-4">
//           <div className="flex justify-center items-center">
//             <input
//               type="checkbox"
//               onChange={(e) => {
//                 setIsEnabled((currState) => {
//                   return {
//                     ...currState,
//                     bleedingGums: e.target.checked,
//                   }
//                 })
//               }}
//             />
//           </div>
//           <span className="py-2">Bleeding Gums</span>
//         </div>
//         <div className="grid grid-cols-[3rem_1fr] gap-4">
//           <div className="flex justify-center items-center">
//             <input
//               type="checkbox"
//               onChange={(e) => {
//                 setIsEnabled((currState) => {
//                   return {
//                     ...currState,
//                     bloodDisease: e.target.checked,
//                   }
//                 })
//               }}
//             />
//           </div>
//           <span className="py-2">Blood Disease</span>
//         </div>
//         <div className="col-span-2 grid grid-cols-[3rem_1fr] gap-4">
//           <div className="flex justify-center items-center">
//             <input
//               type="checkbox"
//               onChange={(e) => {
//                 setIsEnabled((currState) => {
//                   return {
//                     ...currState,
//                     pregnant: e.target.checked,
//                   }
//                 })
//               }}
//             />
//           </div>
//           <div className="flex gap-4 items-center">
//             <span className="py-2">Pregnant</span>
//             <input
//               type="text"
//               placeholder="No. of months"
//               className="disabled:bg-slate-50 placeholder:text-slate-300 w-full font-medium border border-slate-200 rounded-md px-4 py-2 outline outline-2 outline-transparent focus:outline-blue-600 transition-all"
//               disabled={!isEnabled.pregnant}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function AppointmentHistory() {
//   return <div className="px-8 py-10"></div>
// }



//   return (
//     <div className="w-full py-24 text-slate-800">
//       <div className="font-[Inter] max-w-4xl mx-auto border border-slate-200 rounded-md grid grid-rows-[auto_1fr_auto] min-h-[34rem]">
//         {/* Header */}
//         <div className="px-8 pt-8 border-b-2 border-slate-200 gap-6 flex">
//           <button
//             type="button"
//             className={`block pb-4 border-b w-fit font-semibold ${
//               selectedTab === "profile-settings"
//                 ? "border-indigo-600"
//                 : "border-transparent"
//             }`}
//             onClick={() => {
//               setSelectedTab("profile-settings")
//             }}
//           >
//             Profile Settings
//           </button>
//           <button
//             type="button"
//             className={`block pb-4 border-b w-fit font-semibold ${
//               selectedTab === "medical-history"
//                 ? "border-indigo-600"
//                 : "border-transparent"
//             }`}
//             onClick={() => {
//               setSelectedTab("medical-history")
//             }}
//           >
//             Medical History
//           </button>
//           <button
//             type="button"
//             className={`block pb-4 border-b w-fit font-semibold ${
//               selectedTab === "appointment-history"
//                 ? " border-indigo-600"
//                 : "border-transparent"
//             }`}
//             onClick={() => {
//               setSelectedTab("appointment-history")
//             }}
//           >
//             Appointment History
//           </button>
//         </div>
//         {/* Body */}
//         {selectedTab === "profile-settings" && <ProfileSettings />}
//         {selectedTab === "medical-history" && <MedicalHistory />}
//         {selectedTab === "appointment-history" && <AppointmentHistory />}
//         {/* Action */}
//         <div className="px-8 py-5 border-t border-slate-200">
//           <button
//             type="button"
//             className="font-semibold bg-indigo-500 hover:bg-indigo-400 transition duration-200 text-white px-6 h-12 rounded-md"
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile
