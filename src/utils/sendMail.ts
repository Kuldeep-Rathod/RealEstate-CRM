// import nodemailer from "nodemailer";
// import { smtpPass, smtpUser } from "../config/env.js";

// const transporter = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: smtpUser,
//         pass: smtpPass,
//     },
// });

// // async..await is not allowed in global scope, must use a wrapper
// async function sendMail(
//     to: string,
//     subject: string,
//     text: string,
//     html: string
// ) {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//         from: `"Lead Management System" <${smtpUser}>`,
//         to, // list of receivers
//         subject, // Subject line
//         text, // plain text body
//         html, // html body
//     });

//     console.log("Mail sent successfully to: ", to);
// }

// export default sendMail;

//realtime use
import axios, { AxiosError } from "axios";
import { mailTemplate } from "./mailTemplate.js";

const MAILTRAP_API_TOKEN = "d200b6ae6416211330e1d3ebd80d068d";
const MAILTRAP_SENDER = "hello@demomailtrap.co";
const MAILTRAP_ENDPOINT = "https://send.api.mailtrap.io/api/send";

export const sendWelcomeEmail = async (toEmail: string, name: string) => {
  try {
    const response = await axios.post(
      MAILTRAP_ENDPOINT,
      {
        from: {
          email: MAILTRAP_SENDER,
          name: "Lead Management System",
        },
        to: [{ email: toEmail }],
        subject: "Welcome to Our Service!",
        html: mailTemplate(name, "Lead Management System"), // Importing template
        category: "welcome-email",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MAILTRAP_API_TOKEN}`,
        },
      }
    );

    console.log("Email sent successfully:", response.data);
  } catch (error: AxiosError | any) {
    console.error("Error sending email:", error.response?.data || error.message);
  }
};
