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
        appointment_getPending,
        appointment_getCompletedHistory,
        appointment_getAppointmentCancel,
        appointment_getCompletedCancelled,
        appointment_addProcedures,
        appointment_getProcedures,
        appointment_getSum,
        procedure_delete,
        procedure_update,
        procedure_get,
        appointment_CancelledSum

    } 
from "../controller/admin.js";

const router = express.Router()


router.post("/appointment/post", appointment_post);
router.get("/appointment/get", appointment_get);
router.delete("/appointment/delete/:a_ID", appointment_delete);

router.get("/admin/appointment/get/:a_ID", appointment_getUser);
router.put("/admin/appointment/update/:a_ID", appointment_updateUser);
router.get("/admin/appointment/cancelled/get/:user_id", appointment_getAppointmentCancel);

router.get("/appointment/completed/get", appointment_getCompleted);
router.get("/admin/completedCancelled/get/:user_id/:a_ID", appointment_getCompletedCancelled);
router.get("/admin/completedCancelled/sum/:user_id/:a_ID", appointment_CancelledSum);

router.get("/appointment/pending/get/:user_id", appointment_getPending);
router.get("/appointment/completed/get/:user_id", appointment_getCompletedHistory);
router.get("/appointment/date-time", appointment_getDateTime)
router.post("/admin/appointment/procedure/post/:a_ID", appointment_addProcedures);
router.get("/admin/appointment/procedure/get/:a_ID", appointment_getProcedures);
router.get("/admin/appointment/procedure/sum/:a_ID/", appointment_getSum);
router.delete("/admin/appointment/procedure/delete/:procedNum", procedure_delete);
router.get("/admin/appointment/procedure/procedure/get/:procedNum", procedure_get);
router.put("/admin/appointment/procedure/update/:procedNum", procedure_update);




export default router