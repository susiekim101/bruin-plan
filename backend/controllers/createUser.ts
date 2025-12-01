import { connection } from "../src/database.ts";
import type { ResultSetHeader } from "mysql2";
interface createUserProps {
    'first_name': string
    'last_name': string
    'email': string
    'password': string
    'major': string
}



export async function findByEmail(email: string) {
    try {
        const query = `SELECT * FROM Users WHERE email = ?`; // Prevent SQL injection
        const [ results ] = await connection.execute(query, [email]);
        console.log('Returning user data: ', results);
        return results;
    } catch (err) {
        console.log('Failed to find user by email: ', err);
        return [];
    }
}

async function addToUserPlans({user_id, major_id}) {
    const plan_query = `INSERT IGNORE INTO User_Plan (user_id, major_id) VALUES (?, ?)`;

    try {
        await connection.execute(plan_query, {user_id, major_id});
        return user_id
    } catch (err) {
        console.error(err);
    }
}

export async function createUser({ first_name, last_name, email, password, major}: createUserProps) {
    const findEmail = await findByEmail(email);
    if (Array.isArray(findEmail) && findEmail.length > 0) {
        // return new Error('Email already exists');
        throw new Error('Email already exists');
    }
    
    // Get the major_id from user's major
    const major_query = `SELECT major_id FROM Majors WHERE major_name = ?;`;
    const [major_rows] = await connection.execute(major_query, [major]);
    const major_id = major_rows[0].major_id;

    // Define the user query
    const user_query = `INSERT IGNORE INTO Users (first_name, last_name, email, password_hash, major_id)
    VALUES (?, ?, ?, ?, ?);`
    const user_values = [first_name, last_name, email, password, major_id];

    try { 
        // Insert the user into the database
        const [result] = await connection.execute<ResultSetHeader>(user_query, user_values);
        // Insert user into user_plan
        const user_id = result.insertId;
        // Returns the user_id
        await addToUserPlans({user_id: user_id, major_id: major_id});
        return user_id;
    } catch (err){
        console.error(err);
    }
}