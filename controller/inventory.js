import {parseISO, format} from 'date-fns';
import { db } from "../connection.js";


//  INVENTORY BACKEND CRUD
export const inventory_get = (req, res) =>{
    const sqlGet = "SELECT * FROM inventory_db"
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}

    export const inventory_post = (req, res) =>{
        const i_item = req.body.i_item;
        const i_room = req.body.i_room;
        const i_model = req.body.i_model;
        const i_serial = req.body.i_serial;
        const i_place = req.body.i_place;
        const i_datepurchased = req.body.i_datepurchased;
        const i_quantity = req.body.i_quantity;
        const i_price= req.body.i_price;
        const i_totalprice= req.body.i_totalprice;

        const date = parseISO(i_datepurchased);
        const formattedDate = format(date, 'EEE, MMM dd, yyyy');

        const sqlInsert = "INSERT INTO inventory_db (i_item, i_room, i_model, i_serial, i_place, i_datepurchased, i_quantity, i_price, i_totalprice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sqlInsert, [i_item, i_room, i_model, i_serial, i_place, formattedDate, i_quantity, i_price, i_totalprice], (err, result) =>{
            if (err){
                console.log(err);
                res.status(500).send("Error adding inventory item");
            } else if (result.affectedRows === 0) {
                res.status(500).send("No rows were affected by the insert operation");
            } else {
                res.status(200).send("Inventory item added successfully");
            }
        });

    }

export const inventory_delete = (req, res) =>{
    const {inventoryID} = req.params;
    console.log(inventoryID)
   
    const sqlRemove = "DELETE FROM inventory_db where inventoryID = ?";
    db.query(sqlRemove, inventoryID, (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    });

}


export const inventory_getInventory = (req, res) =>{
    const { inventoryID } = req.params;
    const sqlGet = "SELECT * FROM inventory_db where inventoryID = ?";
    db.query(sqlGet, inventoryID ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    });
}


export const inventory_updateInventory = (req, res) =>{
    const {inventoryID} = req.params;

    const i_item = req.body.i_item;
    const i_room = req.body.i_room;
    const i_model = req.body.i_model;
    const i_serial = req.body.i_serial;
    const i_place = req.body.i_place;
    const i_datepurchased = req.body.i_datepurchased;
    const i_quantity = req.body.i_quantity;
    const i_price= req.body.i_price;
    const i_totalprice= req.body.i_totalprice;

    const date = new Date(i_datepurchased);
    const formattedDate = format(date, 'EEE, MMM dd, yyyy');

   
    const sqlUpdate = "UPDATE inventory_db SET i_item = ?, i_room = ?, i_model = ?, i_serial = ?, i_place = ?, i_datepurchased = ?, i_quantity = ?, i_price = ?, i_totalprice = ? WHERE inventoryID = ?";
    db.query(sqlUpdate, [i_item, i_room, i_model, i_serial, i_place, formattedDate, i_quantity, i_price, i_totalprice, inventoryID] ,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);

    });


}