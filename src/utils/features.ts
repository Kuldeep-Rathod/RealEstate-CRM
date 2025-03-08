import jwt from "jsonwebtoken";
import { Response } from "express";
import { jwtSecret } from "../config/env.js";
import { IEmployee } from "../models/employeeModel.js"; // Ensure correct path

export const sendCookie = (
    user: IEmployee,
    res: Response,
    message: string,
    statusCode: number = 200
): void => {
    const token = jwt.sign(
        { _id: String((user as IEmployee)._id) },
        jwtSecret,
        {
            expiresIn: "10m",
        }
    );

    res.status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000, // 10 minutes
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            secure: process.env.NODE_ENV === "production",
        })
        .json({
            success: true,
            message,
            token,
        });
};
