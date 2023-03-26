import React, { useContext, useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import AdminProfileNavbar from './AdminProfileNavbar'
import "../css/Profile.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminMedicalHistory = () => {

    const [heartAilment, setHeartAilment] = useState('');
    const [heartAilmentChecked, setHeartAilmentChecked] = useState(false);
    const [allergies, setAllergies] = useState('');
    const [allergiesChecked, setAllergiesChecked] = useState(false);
    const [hospitalAdmission, setHospitalAdmission] = useState('');
    const [hospitalAdmissionChecked, setHospitalAdmissionChecked] = useState(false);
    const [operation, setOperation] = useState('');
    const [operationChecked, setOperationChecked] = useState(false);
    const [selfMedication, setSelfMedication] = useState('');
    const [selfMedicationChecked, setSelfMedicationChecked] = useState(false);
    const [tumor, setTumor] = useState('');
    const [tumorChecked, setTumorChecked] = useState(false);    
    const [otherIllnesses, setOtherIllnesses] = useState('');
    const [otherIllnessesChecked, setOtherIllnessesChecked] = useState(false);
    const [pregnant, setPregnant] = useState('');
    const [pregnantChecked, setPregnantChecked] = useState(false);
    const [data, setData] = useState([]);
    const {id} = useParams();
    console.log(id)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newData = {
            user_id: id,
            heartAilment: heartAilment || 'none',
            heartAilmentChecked: heartAilmentChecked ? true : false,
            allergies: allergies|| 'none',
            allergiesChecked: allergiesChecked ? true : false,
            hospitalAdmission: hospitalAdmission || 'none',
            hospitalAdmissionChecked: hospitalAdmissionChecked ? true : false,
            operation: operation || 'none',
            operationChecked: operationChecked ? true : false,
            selfMedication: selfMedication || 'none',
            selfMedicationChecked: selfMedicationChecked ? true : false,
            tumor: tumor || 'none',
            tumorChecked: tumorChecked ? true : false,
            otherIllnesses: otherIllnesses || 'none',
            otherIllnessesChecked: otherIllnessesChecked ? true : false,
            pregnant: pregnant || 'none',
            pregnantChecked: pregnantChecked ? true : false
        };

        try {
          const response = await axios.put(`http://localhost:5000/medicalhistory/update/${id}`, newData); 
          console.log(response.data);
          toast.success("Medical History Updated Successfully");

          localStorage.setItem('medicalHistoryData', JSON.stringify(newData));

          setData([
            ...data,
            { user_id: data.length + 1, heartAilment, heartAilmentChecked, allergies, allergiesChecked, hospitalAdmission, hospitalAdmissionChecked, operation, operationChecked, selfMedication, selfMedicationChecked, tumor, tumorChecked, otherIllnesses, otherIllnessesChecked, pregnant, pregnantChecked  },
          ]);
          setHeartAilment('');
          setHeartAilmentChecked(false);
          setAllergies('');
          setAllergiesChecked(false);
          setHospitalAdmission('');
          setHospitalAdmissionChecked(false);
          setOperation('');
          setOperationChecked(false);
          setSelfMedication('');
          setSelfMedicationChecked(false);
          setTumor('');
          setTumorChecked(false);
          setOtherIllnesses('');
          setOtherIllnessesChecked(false);
          setPregnant('');
          setPregnantChecked(false);
        } catch (error) {
          console.error(error);
        }
      };

    //   useEffect(() => {
    //     const storedData = localStorage.getItem('medicalHistoryData');
    //     if (storedData) {
    //       const parsedData = JSON.parse(storedData);
    //       setHeartAilment(parsedData.heartAilment);
    //       setHeartAilmentChecked(parsedData.heartAilmentChecked);
    //       setAllergies(parsedData.allergies);
    //       setAllergiesChecked(parsedData.allergiesChecked);
    //       setHospitalAdmission(parsedData.hospitalAdmission);
    //       setHospitalAdmissionChecked(parsedData.hospitalAdmissionChecked);
    //       setOperation(parsedData.operation);
    //       setOperationChecked(parsedData.operationChecked);
    //       setSelfMedication(parsedData.selfMedication);
    //       setSelfMedicationChecked(parsedData.selfMedicationChecked);
    //       setTumor(parsedData.tumor);
    //       setTumorChecked(parsedData.tumorChecked);
    //       setOtherIllnesses(parsedData.otherIllnesses);
    //       setOtherIllnessesChecked(parsedData.otherIllnessesChecked);
    //       setPregnant(parsedData.pregnant);
    //       setPregnantChecked(parsedData.pregnantChecked);
    //     }
    //   }, []);

      
        const loadData = async () =>{
            const response = await axios.get(`http://localhost:5000/medicalhistory/get/${id}`);
            setData(response.data);  
        }
        useEffect(()=>{
            loadData();
        }, [id])

        console.log(data)

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
                        <form onSubmit={handleSubmit} className='medicalSettings__form'>
                            <div className='medicalSettings__row'>
                                <div className='medicalSettings__row--col'>
                                    <label className='label__input' htmlFor='heart-ailment'>Heart Ailment/Disease</label>
                                    <div className="input-mcontainer">
                                        <input 
                                            type='text' 
                                            name='heart-ailment' 
                                            id='heart-ailment'
                                            className='mpatient__input' 
                                            placeholder='Blood Pressure, etc...' 
                                            onChange={(event) => setHeartAilment(event.target.value)}
                                            value={heartAilmentChecked ? heartAilment : ''}
                                            disabled={!heartAilmentChecked}
                                        />
                                    </div>
                                </div>
                                <div className='medicalSettings__row--col'>
                                    <label className='label__input' htmlFor='allergies'>Allergies</label>
                                    <div className="input-mcontainer">
                                        <input 
                                            type='text' 
                                            name='allergies' 
                                            id='allergies'
                                            className='mpatient__input' 
                                            onChange= {(event) => setAllergies(event.target.value)}
                                            placeholder='Peanuts, Shrimp, etc..' 
                                            value={allergiesChecked ? allergies : ''}
                                            disabled={!allergiesChecked}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='medicalSettings__row'>
                                <div className='medicalSettings__row--col'>
                                    <label className='label__input' htmlFor='hospital-admission'>Hospital Admission</label>
                                    <div className="input-mcontainer">
                                        <input 
                                            type='text' 
                                            name='hospital-admission' 
                                            id='hospital-admission'
                                            className='mpatient__input' 
                                            placeholder='Reason' 
                                            onChange={(event) => setHospitalAdmission(event.target.value)}
                                            value={hospitalAdmissionChecked ? hospitalAdmission : ''}
                                            disabled={!hospitalAdmissionChecked}
                                        />
                                    </div>

                                </div>
                                <div className='medicalSettings__row--col'>
                                    <label className='label__input' htmlFor='operation'>Operation</label>
                                    <div className="input-mcontainer">
                                        <input 
                                            type='text' 
                                            name='operation' 
                                            id='operation'
                                            className='mpatient__input' 
                                            onChange= {(event) => setOperation(event.target.value)}
                                            placeholder='' 
                                            value={operationChecked ? operation : ''}
                                            disabled={!operationChecked}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='medicalSettings__row'>
                                <div className='medicalSettings__row--col'>
                                    <label className='label__input' htmlFor='self-medication'>Self - Medication</label>
                                    <div className="input-mcontainer">
                                        <input 
                                            type='text' 
                                            name='self-medication' 
                                            id='self-medication'
                                            className='mpatient__input' 
                                            placeholder='' 
                                            onChange={(event) => setSelfMedication(event.target.value)}
                                            value={selfMedicationChecked ? selfMedication : ''}
                                            disabled={!selfMedicationChecked}
                                        />
                                    </div>
                                </div>
                                <div className='medicalSettings__row--col'>
                                    <label className='label__input' htmlFor='tumor'>Tumor/Growth</label>
                                    <div className="input-mcontainer">
                                        <input 
                                            type='text' 
                                            name='tumor' 
                                            id='tumor'
                                            className='mpatient__input' 
                                            onChange= {(event) => setTumor(event.target.value)}
                                            placeholder='' 
                                            value={tumorChecked ? tumor : ''}
                                            disabled={!tumorChecked}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='medicalSettings__row'>
                                <div className='medicalSettings__row--col'>
                                    <label className='label__input' htmlFor='hospital-admission'>Other Illnesses:</label>
                                    <div className="input-mcontainer">
                                        <input 
                                            type='text' 
                                            name='other_illnesses' 
                                            id='other_illnesses'
                                            className='mpatient__input' 
                                            placeholder='Diabetes, Sinusitis, Bleeding gums, etc...' 
                                            onChange={(event) => setOtherIllnesses(event.target.value)}
                                            value={otherIllnessesChecked ? otherIllnesses : ''}
                                            disabled={!otherIllnessesChecked}
                                        />
                                    </div>
                                </div>
                                <div className='medicalSettings__row--col'>
                                    <label className='label__input' htmlFor='tumor'>Pregnant</label>
                                    <div className="input-mcontainer">
                                        <input 
                                            type='text' 
                                            name='pregnant' 
                                            id='pregnant'
                                            className='mpatient__input' 
                                            onChange= {(event) => setPregnant(event.target.value)}
                                            placeholder='No. of Months' 
                                            value={pregnantChecked ? pregnant : ''}
                                            disabled={!pregnantChecked}
                                        />
                                    </div>
                                </div>
                            </div>
                    
                            <div className='medicalSettings__row'>
                                <div className='medicalSettings__row--col'>
                                        <input type="submit" className='profile-update' value="UPDATE" />
                                </div>
                            </div>


                        </form>
                      </div>
                    </div>
                </main>
            </body>
      </div>
      )
}

export default AdminMedicalHistory