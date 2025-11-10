import { Request, Response, Router } from 'express';
import { sharePlan } from '../controllers/sharePlan';

const planRouter = Router()

planRouter.use('/sharePlan', async( req: Request, res: Response) => {
    try {
        await sharePlan(req.body);
        res.status(200).json({message: "Shared user plan."});
    } catch {
        res.status(500).json({message: "Failed to share plan"});
    }
});


export default planRouter;

