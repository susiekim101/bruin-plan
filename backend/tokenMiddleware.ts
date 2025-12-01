import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { findByEmail } from "./controllers/createUser.ts";
import { JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload{
    id: number,
    email: string,
}

const verifyToken = async (req: Request, res: Response, next: () => void) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: 'No JWT token.' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
        const user_email = payload.email;
        // console.log("User email:", user_email);
        const user_info = await findByEmail(user_email);
        // console.log("User info:", user_info[0]);
        res.locals.user = user_info[0];

        next();
    } catch {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

export default verifyToken;