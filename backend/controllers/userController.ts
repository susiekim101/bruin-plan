import { Request, Response } from 'express';
import { connection } from '../src/database';

export const sharePlan = async (req: Request, res: Response) => {
    // TODO
    console.log(req.body)
    res.send("Sharing plan")
}

export async function search(searchTerm: string) {
    const [courses] = await connection.execute('') || [];
    return '';
    //const query = `SELECT * FROM Courses where course_number = ?;`;
}
