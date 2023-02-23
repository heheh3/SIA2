import mysql from "mysql2"

export const db = mysql.createPool({
    host: "localhost",
    user: "root",   
    password: "AdDU2202001318896",
    database: "crud_booking",
});
