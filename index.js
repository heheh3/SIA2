import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
const app = express();
// const moment = require('moment');
import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"
import employeeRoutes from "./routes/employee.js"


//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/auth", authRoutes)
app.use("/", adminRoutes)
app.use("/", employeeRoutes)




app.listen(5000, () =>{
    console.log("Server is running on port 5000");
})

