import { db } from "../connection.js";

export const medicalhistory_get = (req, res) =>{
    const sqlGet = "SELECT * FROM medicalhistory_db"

    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}

export const medicalhistory_delete = (req, res) =>{
    const {user_id} = req.params;
   
    const sqlRemove = "DELETE FROM medicalhistory_db where user_id = ?";
    db.query(sqlRemove, user_id, (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    });

}

export const medicalhistory_getUser = (req, res) =>{
    const { user_id } = req.params;
    const sqlGet = "SELECT * FROM medicalhistory_db where user_id = ?";
    db.query(sqlGet, user_id ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });
}

export const medicalhistory_updateUser = (req, res) =>{
    const user_id = req.params.user_id;
    const medical_history = req.body;

    db.query('SELECT * FROM users WHERE id = ?', [user_id], (err, results) => {
        if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error retrieving user ' + user_id);
        return;
        }

        if (results.length === 0) {
        res.status(404).send('User ' + user_id + ' not found');
        return;
        }

        db.query('UPDATE medical_history SET heart_ailment = ?, heart_ailment_checked = ?, allergies = ?, allergies_checked = ?, hospital_admission = ?, hospital_admission_checked = ?, operation = ?, operation_checked = ?, self_medication = ?, self_medication_checked = ?, tumor = ?, tumor_checked = ?, other_illnesses = ?, other_illnesses_checked = ?, pregnant = ?, pregnant_checked = ? WHERE user_id = ?', 
                [medical_history.heartAilment, medical_history.heartAilmentChecked, medical_history.allergies, medical_history.allergiesChecked, medical_history.hospitalAdmission, medical_history.hospitalAdmissionChecked, medical_history.operation, medical_history.operationChecked, medical_history.selfMedication, medical_history.selfMedicationChecked, medical_history.tumor, medical_history.tumorChecked, medical_history.otherIllnesses, medical_history.otherIllnessesChecked, medical_history.pregnant, medical_history.pregnantChecked, user_id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error updating medical history for user ' + user_id);
            return;
        }
        res.send('Medical history updated for user ' + user_id);
        });
    });
}