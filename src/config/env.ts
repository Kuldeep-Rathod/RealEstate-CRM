import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) throw new Error("❌ MONGO_URI is missing in .env file!");
if (!process.env.JWT_SECRET) throw new Error("❌ JWT_SECRET is missing in .env file!");

export const port = process.env.PORT || 5000;
export const mongoURI = process.env.MONGO_URI;
export const jwtSecret = process.env.JWT_SECRET || "defaultSecret";
export const nodeEnv = process.env.NODE_ENV || "development";
export const smtpUser = process.env.SMTP_USER;
export const smtpPass = process.env.SMTP_PASS;
export const smtpHost = process.env.SMTP_HOST;
export const smtpPort = process.env.SMTP_PORT;