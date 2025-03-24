import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/userModel.js";
import { sendCookie } from "../utils/features.js";
import sendMail from "../utils/sendMail.js";
import { mailTemplate } from "../utils/mailTemplate.js";

// Define custom request type to include user property
export interface AuthRequest extends Request {
    user?: IUser; // Now properly typed
}

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

// Register User
export const registerUser = asyncHandler(
    async (req: MulterRequest, res: Response) => {
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

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400);
            throw new Error("User already exists");
        }

        //Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000);
        const hashedOTP = await bcrypt.hash(String(otp), 10);
        console.log(otp);
        console.log(hashedOTP);
        const otpExpiry = new Date(Date.now() + 30 * 60 * 1000); // 10 minutes

        const user: IUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            photo: photo?.path,
            otp: hashedOTP,
            otpExpiry,
        });

        sendMail(
            email,
            "OTP for Lead Management System",
            ``,
            // mailTemplate(user.name, "Lead Management System")
            `Hello ${user.name},<br><br> Your OTP for Lead Management System is: ${otp}`
        );

        res.status(200).json({ message: "Sent OTP to your email" });
    }
);

// Verify OTP
export const verifyOTP = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    if (!user.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
        res.status(400);
        throw new Error("OTP has expired. Please request a new one.");
    }

    const isMatch = await bcrypt.compare(String(otp), user.otp);
    if (!isMatch) {
        res.status(400);
        throw new Error("Invalid OTP");
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // sendMail(
    //     email,
    //     "Welcome to Lead Management System",
    //     "",
    //     mailTemplate(user.name, "Lead Management System")
    // );

    sendCookie(user, res, `Welcome, ${user.name}`, 200);
});

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
