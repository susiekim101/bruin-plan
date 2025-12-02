// Share plan {user_id, major_id, is_shared}
import { connection } from "../src/database.ts"

/*
Update the is_shared boolean status to true in User_Plans
No return value 
*/
export async function sharePlan(user_id: number) {
    try { 
        const query = `UPDATE User_Plans SET is_shared = true WHERE user_id = ?`;

        await connection.execute(query, [user_id]);
    } catch(err) {
        console.error(err);
    }
};