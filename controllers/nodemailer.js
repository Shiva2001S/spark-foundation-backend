import nodemailer from 'nodemailer';
import { config } from "dotenv";

config({path : './config/config.env'});
export const sendMail = async (order, email) => {
    console.log(`my order ${JSON.stringify(order)}`);
    let transporter = await nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user : process.env.user,
            pass : process.env.pass
        },
    });

    let info = await transporter.sendMail({
        from: 'shiva66282kumar@gmail.com',
        to: email,
        subject: 'Payment Successful',
        html: `<html>
        <body>
            <h1>Payment Successful</h1>
            <p>Thank you for your order!</p>
            <h2>Order Details</h2>
            <p>Order ID: ${order.id }</p>  
            <p>Order Amount: ${order.amount }</p>  
        </body>
    </html>`
    });
    return;
}
