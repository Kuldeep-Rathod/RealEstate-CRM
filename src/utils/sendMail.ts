import nodemailer from "nodemailer";
import { smtpHost, smtpPass, smtpUser } from "../config/env.js";

const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: 587,
    secure: false,
    auth: {
        user: smtpUser,
        pass: smtpPass,
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(
    to: string,
    subject: string,
    text: string,
    html: string
) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"Lead Management System" <${smtpUser}>`,
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    });

    console.log("Mail sent successfully to: ", to);
}

export default sendMail;

