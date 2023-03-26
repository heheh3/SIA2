import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminProfileNavbar from './AdminProfileNavbar'
import {Link} from 'react-router-dom'
import MedicalHistory from './MedicalHistory'

const AdminMedicalHistory = () => {
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
      )
}

export default AdminMedicalHistory