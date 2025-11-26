import { connection } from '../src/database.ts';

export async function getMajorName() {
    try {
        // Connect to db in database.ts
        const db = await connection.getConnection();
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}