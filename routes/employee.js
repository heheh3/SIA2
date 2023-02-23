import express from "express";
import 
    {
        employee_get,
        employee_post,
        employee_delete, 
        employee_getEmployee,
        employee_updateEmployee
     
    } 
from "../controller/employee.js";

const router = express.Router()

router.get("/employee/get", employee_get);
router.post("/employee/post", employee_post);
router.delete("/employee/delete/:employeeID", employee_delete);
router.get("/admin/employee/get/:employeeID", employee_getEmployee);
router.put("/admin/employee/update/:employeeID", employee_updateEmployee);


export default router