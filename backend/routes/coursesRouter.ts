import type { Request, Response } from 'express';
import { Router } from 'express';
import { fetchCoursesByMajor } from '../controllers/fetchCoursesByMajor.ts';
import verifyToken from '../tokenMiddleware.ts';
// import jwt from 'jsonwebtoken';
// import cookieParser from 'cookie-parser';
import 'dotenv/config';

const coursesRouter = Router();

coursesRouter.get('/major', verifyToken, async (req: Request, res: Response) => {
    const major_id = res.locals.user.major_id;
    try {
        const courses = await fetchCoursesByMajor(major_id);
        return res.status(200).json({message: `Fetched courses with major_id = ${major_id}.`, data: courses});
    } catch {
        return res.status(500).json({message: "Failed to fetch courses."});
    }
});

export default coursesRouter;