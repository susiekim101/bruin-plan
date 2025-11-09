import { connection } from '../src/database'

export async function loadCourseCards () {
    let db_connection;
    try {
        db_connection = await connection.getConnection();
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        if (db_connection)
            db_connection.release();
    }
}