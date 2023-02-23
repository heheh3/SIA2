import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
const app = express();

import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"
import employeeRoutes from "./routes/employee.js"
import userRoutes from "./routes/users.js"


//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//routes

app.use("/", authRoutes)
app.use("/", adminRoutes)
app.use("/", employeeRoutes)
app.use("/", userRoutes)


app.listen(5000, () =>{
    console.log("Server is running on port 5000");
})

