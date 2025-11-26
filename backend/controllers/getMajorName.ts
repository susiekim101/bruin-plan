import { connection } from '../src/database.ts';

export async function getMajorName(userMajorID: Number) {
    try {
        // Connect to db in database.ts
        const db = await connection.getConnection();
        const query = `SELECT major_name FROM Majors WHERE major_id = ?`;
        const [rows] = await db.execute(query, [userMajorID]);
        
        return rows;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}