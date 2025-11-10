// Share plan {user_id, major_id, is_shared}
import { connection } from "../src/database.ts"

interface SharePlanProps {
    'user_id': number
}

export async function sharePlan({ user_id }: SharePlanProps) {
    // change isShared to true
    try { 
        const query = `UPDATE User_Plans SET is_shared = true WHERE user_id = ?`;

        await connection.execute(query, [user_id]);
        console.log("Update share_plan")
    } catch(err) {
        console.error(err);
    }
};