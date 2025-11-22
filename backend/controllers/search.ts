import { connection } from '../src/database.ts';

export async function search (searchTerm: string) {
    try {
        // Connect to db in database.ts?
        const db = await connection.getConnection();
        // query Courses table for courses with major_id = userMajorID
        const query = `SELECT * FROM Courses WHERE course_number LIKE %?%`;
        const [rows] = await db.execute(query, [searchTerm]);
        
        return rows;
    } catch (error) {
        console.log('Error fetching data:', error)
        return [];
    }
}
