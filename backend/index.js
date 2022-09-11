import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import router from "./Routes/student.js";
import bodyparser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyparser.json({limit:"30mb", extended:true}));
app.use(bodyparser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use('/',router);

dotenv.config();

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log('Database Connected'))
    .catch(e=>console.log(e.message));

app.listen(process.env.PORT,err=>{
    if(err) console.log(err);
    else console.log(`server is running on port ${process.env.PORT}`);
});
