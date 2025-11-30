import { connection } from '../src/database.ts';

export async function getUserMajorByName(userMajorID: Number) {
    try {
        // Query Majors table for major_name with major_id == userMajorID
        const query = `SELECT major_name FROM Majors WHERE major_id = ?`;
        const [result] = await connection.execute(query, [userMajorID]);

        console.log(`Fetched user's major: `, result);
        
        return result;
    } catch (error) {
        console.log('Error fetching data:', error);
        return [];
    }
}