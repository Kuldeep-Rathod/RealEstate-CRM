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
    const token = jwt.sign(
        {
            _id: String((user as IUser)._id),
            role: user.role,
            email: user.email,
        },
        jwtSecret,
        {
            expiresIn: "10m",
        }
    );

    res.status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 1 * 60 * 1000, // 8 hours
            expires: new Date(Date.now() + 1 * 60 * 1000),
            // maxAge: 8 * 60 * 60 * 1000, // 8 hours
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            secure: process.env.NODE_ENV === "production",
        })
        .json({
            success: true,
            message,
            token,
        });
};
