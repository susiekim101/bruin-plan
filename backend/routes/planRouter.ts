import type { Request, Response } from 'express';
import { Router } from 'express'
import { sharePlan } from '../controllers/sharePlan.ts';

const planRouter = Router()

planRouter.post('/sharePlan', async ( req: Request, res: Response) => {
    try {
        await sharePlan({ user_id: req.body.user_id});
        res.status(200).json({message: "Shared user plan."});
    } catch {
        res.status(500).json({message: "Failed to share plan"});
    }
});


export default planRouter;

