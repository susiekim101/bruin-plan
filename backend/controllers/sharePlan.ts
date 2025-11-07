// Share plan {user_id, major_id, is_shared}
import { connection } from "../src/database"

interface SharePlanProps {
    'user_id': number,
    'major_id': number
}

export async function sharePlan({ user_id, major_id }: SharePlanProps) {
    const query = `INSERT IGNORE INTO Users (user_id, major_id) 
    VALUES (?, ?, ?)`;
    const values = [user_id, major_id, true];

    connection.execute(query, values);
};