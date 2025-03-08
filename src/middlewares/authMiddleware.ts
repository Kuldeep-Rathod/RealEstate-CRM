import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IEmployee } from "../models/employeeModel.js";

interface AuthRequest extends Request {
    user?: IEmployee; // You can define a more specific user type later
}

export function authenticate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.header("Authorization"); // Get the full "Bearer <token>"

    if (!authHeader) {
        return res.status(401).json({ error: "Access Denied" });
    }

    // Ensure token starts with "Bearer " and extract only the token
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ error: "Invalid token format" });
    }

    const token = tokenParts[1]; // Extract only the token

    try {
        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as IEmployee;
        req.user = verified; // Attach user data to the request
        next();
    } catch (err) {
        return res.status(400).json({ error: "Invalid Token" });
    }
}
