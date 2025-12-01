import { connection } from '../src/database.ts'

export async function fetchMajors() {
    try {
        // query Majors table
        const query = "SELECT * FROM Majors";
        const [rows] = await connection.execute(query);

        return rows;
    } catch (error) {
        console.log('Error fetching data:', error)
        return [];
    }
}