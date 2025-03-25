import jwt from "jsonwebtoken";
import { Response } from "express";
import { jwtSecret } from "../config/env.js";
import { IUser } from "../models/userModel.js"; // Ensure correct path

export const sendCookie = (
    user: IUser,
    res: Response,
    message: string,
    statusCode: number = 200
): void => {
    if (!jwtSecret) {
        throw new Error("JWT secret is missing! Check environment variables.");
    }

    const authToken = jwt.sign(
        {
            _id: String(user._id),
            role: user.role,
            email: user.email,
        },
        jwtSecret,
        {
            expiresIn: "8h", // Match cookie expiry
        }
    );

    res.status(statusCode)
        .cookie("authToken", authToken, {
            httpOnly: true,
            maxAge: 8 * 60 * 60 * 1000, // 8 hours
            expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
            sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
            secure: process.env.NODE_ENV === "production",
        })
        .json({
            success: true,
            message,
            authToken,
        });
};
