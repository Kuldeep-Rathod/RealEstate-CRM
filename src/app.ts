import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();
connectDB(); // Connect to database

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/v1/employees", employeeRoutes); // User routes
app.use("/api/v1/leads", leadRoutes);
app.use("/api/v1/auth", authRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
