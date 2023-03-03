import express from "express";
import 
    {
        appointment_post, 
        appointment_get, 
        appointment_delete, 
        appointment_getUser,
        appointment_updateUser,
        appointment_getCompleted,
        appointment_getDateTime,
        appointment_getCompletedHistory
    } 
from "../controller/admin.js";

const router = express.Router()


router.post("/appointment/post", appointment_post);
router.get("/appointment/get", appointment_get);
router.delete("/appointment/delete/:a_ID", appointment_delete);

router.get("/admin/appointment/get/:a_ID", appointment_getUser);
router.put("/admin/appointment/update/:a_ID", appointment_updateUser);

router.get("/appointment/completed/get", appointment_getCompleted);
router.get("/appointment/completed/get/:user_id", appointment_getCompletedHistory);
router.get("/appointment/date-time", appointment_getDateTime)

export default router