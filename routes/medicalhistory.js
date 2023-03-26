import express from "express";
import { medicalhistory_delete, medicalhistory_get, medicalhistory_getUser, medicalhistory_updateUser } from "../controller/medicalhistory.js";

const router = express.Router()

// Get all medical history records
router.get('/medicalhistory/get', medicalhistory_get);

// Get a specific user's medical history record
router.get('/medicalhistory/get/:user_id', medicalhistory_getUser);

// Update a user's medical history record
router.put('/medicalhistory/update/:user_id', medicalhistory_updateUser);

// Delete a user's medical history record
router.delete('/medicalhistory/delete/:user_id', medicalhistory_delete);




export default router 