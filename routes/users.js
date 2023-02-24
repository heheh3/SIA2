import express from "express";
import {users_delete, users_get, users_getUser} from "../controller/users.js"

const router = express.Router()

router.get("/users/get", users_get);
router.get("/admin/patient/get/:user_id", users_getUser);
router.put("/admin/patient/update/:user_id", users_getUser);
router.delete("/users/delete/:user_id", users_delete);


export default router 