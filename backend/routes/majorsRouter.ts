import type { Request, Response } from 'express';
import { Router } from 'express';
import { fetchMajors } from '../controllers/fetchMajors.ts';

const majorsRouter = Router();

majorsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const majors = await fetchMajors();
        res.status(200).json({message: "Fetched all majors.", data: majors});
    } catch {
        res.status(500).json({message: "Failed to fetch majors."});
    }
});

export default majorsRouter;