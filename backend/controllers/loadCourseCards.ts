import { connection } from '../src/database'

export async function loadCourseCards (userMajorID: number) {
    let db_connection;
    try {
        // connect to database
        db_connection = await connection.getConnection();

        // query Courses table for courses with major_id = userMajorID
        const query = `SELECT * FROM Courses WHERE major_id = ?`;
        const [rows] = await db_connection.execute(query, [userMajorID]);
        return rows;

    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        // if connection established, release connection
        if (db_connection)
            db_connection.release();
    }
}