const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const cloudinary = require("cloudinary");


//middlewares and configs
dotenv.config();                //environemental var()
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_KEY,
    api_secret : process.env.CLOUDINARY_SECRET,
});




const app = express();
app.use(cors({
    origin : ["http://localhost:3000","https://624c6d3a84a6e46d8cda7e71--tiny-pegasus-75fb85.netlify.app"],
    credentials : true,
})   
);
app.use(express.json({limit:"5mb"}));//json-reader
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());//cookie-paser



//Connections to port and db
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("Connected at 5000"));

mongoose.connect(process.env.DATABASE_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    },
    (err)=>{
        if(err) return console.log(err);
    console.log("Mongo is Mongoose");}
);


//Routings

app.use("/auth",require("./Routers/authRouters.js"));









