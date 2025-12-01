// https://www.geeksforgeeks.org/web-tech/express-js-express-router-function/
// https://medium.com/@finnkumar6/understanding-router-in-express-js-a-complete-guide-7d2cece2b757

import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter.ts';
import planRouter from './routes/planRouter.ts';
import coursesRouter from './routes/coursesRouter.ts';
import majorsRouter from './routes/majorsRouter.ts';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/plan', planRouter);
app.use('/courses', coursesRouter);
app.use('/majors', majorsRouter);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
});
