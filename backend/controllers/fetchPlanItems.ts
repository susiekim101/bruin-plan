import { connection } from "../src/database.ts"

interface getMajorByIdProps {
    major_id: number
}

interface getPlanItemsProps {
    plan_id: number
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
        console.log(`getMajorById(${major_id}) returned ${rows}`);
        return rows;
    } catch (err) {
        console.error(`getMajorById(${major_id}) threw an error: ${err}`);
    }
}

export async function getPlanItems({ plan_id }: getPlanItemsProps) {
    try {
        const query = `SELECT * FROM Plan_Items WHERE plan_id = ?`;
        const [rows] = await connection.execute(query, [ plan_id ]);
        console.log(`getPlanItems(${plan_id}) returned ${rows}`);
        return rows;
    } catch (err) {
        console.error(`getPlanTiems(${plan_id} threw an error: ), ${err}`);
    }
}