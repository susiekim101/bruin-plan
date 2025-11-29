import { connection } from '../src/database.ts'
import { getPlanId } from './addCoursesToQuarter.ts'

interface fetchUserCoursesProps {
    userId: number;
    yearIndex: number;
    quarterName: string;
}

export async function fetchUserCourses ({ userId, yearIndex, quarterName }: fetchUserCoursesProps) {
    try {
        // Connect to db in database.ts
        const db = await connection.getConnection();
        // query Plan Items table for courses with user_id = userId
        const query = `SELECT course_id FROM Plan_Items WHERE plan_id = ? AND year = ? AND quarter = ?`;
        // get plan id from user id
        console.log("user id passed to plan id: ", userId);
        const plan_id = await getPlanId({userId: userId});
        const [rows] = await db.execute(query, [plan_id, yearIndex, quarterName]);
        console.log(rows);
        return rows;
    } catch (error) {
        console.log('Error fetching data:', error)
        return [];
    }
}