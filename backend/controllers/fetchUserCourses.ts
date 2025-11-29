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
        // const db = await connection.getConnection();
        // query Plan Items table for courses with user_id = userId
        const query = `SELECT course_id FROM Plan_Items WHERE plan_id = ? AND year = ? AND quarter = ?`;
        // get plan id from user id
        // console.log("user id passed to plan id: ", userId);
        const results = await getPlanId({userId: userId});
        if(!results || results[0].length == 0) {
            throw new Error('Cannot fetch user courses');
        }
        const plan_id = results[0].plan_id;

        const [rows] = await connection.execute(query, [plan_id, yearIndex, quarterName]);
        console.log(rows);
        return rows;
    } catch (error) {
        console.log('Error fetching data:', error)
        return [];
    }
}