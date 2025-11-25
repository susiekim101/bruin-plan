
import type { Request, Response } from 'express';
import { Router } from 'express';
import { createUser, findByEmail } from '../controllers/createUser.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../tokenMiddleware.ts';
import 'dotenv/config';

const userRouter = Router();

userRouter.post('/login', async (req: Request, res: Response) => {
    console.log('Called /login backend');
    try {
        const data = await findByEmail(req.body.email);
        console.log(`The user data is ${data[0]}`);
        const isPasswordCorrect = await bcrypt.compare(req.body.password, data[0].password_hash);

        // Check if user exists
        if(!data || data[0].length == 0) {
            console.log("User not found");
            return res.status(403).send("User not found");
        }  

        // Incorrect validation check
        if(!isPasswordCorrect) {
            console.log("Incorrect password");
            return res.status(403).send("Log in failed: Incorrect password");
        }

        // Create token (user id and email)
        const userToken = {id: data[0].user_id, email: data[0].email};
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }

        // Sign token and return as a cookie
        const token = jwt.sign(userToken, process.env.JWT_SECRET as string, {expiresIn: 60 * 15});
        res.cookie('token', token, { httpOnly: true }); // Store the cookie
        return res.status(200).json({token});
    } catch (err) {
        console.error('Could not log in user: ', err);
    }
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
        const user_id = await createUser(body);

        // Create token (user id and email)
        const userToken = {id: user_id, email: body.email};
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        const token = jwt.sign(userToken, process.env.JWT_SECRET as string, {expiresIn: 60 * 15});
        res.cookie('token', token, { httpOnly: true }); // Store the cookie

        return res.status(201).json({ token });
    } catch (error) {
        if(error.message === 'Email already exists') {
            return res.status(400).send('Existing email');
        }
        return res.status(500).send('Server error');
    }
});

userRouter.post('/logout', async (req: Request, res: Response) => {
    console.log("Clearing user JWT cookies");
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now() - 1000)
    });
    // res.clearCookie('token');
    return res.status(200).json({ message: 'User logged out.'})
})

userRouter.get('/verifyUser', verifyToken, async (req: Request, res: Response) => {
    console.log("User verified.");
    res.status(200).json({ message: 'User verified.' })
})


export default userRouter;