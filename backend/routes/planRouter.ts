import type { Request, Response } from 'express';
import { Router } from 'express'
import { sharePlan, unsharePlan } from '../controllers/sharePlan.ts';

const planRouter = Router()

planRouter.post('/sharePlan/:user_id', async ( req: Request, res: Response) => {
    const user_id = Number(req.params.user_id);

    try {
        await sharePlan(user_id);
        res.status(200).json({message: "Shared user plan."});
    } catch {
        res.status(500).json({message: "Failed to share plan"});
    }
});

planRouter.post('/unsharePlan/:user_id', async (req: Request, res: Response) => {
    const user_id = Number(req.params.user_id);
    
    try {
        await unsharePlan(user_id);
        res.status(200).json({message: "Unshared user plan."});
    } catch {
        res.status(500).json({message: "Failed to unshare user plan."});
    }
})

export default planRouter;

