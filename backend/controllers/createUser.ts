import { connection } from "../src/database";
interface getMajorProps {
    'major': string
}

interface createUserProps {
    'first_name': string
    'last_name': string
    'email': string
    'password': string
    'major': string
}

export async function getMajorId({ major }: getMajorProps) {
// Find the majors table
    //     Get the major's id

    const major_query = `SELECT major_id FROM Majors WHERE major_name = ?;`;

    const [major_rows] = await connection.execute(major_query, [major]);
    const major_id = major_rows[0].major_id;

    return major_id;
}

export async function createUser({ first_name, last_name, email, password, major}: createUserProps) {
    

        // Find the Users table
    // Add entry (user_id, first_name, last_name, email, password_hash, major_id)
    // Return the userId
    const major_id = getMajorId({ major });

    const user_query = `INSERT IGNORE INTO Users (first_name, last_name, email, password_hash, major_id)
    VALUES (?, ?, ?, ?, ?);`
    const user_values = [first_name, last_name, email, password, major_id];

    await connection.execute(user_query, user_values);
}
