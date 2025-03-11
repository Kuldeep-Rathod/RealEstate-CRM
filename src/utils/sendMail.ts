import nodemailer from "nodemailer";
import { smtpPass, smtpUser } from "../config/env.js";

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: smtpUser,
        pass: smtpPass,
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string
) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export default sendMail;
