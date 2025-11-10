// Share plan {user_id, major_id, is_shared}
import { connection } from "../src/database"

interface SharePlanProps {
    'major_id': number
}

export async function sharePlan({ major_id }: SharePlanProps) {
    // change isShared to true
    const query = `UPDATE User_Plans SET is_shared = true WHERE user_id == ?`;

    connection.execute(query, major_id);
};