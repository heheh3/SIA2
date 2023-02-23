import express from "express";
import 
    {
        appointment_post, 
        appointment_get, 
        appointment_delete, 
        appointment_getUser,
        appointment_updateUser,
        appointment_getCompleted
    } 
from "../controller/admin.js";

const router = express.Router()


router.post("/appointment/post", appointment_post);
router.get("/appointment/get", appointment_get);
router.delete("/appointment/delete/:patientID", appointment_delete);

router.get("/admin/appointment/get/:patientID", appointment_getUser);
router.put("/admin/appointment/update/:patientID", appointment_updateUser);

router.get("/appointment/completed/get", appointment_getCompleted);

export default router