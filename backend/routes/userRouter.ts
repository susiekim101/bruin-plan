
import type { Request, Response } from 'express';
import { Router } from 'express';
import { createUser } from '../controllers/createUser.ts';
// Import other router files here
// import userRoutes from '...'

const userRouter = Router();

userRouter.post('/createUser', async (req: Request, res: Response) => {
    try {
        await createUser(req.body);
        res.status(200).json({message: "Succesfully created user."});
    } catch {
        res.status(500).json({message: "Failed to create user from the server"});
    }
});

export default userRouter;