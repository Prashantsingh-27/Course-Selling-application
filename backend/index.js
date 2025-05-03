import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import courseRoute  from "./routes/course.route.js";
import userRoute  from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import orderRoute from "./routes/order.route.js";

import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

const app = express()
dotenv.config();

//middileware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus:200,

}))

const port = process.env.PORT || 3000;
const DB_URI=process.env.MONGO_URI;

try{
    await  mongoose.connect(DB_URI);
     console.log("Connected to MongoDB");
 }catch(error){
     console.log(error);
 }

//define
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/admin",adminRoute);
app.use("/api/v1/order",orderRoute);

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECTRET,

})

 
app.listen(port, () => {
  console.log(`Server is Running  on port ${port}`)
})