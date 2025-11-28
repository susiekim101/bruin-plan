import { connection } from "../src/database.ts"

interface getMajorByIdProps {
    'major_id': number
}

export async function getAllPublicPlans() {
    try {
        const query = `SELECT (plan_id, major_id) FROM User_Plans WHERE is_shared = 1`;
        const [rows] = await connection.execute(query);
        console.log("Retrieved all public plans: ", rows);
        return rows;
    } catch (err) {
        console.error(err);
    }
}

export async function getMajorById({ major_id }: getMajorByIdProps) {
    try {
        const query = `SELECT major_name FROM Majors WHERE major_id = ?`;
        const [rows] = await connection.execute(query, [ major_id ]);
        console.log(rows);
        return rows;
    } catch (err) {
        console.error(err);
    }
}
