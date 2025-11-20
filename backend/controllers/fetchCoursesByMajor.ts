import { connection } from '../src/database.ts'

export async function fetchCoursesByMajor (userMajorID: number) {
    try {
        // Connec to db in database.ts?
        const db = await connection.getConnection();
        // query Courses table for courses with major_id = userMajorID
        const query = `SELECT * FROM Courses WHERE major_id = ?`;
        const [rows] = await db.execute(query, [userMajorID]);
        
        return rows;
    } catch (error) {
        console.log('Error fetching data:', error)
        return [];
    }
}