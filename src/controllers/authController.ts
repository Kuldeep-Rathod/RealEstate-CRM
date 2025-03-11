import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/userModel.js";
import { sendCookie } from "../utils/features.js";
import { sendWelcomeEmail } from "../utils/sendMail.js";


// Define custom request type to include user property
interface AuthRequest extends Request {
    user?: IUser; // Now properly typed
}

// Register User
export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { name, email, password, confirmPassword, role } = req.body;
        const photo = req.file;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please provide all required fields.");
        }

        if (password !== confirmPassword) {
            res.status(400);
            throw new Error("Passwords do not match");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user: IUser = await User.create({
            name,
            email,
            password: hashedPassword, // Store hashed password
            role,
            photo: photo?.path,
        });
        
        // sendMail(
        //     email,
        //     "Welcome to Lead Management System",
        //     '',
        //     mailTemplate(user.name, "Lead Management System")
        // );

        sendWelcomeEmail(email, user.name);

        sendCookie(user, res, `Welcome, ${user.name}`, 201);
    }
);

// Login User
export const loginUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
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
