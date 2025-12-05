import { connection } from '../src/database.ts'

/*
    Returns an array of objects, each object representing a major with a unique major_id and major_name.
    E.g.
    [
        {"major_id": 1,"major_name": "Computer Engineering" },
        {"major_id": 2,"major_name": "Computer Science" },
        ...
    ]
*/
export async function fetchMajors() {
    try {
        // query Majors table
        const query = "SELECT * FROM Majors";
        const [rows] = await connection.execute(query);

        return rows;
    } catch (error) {
        console.log('Error fetching data:', error)
        return [];
    }
}