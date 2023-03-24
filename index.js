import express from "express";
import cors from "cors"
// import cookieParser from "cookie-parser";
const app = express();
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"
import employeeRoutes from "./routes/employee.js"
import userRoutes from "./routes/users.js"
import medicalRoutes from "./routes/medicalhistory.js"
import inventoryRoutes from "./routes/inventory.js"


//middlewares
app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
}));
    app.use(cookieParser())
//routes

app.use("/", authRoutes)
app.use("/", adminRoutes)
app.use("/", employeeRoutes)
app.use("/", inventoryRoutes)
app.use("/", userRoutes)
app.use("/", medicalRoutes)


app.listen(5000, () =>{
    console.log("Server is running on port 5000");
})

