import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
        email: string;
    };
}

export function authorize(allowedRoles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized: No user data found" });
            return;
        }

        // console.log(`User Role: ${req.user.role}`); // Debugging

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                error: "Forbidden: You do not have access",
            });
            return;
        }

        next();
    };
}
