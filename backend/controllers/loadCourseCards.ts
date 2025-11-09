import { connection } from '../src/database'

export async function loadCourseCards (major_id: number) {
    let db_connection;
    try {
        db_connection = await connection.getConnection();
        const query = `SELECT * FROM Courses WHERE major_id = ?`;
        const [rows] = await db_connection.execute(query, [major_id]);
        return rows;

    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        if (db_connection)
            db_connection.release();
    }
}