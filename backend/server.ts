// https://www.geeksforgeeks.org/web-tech/express-js-express-router-function/
// https://medium.com/@finnkumar6/understanding-router-in-express-js-a-complete-guide-7d2cece2b757

import express from 'express';
// import mysql from 'mysql2/promise';
import cors from 'cors';
import router from './routes/router';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use();

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
});
