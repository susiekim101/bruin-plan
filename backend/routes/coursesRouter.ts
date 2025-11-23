import type { Request, Response } from 'express';
import { Router } from 'express';
import { fetchCoursesByMajor } from '../controllers/fetchCoursesByMajor.ts';

const coursesRouter = Router();

coursesRouter.get('/:major_id', async (req: Request, res: Response) => {
    const major_id = Number(req.params.major_id);
    try {
        const courses = await fetchCoursesByMajor(major_id);
        res.status(200).json({message: `Fetched courses with major_id = ${major_id}.`, data: courses});
    } catch {
        res.status(500).json({message: "Failed to fetch courses."});
    }
});

export default coursesRouter;