import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import bodyParser from "body-parser"

dotenv.config()
const app = express()

const connect = async () => {
try {
    // await mongoose.connect(process.env.MONGO);
    await mongoose.connect('mongodb://localhost:27017/testDB')
    console.log('Connected to db');
  } catch (error) {
    throw error;
  }
}

mongoose.connection.on("disconnected", () => {
    console.log("db disconnected");
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoute)     
app.use("/api/users", usersRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    error: errorMessage,
    stack: err.stack
  })
})

// app.listen(process.env.PORT, () => {
//     connect();
//     console.log("Backend");
// })
app.listen(8800, () => {
  connect();
  console.log("Backend");
})