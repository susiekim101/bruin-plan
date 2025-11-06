// import { Request, Response } from 'express';
import connection from "../src/database";
// interface addUserProps {
//     'first_name': string
//     'last_name': string
//     'email': string
//     'password': string
//     'major': string
// }

export async function createUser() {
    return connection;
}

// async function createUser(req: Request, res: Response) {
//     // TODO
//     // Get a reference to the database
//     // Find the majors table
//         // Get the major's id
//     // Find the Users table
//     // Add entry (user_id, first_name, last_name, email, password_hash, major_id)
//     console.log(req.body)
//     res.send("Creating user")
// }