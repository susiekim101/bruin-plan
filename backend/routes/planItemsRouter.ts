import type { Request, Response } from 'express';
import { Router } from 'express'
import { getAllPublicPlans, getMajorById, getPlanItems } from '../controllers/fetchPlanItems.ts';

const planItemsRouter = Router();

planItemsRouter.get("/getAllPublicPlans", async ( req: Request, res: Response ) => {
    try {
        const row = await getAllPublicPlans();
        if(!row || row[0].length == 0) {
            console.log("No public plans");
            return res.status(403).json({ plans: [] });
        }
        return res.status(200).json({ plans: row });
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Failed to get all public plans"});
    }
})

planItemsRouter.get('/getMajorById/:major_id', async( req: Request, res: Response ) => {
    const majorId = Number(req.params.major_id);
    try {
        const row = await getMajorById(majorId);
        if(!row) {
            console.log("Major not found");
            return res.status(403).send("Major not found");
        } 

        res.status(200).json({ major_name: row[0].major_name })
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Failed to retreive major name by ID"});

    }
});

planItemsRouter.get('/getPlanItems/:plan_id', async( req: Request, res: Response) => {
    const plan_id = Number(req.params.plan_id);
    try {
        const response = await getPlanItems(plan_id);
        if(!response) {
            return res.status(403).send("Plan not found.");
        }
        return res.status(200).json({planItems: response});
    } catch (err) {
        console.error(`Failed to fetch all plan items: `, err);
        return res.status(500).json({message: "Failed to fetch plan items"});
    }
});

export default planItemsRouter;