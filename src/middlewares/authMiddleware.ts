import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    _id: string;
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
    // console.log("Incoming Headers:", req.headers); // Debug incoming headers

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

        if (!verified._id) {
            // Change `id` to `_id`
            res.status(401).json({ error: "Invalid Token. No user ID found." });
            return;
        }

        req.user = verified;

        // console.log("Assigned User to Request:", req.user); // ✅ Debugging

        next(); // ✅ Always call next() when successful
    } catch (err) {
        res.status(400).json({ error: "Invalid Token" });
    }
}
