
import type { Request, Response } from 'express';
import { Router } from 'express';
import { createUser, findByEmail, validateUser } from '../controllers/createUser.ts';
import { getMajorById } from '../controllers/fetchPlanItems.ts'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../tokenMiddleware.ts';
import 'dotenv/config';

const userRouter = Router();

interface UserData {
    'user_id': number
    'first_name': string
    'last_name': string
    'email': string
    'password_hash': string
    'major_id': number
}

userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const data: UserData[] = await findByEmail(req.body.email);
        const invalidUser: {status?: number, message?: string} = await validateUser(data, req.body.password);
        
        // If user does not exist or incorrect credentials
        if(invalidUser.status && invalidUser.message) {
            return res.status(invalidUser.status).send(invalidUser.message);
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

        // Sign token and return as a cookie
        const token = jwt.sign(userToken, process.env.JWT_SECRET as string, {expiresIn: 60 * 15});
        res.cookie('token', token, { httpOnly: true });

        return res.status(201).json({ token });
    } catch (error) {
        if(error.message === 'Email already exists') {
            return res.status(400).send('Existing email');
        }
        return res.status(500).send('Server error');
    }
});

userRouter.post('/logout', async (req: Request, res: Response) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now() - 1000)
    });
    return res.status(200).json({ message: 'User logged out.'})
})

userRouter.get('/verifyUser', verifyToken, async (req: Request, res: Response) => {
    res.status(200).json({ message: 'User verified.' })
})

userRouter.get('/currUserId', verifyToken, async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    const userData = user as { id: number, email: number};
    res.status(200).json({ user_id: userData.id });
})

userRouter.get('/major', verifyToken, async (req: Request, res: Response) => {
    const major_id = res.locals.user.major_id;
    
    try {
        const result = await getMajorById(major_id);

        if(!result)
            return res.status(403).json({ message: 'Could not fetch major name by id'});

        // Return major_name for corresponding major_id
        const major_name = result[0].major_name;
        const major_info = {'major_name': major_name, 'major_id': major_id};
        return res.status(200).json({message: `Fetched user's major: `, data: major_info});
    } catch {
        return res.status(500).json({message: "Failed to fetch user's major ID."});
    }
})


userRouter.get('/userId', verifyToken, async (req: Request, res: Response) => {
    const user_id = res.locals.user.user_id;

    return res.status(200).json({message: `Fetched user_id: ${user_id}`, user_id: user_id});
})

export default userRouter;