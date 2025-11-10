// https://www.geeksforgeeks.org/web-tech/express-js-express-router-function/
// https://medium.com/@finnkumar6/understanding-router-in-express-js-a-complete-guide-7d2cece2b757

import express from 'express';
// import mysql from 'mysql2/promise';
import cors from 'cors';
<<<<<<< HEAD
import router from './routes/router.ts';

=======
import userRouter from './routes/userRouter.ts';
import planRouter from './routes/planRouter.ts';
>>>>>>> origin/main
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
<<<<<<< HEAD
//app.use();
=======
>>>>>>> origin/main

app.use('/user', userRouter);
app.use('/plan', planRouter);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
});
