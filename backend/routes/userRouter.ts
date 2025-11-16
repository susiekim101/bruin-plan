
import type { Request, Response } from 'express';
import { Router } from 'express';
import { createUser } from '../controllers/createUser.model.ts';

const userRouter = Router();

// userRouter.post('/login', async (req: Request, res: Response) => {

// });

userRouter.post('/signup', async (req: Request, res: Response) => {
    // console.log('Received post request');
    try {
        await createUser(req.body);
        res.status(201).send('Account successfully created');
    } catch (error) {
        if(error.message === 'Email already exists') {
            return res.status(400).send('Existing email');
        }
        res.status(500).send('Server error');
    }
});

export default userRouter;