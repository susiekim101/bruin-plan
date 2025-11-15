import { connection } from '../src/database.ts'

export async function getMajors() {
    try {
        // establish connection to database
        const db = await connection.getConnection();
        
        // query Majors table
        const query = "SELECT * FROM Majors";
        const [rows] = await db.execute(query);

        return rows;
    } catch (error) {
        console.log('Error fetching data:', error)
        return [];
    }
}