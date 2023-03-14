import express from "express";
import { inventory_delete, inventory_get, inventory_getInventory, inventory_post, inventory_updateInventory } from "../controller/inventory.js";


const router = express.Router()

router.get("/inventory/get", inventory_get);
router.post("/inventory/post", inventory_post);
router.delete("/inventory/delete/:inventoryID", inventory_delete);
router.get("/admin/inventory/get/:inventoryID", inventory_getInventory);
router.put("/admin/inventory/update/:inventoryID", inventory_updateInventory);


export default router