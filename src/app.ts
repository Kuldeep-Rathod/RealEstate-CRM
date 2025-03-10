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

dotenv.config();
connectDB(); // Connect to database

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.json()); // Parse JSON requests
app.use(ExpressMongoSanitize());
app.use(xss());

// Routes
app.use("/api/v1/Users", UserRoutes); // User routes
app.use("/api/v1/leads", leadRoutes);
app.use("/api/v1/auth", authRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
