import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: string;
    role: string;
    email: string;
}

interface AuthRequest extends Request {
    user?: JwtPayload;
}

export function authenticate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        res.status(401).json({ error: "Access Denied" });
        return; // ✅ Ensure middleware returns after sending a response
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        res.status(401).json({ error: "Invalid token format" });
        return;
    }

    const token = tokenParts[1];

    try {
        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        // console.log("Decoded Token:", verified); // 🔹 Debugging

        req.user = verified;
        next(); // ✅ Always call next() when successful
    } catch (err) {
        res.status(400).json({ error: "Invalid Token" });
    }
}
