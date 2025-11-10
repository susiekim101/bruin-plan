import express from 'express';
type Request = express.Request;
type Response = express.Response;

import { connection } from '../src/database.ts'

export const loadCourses = async (req: Request, res: Response) => {
    const userMajorID = req.params.major_id;

    let db_connection;
    try {
        // connect to database
        db_connection = await connection.getConnection();
        // query Courses table for courses with major_id = userMajorID
        const query = `SELECT * FROM Courses WHERE major_id = ?`;
        const [rows] = await db_connection.execute(query, [userMajorID]);
        
        res.status(200).json(rows);

    } catch (error) {
        console.error('Error fetching data:', error)
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        // if connection established, release connection
        if (db_connection)
            db_connection.release();
    }
}