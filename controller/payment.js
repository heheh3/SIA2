import { db } from "../connection.js";


export const payment_get = (req, res) =>{

    const sqlGet = 'SELECT * FROM payment_db';

    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}

export const payment_getOne = (req, res) =>{
    const {a_ID} = req.params;
    const sqlGet = 'SELECT * FROM payment_db WHERE service_ID = ?';

    db.query(sqlGet, a_ID, (error, result)=>{
        res.send(result);
    });
}



export const payment_post = (req, res) =>{
    const { a_ID } = req.params;
    const service_ID = a_ID;
    const invoice_ID = req.body.invoice_ID;
    const p_date = req.body.p_date;
    const p_totalProd = req.body.p_totalProd;
    const p_addFee = req.body.p_addFee;
    const p_totalPayment = req.body.p_totalPayment;
    const p_paidAmount = req.body.p_paidAmount;
    const p_paymentType = req.body.p_paymentType;
    const p_change = req.body.p_change;
    const p_balance = req.body.p_balance;

    const sqlInsert = "INSERT INTO payment_db (service_ID, invoice_ID, p_date, p_totalProd, p_addFee, p_totalPayment, p_paidAmount, p_paymentType,  p_change, p_balance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [service_ID, invoice_ID, p_date, p_totalProd, p_addFee, p_totalPayment, p_paidAmount, p_paymentType, p_change, p_balance], (err, result) =>{
        if (err){
            console.log(err);
        }else {
            res.send("Values Added")
        }
    });


}