
import type { Request, Response } from 'express';
import { Router } from 'express';
import { createUser, findByEmail } from '../controllers/createUser.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const userRouter = Router();

userRouter.post('/login', async (req: Request, res: Response) => {
    // Password validation
    // console.log('Loggin in.');
    const data = await findByEmail(req.body.email);
    console.log(`The user data is ${data[0]}`);
    const isPasswordCorrect = await bcrypt.compare(req.body.password, data[0].password_hash);

    if(!isPasswordCorrect) {
        return res.status(403).send("Log in failed: Incorrect password");
    }
    if(!data || data[0].length == 0) {
        return res.status(403).send("User not found");
    }
    const userToken = {id: data[0].user_id, email: data[0].email};
    const token = jwt.sign(userToken, process.env.JWT_SECRET, {expiresIn: 3600 * 24});
    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({token}).send('Log in success');
});

userRouter.post('/signup', async (req: Request, res: Response) => {
    console.log('Received post request');
    const body = {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'email': req.body.email,
        'password': await bcrypt.hash(req.body.password,10),
        'major': req.body.major,
    }

    try {
        await createUser(body);
        res.status(201).send('Account successfully created');
    } catch (error) {
        if(error.message === 'Email already exists') {
            return res.status(400).send('Existing email');
        }
        res.status(500).send('Server error');
    }
});

export default userRouter;