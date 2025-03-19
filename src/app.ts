import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import UserRoutes from "./routes/userRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB(); // Connect to database

const app = express();

const allowedOrigins = ["https://real-estate-crm-frontend-alpha.vercel.app"];

// Middleware
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true, // Allow credentials (cookies, authentication headers)
    })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.json()); // Parse JSON requests
app.use(ExpressMongoSanitize());
app.use(xss());

// Routes

app.use("/api/v1/Users", UserRoutes); // User routes
app.use("/api/v1/leads", leadRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", (req, res, next) => {
    res.status(200).json({ message: "Welcome to RealEstate-CRM API" });
    next(); // Call the next middleware function
});

// Error Handling Middleware
app.use(errorHandler);

export default app;
