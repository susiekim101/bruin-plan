// import { Request, Response } from 'express';
import { connection } from "../src/database";
interface createUserProps {
    'first_name': string
    'last_name': string
    'email': string
    'password': string
    'major': string
}

export async function createUser({ first_name, last_name, email, password, major}: createUserProps) {
    // ({ first_name, last_name, email, password, major}: createUserProps
    // Get a reference to the database
//     // Find the majors table
//         // Get the major's id
//     // Find the Users table
//     // Add entry (user_id, first_name, last_name, email, password_hash, major_id)
// Return the useId
    const major_query = 'USE bruin_plan; SHOW Majors';
    connection.execute(major_query);

    return 1234;
}
