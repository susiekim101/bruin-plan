
import { Router } from 'express'
import { Request, Response } from 'express';
import { createUser } from '../controllers/createUser';
// Import other router files here
// import userRoutes from '...'

const router = Router();

router.post('/createUser', async (req: Request, res: Response) => {
    try {
        await createUser(req.body);
        res.status(200).json({message: "Succesfully created user."});
    } catch {
        res.status(500).json({message: "Failed to create user from the server"});
    }
});
// Add specific routes to router
// router.use(userRoutes)

export default router