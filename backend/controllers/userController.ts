import { Request, Response } from 'express';

export const sharePlan = async (req: Request, res: Response) => {
    // TODO
    console.log(req.body)
    res.send("Sharing plan")
}

export async function search(searchTerm: string) {
    return '';
    //const query = `SELECT * FROM Courses where course_number = ?;`;
}
