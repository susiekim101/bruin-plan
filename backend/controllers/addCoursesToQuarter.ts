import type { ResultSetHeader } from "mysql2/promise";
import { connection } from "../src/database";

interface getPlanIdProps {
    userId: number
}

interface addCoursesToQuarterProps {
    userId: number;
    courseId: number;
    year: number;
    quarter: string;
}

export async function getPlanId({ userId }: getPlanIdProps) {
    const plan_id_query = `SELECT plan_id FROM User_Plans WHERE user_id = ?;`;

    const [plan_id_rows] = await connection.execute(plan_id_query, [userId]);
    const plan_id = plan_id_rows[0].plan_id;

    return plan_id;
}

export async function addCoursesToQuarter({userId, courseId, year, quarter}: addCoursesToQuarterProps) {
    console.log("FUNCTION RECEIVED:", userId, courseId, year, quarter);
    const planId = getPlanId({ userId });

    const course_query = `INSERT INTO Plan_Items (plan_id, course_id, year, quarter, status) VALUES (?, ?, ?, ?, 'Will Take');`;
        try {
            const [result] = await connection.execute<ResultSetHeader>(course_query, [
                planId, 
                courseId, 
                year, 
                quarter
            ]);
            console.log("Succesfully added course to Plan_Items");
            return result.insertId;
        } catch(err) {
            console.error(err);
        }
}