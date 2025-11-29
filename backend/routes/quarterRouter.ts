import type { Request, Response } from 'express';
import { Router } from 'express';
import { addCoursesToQuarter } from "../controllers/addCoursesToQuarter.ts";
import { fetchUserCourses } from '../controllers/fetchUserCourses.ts';

const quarterRouter = Router();

// quarterRouter.post('/add-course/:userId/:courseId/:yearIndex/:quarterName', async (req: Request, res: Response) => {
//     console.log("passed in to add course:", req.body);
//     try {
//         const {userId, courseId, yearIndex, quarterName} = req.body;
//         console.log("gets here");
//         await addCoursesToQuarter({
//             userId,
//             courseId,
//             yearIndex,
//             quarterName
//         });
//         console.log("course added");

//         res.status(200).json({ message: "Course added" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Failed to add course." });
//     }
// });

quarterRouter.post('/addCourse', async (req: Request, res: Response) => {
    try {
        
    }
})

quarterRouter.get("/:userId/:yearIndex/:quarterName", async (req, res) => {
    // console.log("backed received: ", req.params);
    // console.log("user id being set: ", Number(req.params.userId));
    const userId = Number(req.params.userId);
    const yearIndex = Number(req.params.yearIndex);
    const quarterName = req.params.quarterName;

    try {
        const courses = await fetchUserCourses({userId, yearIndex, quarterName});
        return res.status(200).json({message: `Fetched courses with major_id = ${userId}.`, data: courses});
    } catch {
        return res.status(500).json({message: "Failed to fetch courses."});
    }
});


export default quarterRouter;
