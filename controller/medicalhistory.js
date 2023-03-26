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

export const medicalhistory_updateUser = (req, res) => {
    const user_id = req.params.user_id;
    const medicalhistory_db = req.body;

    // Check if the user exists
    db.query('SELECT * FROM users_db WHERE user_id = ?', [user_id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error retrieving user ' + user_id);
            return;
        }

        if (results.length === 0) {
            res.status(404).send('User ' + user_id + ' not found');
            return;
        }

        // Check if user has existing medical history in medicalhistory_db
    db.query('SELECT * FROM medicalhistory_db WHERE user_id = ?', [user_id], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Error retrieving medical history for user ' + user_id);
          return;
        }
  
        if (results.length === 0) {
          // User has no existing medical history, so insert new record
          db.query('INSERT INTO medicalhistory_db (user_id, heartAilment, heartAilmentChecked, allergies, allergiesChecked, hospitalAdmission, hospitalAdmissionChecked, operation, operationChecked, selfMedication, selfMedicationChecked, tumor, tumorChecked, otherIllnesses, otherIllnessesChecked, pregnant, pregnantChecked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, medicalhistory_db.heartAilment, medicalhistory_db.heartAilmentChecked, medicalhistory_db.allergies, medicalhistory_db.allergiesChecked, medicalhistory_db.hospitalAdmission, medicalhistory_db.hospitalAdmissionChecked, medicalhistory_db.operation, medicalhistory_db.operationChecked, medicalhistory_db.selfMedication, medicalhistory_db.selfMedicationChecked, medicalhistory_db.tumor, medicalhistory_db.tumorChecked, medicalhistory_db.otherIllnesses, medicalhistory_db.otherIllnessesChecked, medicalhistory_db.pregnant, medicalhistory_db.pregnantChecked],
            (err, results) => {
              if (err) {
                console.error('Error executing query:', err);   
                res.status(500).send('Error inserting medical history for user ' + user_id);
                return;
              }
              res.send('Medical history inserted for user ' + user_id);
            });
        } else {
            // User has existing medical history, so update record
            db.query('UPDATE medicalhistory_db SET heartAilment = ?, heartAilmentChecked = ?, allergies = ?, allergiesChecked = ?, hospitalAdmission = ?, hospitalAdmissionChecked = ?, operation = ?, operationChecked = ?, selfMedication = ?, selfMedicationChecked = ?, tumor = ?, tumorChecked = ?, otherIllnesses = ?, otherIllnessesChecked = ?, pregnant = ?, pregnantChecked = ? WHERE user_id = ?',
              [medicalhistory_db.heartAilment, medicalhistory_db.heartAilmentChecked, medicalhistory_db.allergies, medicalhistory_db.allergiesChecked, medicalhistory_db.hospitalAdmission, medicalhistory_db.hospitalAdmissionChecked, medicalhistory_db.operation, medicalhistory_db.operationChecked, medicalhistory_db.selfMedication, medicalhistory_db.selfMedicationChecked, medicalhistory_db.tumor, medicalhistory_db.tumorChecked, medicalhistory_db.otherIllnesses, medicalhistory_db.otherIllnessesChecked, medicalhistory_db.pregnant, medicalhistory_db.pregnantChecked, user_id],
              (err, results) => {
                if (err) {
                  console.error('Error executing query:', err);
                  res.status(500).send('Error updating medical history for user ' + user_id);
                  return;
                }
                res.send('Medical history updated for user ' + user_id);
              }
            );
          }
        })}
    )};