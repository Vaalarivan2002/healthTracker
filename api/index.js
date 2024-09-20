import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);

    // await mongoose.connect('mongodb://localhost:27017/testDB')    // you have connected to local, not cloud since the website was blocked by Anna Wifi a while back!!
    console.log('Connected to db');
  } catch (error) {
    throw error;
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("db disconnected");
})

// niche middlewares!
app.use(bodyParser.urlencoded({ extended: false }))  // this middleware doesnt have a mount path. Hence this is called everytime a new request is made to the backend

app.use(cookieParser());

const allowedOrigins = [`${process.env.CLIENT_URL}`];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allows credentials such as cookies, authorization headers, etc.
};

app.use(cors(corsOptions));
app.use(express.json());

// these 2 middlewares have a mount path
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    error: errorMessage,
    stack: err.stack
  });
});

const port = process.env.PORT || 8800;
app.listen(port, () => {
  connect();
  console.log("Backend");
});