import express from "express";
import { payment_post, payment_get, payment_getOne, payment_getPartial} from "../controller/payment.js";

const router = express.Router()
router.get("/admin/payment/get", payment_get)
router.get("/admin/payment/getOne/:a_ID", payment_getOne)
router.get("/admin/payment/getOne/:a_ID/:invoice_ID", payment_getPartial);
router.post("/admin/completed/payment/:a_ID", payment_post)



export default router