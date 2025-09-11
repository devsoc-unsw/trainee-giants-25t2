import { Request, Response, NextFunction } from "express";
import { verifyAccess } from "./services/tokenService"; 

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.access_token; 
        if (!token) return res.status(401).json({ message: "No token provided" });

        const payload = verifyAccess(token);
        (req as any).userId = payload.sub;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
