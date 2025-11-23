import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const verifyToken = (req: Request, res: Response, next: () => void) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: 'No JWT token.' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        // req.user = payload;
        next();
    } catch {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

export default verifyToken;