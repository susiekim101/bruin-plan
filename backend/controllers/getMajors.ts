import { connection } from '../src/database.ts'

export async function getMajors() {
    const db = await connection.getConnection();
    const query = "SELECT * FROM Majors";
    const [rows] = await db.execute(query);

    return rows;
}