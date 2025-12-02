import { connection } from "../src/database.ts";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface createUserProps {
    'first_name': string
    'last_name': string
    'email': string
    'password': string
    'major': string
}
interface addToUserPlanProps {
    user_id: number,
    major_id: number
}

interface MajorRows extends RowDataPacket {
    major_id: number,
}

/* Matches the email address to the email field in the Users database and returns the User data 

Return: An array of an single object that holds information about specified User
    [ {
        'first_name': string
        'last_name': string
        'email': string
        'password': string
        'major': string
    } ]*/
export async function findByEmail(email: string) {
    try {
        const query = `SELECT * FROM Users WHERE email = ?`; // Prevent SQL injection
        const [ results ] = await connection.execute(query, [email]);
        return results;
    } catch (err) {
        console.log('Failed to find user by email: ', err);
        return [];
    }
}

/* Creates a new field in User_Plans that assigns a new plan_id to user when user first signs up 

No return value. */
async function addToUserPlans({user_id, major_id} : addToUserPlanProps) {
    const plan_query = `INSERT IGNORE INTO User_Plans (user_id, major_id) VALUES (?, ?)`;

    try {
        await connection.execute(plan_query, [ user_id, major_id ]);
    } catch (err) {
        console.error(err);
    }
}

/* Checks whether the email already exists (user has an account). If they don't, then create a new
field in the Users database with user's data. Once successfully created an account, assign a new plan_id to user
by calling addToUserPlans. 

Returns the user_id as a number
*/
export async function createUser({ first_name, last_name, email, password, major}: createUserProps) {
    const findEmail = await findByEmail(email);
    if (Array.isArray(findEmail) && findEmail.length > 0) {
        throw new Error('Email already exists');
    }
    
    // Get the major_id from user's major
    const major_query = `SELECT major_id FROM Majors WHERE major_name = ?;`;
    const [major_rows] = await connection.execute<MajorRows[]>(major_query, [major]);
    const major_id = major_rows[0].major_id;

    const user_query = `INSERT IGNORE INTO Users (first_name, last_name, email, password_hash, major_id)
    VALUES (?, ?, ?, ?, ?);`
    const user_values = [first_name, last_name, email, password, major_id];

    // Execute the query
    try { 
        const [result] = await connection.execute<ResultSetHeader>(user_query, user_values);
        const user_id = result.insertId;
        await addToUserPlans({user_id: user_id, major_id: major_id});
        return user_id;
    } catch (err){
        console.error(err);
    }
}