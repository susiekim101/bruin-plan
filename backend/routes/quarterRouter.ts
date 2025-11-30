import type { Request, Response } from 'express';
import { Router } from 'express';
import { addCoursesToQuarter } from "../controllers/addCoursesToQuarter.ts";
import { fetchUserCourses } from '../controllers/fetchUserCourses.ts';

const quarterRouter = Router();

quarterRouter.post('/addCourse', async (req: Request, res: Response) => {
    const {userId, courseId, yearIndex, quarterName} = req.body;

    try {
        await addCoursesToQuarter({ userId, courseId, yearIndex, quarterName });
        res.status(200).json({ message: "Course added" });
    } catch (err) {
        console.error(`Could not add course for userId: ${userId}`, err);
        res.status(500).json({ error: "Failed to add course. "});
    }
})

quarterRouter.post("/getCourses", async (req: Request, res: Response) => {
    const userId = Number(req.body.userId);
    const yearIndex = Number(req.body.yearIndex);
    const quarterName = String(req.body.quarterName);

    try {
        const result = await fetchUserCourses({ userId, yearIndex, quarterName });
        if(!result) {
            return res.status(403).json({ message: "No fetched courses for this user." });
        }
        return res.status(200).json({ allCourses: result });
    } catch {
        return res.status(500).json({ message: "Could not fetch courses for this user." });
    }
})
export default quarterRouter;