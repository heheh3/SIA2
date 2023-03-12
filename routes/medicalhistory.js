import express from "express";
import { medicalhistory_delete, medicalhistory_get, medicalhistory_getUser, medicalhistory_updateUser } from "../controller/medicalhistory.js";

const router = express.Router()

// Get all medical history records
router.get('/medicalhistory', medicalhistory_get);

// Get a specific user's medical history record
router.get('/medicalhistory/:user_id', medicalhistory_getUser);

// Update a user's medical history record
router.put('/medicalhistory/:user_id', medicalhistory_updateUser);

// Delete a user's medical history record
router.delete('/medicalhistory/:user_id', medicalhistory_delete);




export default router 