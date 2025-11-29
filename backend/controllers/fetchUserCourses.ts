import { connection } from '../src/database.ts'
import { getPlanId } from './addCoursesToQuarter.ts'

export async function fetchUserCourses (userId: number, yearIndex: number, quarterName: string) {
    try {
        // Connect to db in database.ts
        const db = await connection.getConnection();
        // query Plan Items table for courses with user_id = userId
        const query = `SELECT course_id FROM Plan_Items WHERE plan_id = ? AND year = ? AND quarter = ?`;
        // get plan id from user id
        const plan_id = await getPlanId(userId);
        const [rows] = await db.execute(query, [plan_id, yearIndex, quarterName]);
        console.log(rows);
        return rows;
    } catch (error) {
        console.log('Error fetching data:', error)
        return [];
    }
}