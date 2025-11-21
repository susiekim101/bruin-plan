import type { ResultSetHeader } from "mysql2/promise";
import { connection } from "../src/database";

interface addCoursesToQuarterProps {
    planId: number;
    courseId: number;
    year: number;
    quarter: string;
}

export async function addCoursesToQuarter({planId, courseId, year, quarter}: addCoursesToQuarterProps) {
    console.log("FUNCTION RECEIVED:", planId, courseId, year, quarter);
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