import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Employee, { IEmployee } from "../models/employeeModel.js";
import { sendCookie } from "../utils/features.js";

// Define custom request type to include user property
interface AuthRequest extends Request {
    user?: IEmployee; // Now properly typed
}

// Register User
export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please provide all required fields.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user: IEmployee = await Employee.create({
            name,
            email,
            password: hashedPassword, // Store hashed password
            role,
        });

        sendCookie(user, res, `Welcome, ${user.name}`, 201);
    }
);

// Login User
export const loginUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const user = await Employee.findOne({ email }).select("+password");
        if (!user || !user.password) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    }
);

// Logout User
export const logoutUser = (req: AuthRequest, res: Response): void => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie immediately
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        secure: process.env.NODE_ENV === "production",
    });

    res.json({ success: true, message: "Logged out successfully" });
};
