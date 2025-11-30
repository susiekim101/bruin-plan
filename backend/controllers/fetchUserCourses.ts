import { connection } from '../src/database.ts'
import { getPlanId } from './addCoursesToQuarter.ts'

interface fetchUserCoursesProps {
    userId: number;
    yearIndex: number;
    quarterName: string;
}

export async function fetchUserCourses ({ userId, yearIndex, quarterName }: fetchUserCoursesProps) {
    try {
        const query = `SELECT pi.course_id, c.course_number, c.course_name, c.course_units, c.category 
                    FROM Plan_Items pi JOIN Courses c ON pi.course_id = c.course_id 
                    WHERE plan_id = ? AND year = ? AND quarter = ?`;

        const results: any = await getPlanId({userId: userId});
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