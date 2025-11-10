import { connection } from "../src/database.ts";
<<<<<<< HEAD
=======

>>>>>>> origin/main
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
    const major_query = `SELECT major_id FROM Majors WHERE major_name = ?;`;

    const [major_rows] = await connection.execute(major_query, [major]);
    const major_id = major_rows[0].major_id;

    return major_id;
}

export async function createUser({ first_name, last_name, email, password, major}: createUserProps) {
    const major_id = getMajorId({ major });

    const user_query = `INSERT IGNORE INTO Users (first_name, last_name, email, password_hash, major_id)
    VALUES (?, ?, ?, ?, ?);`
    const user_values = [first_name, last_name, email, password, major_id];

    try { 
        const user_id = await connection.execute(user_query, user_values);
        // call addToUserPlans
        await addToUserPlans({user_id, major_id});
    } catch(err) {
        console.error(err);
    }
}

async function addToUserPlans({user_id, major_id}) {
    const plan_query = `INSERT IGNORE INTO User_Plan (user_id, major_id) VALUES (?, ?)`;

    try {
        await connection.execute(plan_query, {user_id, major_id});
        console.log("Succesfully added new user to User_Plan");
    } catch (err) {
        console.error(err);
    }
}
