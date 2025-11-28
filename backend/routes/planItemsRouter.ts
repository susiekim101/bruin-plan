import type { Request, Response } from 'express';
import { Router } from 'express'
import { getAllPublicPlans, getMajorById } from '../controllers/fetchPlanItems';

const planItemsRouter = Router();

planItemsRouter.get("/getAllPublicPlans", async ( req: Request, res: Response ) => {
    try {
        const row = await getAllPublicPlans();
        if(!row || row[0].length == 0) {
            console.log("No public plans");
            return res.status(403).json({ plans: [] });
        }
        res.status(200).json({ plans: row });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Failed to get all public plans"});
    }
})

planItemsRouter.get('/getMajorById/:id', async( req: Request, res: Response ) => {
    const majorId = Number(req.params.id);
    try {
        const row = await getMajorById({ major_id: majorId });
        if(!row || row[0].length == 0) {
            console.log("Major not found");
            return res.status(403).send("Major not found");
        } 

        res.status(200).json({ major_name: row[0].major_name })
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Failed to retreive major name by ID"});

    }
});

export default planItemsRouter;