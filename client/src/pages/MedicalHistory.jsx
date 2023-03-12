import React, { useContext, useRef, useState } from 'react'
import ProfileNavbar from './ProfileNavbar'
import PatientNavbar from './PatientNavbar'
import "../css/Profile.css";
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';

const MedicalHistory = () => {

    const { currentUser } = useContext(AuthContext);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:5000/medicalhistory/:user_id`, {
            userId: currentUser.id,
            heartAilment: heartAilmentChecked ? heartAilment : 'none',
            allergies: allergiesChecked ? allergies : 'none',
            hospitalAdmission: hospitalAdmissionChecked ? hospitalAdmission: 'none',
            operation: operationChecked ? operation: 'none',
            selfMedication: selfMedicationChecked ? selfMedication: 'none',
            tumor: tumorChecked ? tumor: 'none',
            otherIllnesses: otherIllnessesChecked ? otherIllnesses: 'none',
            pregnant: pregnantChecked ? pregnant: 'none'
          });
          console.log(response.data);
          // Reset state
          setHeartAilment('');
          setAllergies('');
          setHospitalAdmission('');
          setOperation('');
          setSelfMedication('');
          setTumor('');
          setOtherIllnesses('');
          setPregnant('');
          setHeartAilmentChecked(false);
          setAllergiesChecked(false);
          setHospitalAdmissionChecked(false);
          setOperationChecked(false);
          setSelfMedicationChecked(false);
          setTumorChecked(false);
          setOtherIllnessesChecked(false);
          setPregnantChecked(false);

          toast.success("Medical History Updated Successfully");
        } catch (error) {
          console.error(error);
        }
      };
  
    return (
      <div>
          <header>
              <PatientNavbar />
          </header>
          <body>
              <main>
                  <div className='profileNavbar__container'>
                      <ProfileNavbar />
                      <div className='profile__container'>
                        <form onSubmit={handleSubmit} className='medicalSettings__form'>
                            <div className='medicalSettings__row'>
                                <div className='medicalSettings__row--col'>
                                    <label className='label__input' htmlFor='heart-ailment'>Heart Ailment/Disease</label>
                                    <div className="input-mcontainer">
                                        <input 
                                            type='checkbox'
                                            checked={heartAilmentChecked}
                                            onChange={(event) => setHeartAilmentChecked(event.target.checked)}
                                        />
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
                                            type='checkbox'
                                            checked={allergiesChecked}
                                            onChange={(event) => setAllergiesChecked(event.target.checked)}
                                        />
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
                                            type='checkbox'
                                            checked={hospitalAdmissionChecked}
                                            onChange={(event) => setHospitalAdmissionChecked(event.target.checked)}
                                        />
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
                                            type='checkbox'
                                            checked={operationChecked}
                                            onChange={(event) => setOperationChecked(event.target.checked)}
                                        />
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
                                            type='checkbox'
                                            checked={selfMedicationChecked}
                                            onChange={(event) => setSelfMedicationChecked(event.target.checked)}
                                        />
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
                                            type='checkbox'
                                            checked={tumorChecked}
                                            onChange={(event) => setTumorChecked(event.target.checked)}
                                        />
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
                                            type='checkbox'
                                            checked={otherIllnessesChecked}
                                            onChange={(event) => setOtherIllnessesChecked(event.target.checked)}
                                        />
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
                                            type='checkbox'
                                            checked={pregnantChecked}
                                            onChange={(event) => setPregnantChecked(event.target.checked)}
                                        />
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
    );
  };
  
  export default MedicalHistory;