import { connection } from '../src/database.ts';

/* 
    Retrieves all courses with a specified major_id.

    Returns an array of objects, each object representing a course.
    E.g.
    [
        {
            "course_id": 42,
            "course_number": "COM SCI 35L",
            "course_name": "Software Construction",
            "course_units": 4,
            "category": "Major",
            "major_id": 2
        },
        ...
    ]
*/
export async function fetchCoursesByMajor (majorID: number) {
    try {
        const query = `SELECT * FROM Courses WHERE major_id = ?`;
        const [rows] = await connection.execute(query, [majorID]);
        
        return rows;
    } catch (error) {
        console.log('Error fetching data:', error)
        return [];
    }
}