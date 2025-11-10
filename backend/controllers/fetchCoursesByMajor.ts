import { connection } from '../src/database.ts'

export async function fetchCoursesByMajor (userMajorID: number) {
    try {
        // query Courses table for courses with major_id = userMajorID
        const query = `SELECT * FROM Courses WHERE major_id = ?`;
        const [rows] = await connection.execute(query, [userMajorID]);
        
        return rows;
    } catch (error) {
        console.error('Error fetching data:', error)
        return [];
    }
}