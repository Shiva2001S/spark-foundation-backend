const port = 80;
import express from 'express';
import cors from 'cors';
import paymentRoute from './routes/paymentRoutes.js';
import Razorpay from 'razorpay';
import { connectDB } from './config/database.js';
import { config } from "dotenv";

config({path : './config/config.env'});

const app = express();

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use('/api', paymentRoute);
app.get('/api/getkey', (req, res)=>{
    res.status(200).json({key : process.env.RAZORPAY_API_KEY})
});

connectDB();

export const instance = new Razorpay({
    key_id : process.env.RAZORPAY_API_KEY,
    key_secret : process.env.RAZORPAY_APT_SECRET
});

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});