import type { ResultSetHeader } from "mysql2/promise";
import { connection } from "../src/database.ts";

interface addCourseProps {
  userId: number;
  courseId: number;
  yearIndex: number;
  quarterName: "Fall" | "Winter" | "Spring" | "Summer";
}

export async function createPlan(userId: number) {
    const query = `
        INSERT INTO User_Plans (user_id, major_id)
        VALUES (?, NULL)
    `;
    console.log("creating plan");

    const [result]: any = await connection.execute(query, [userId]);
    console.log("created and returning plan");
    return result.insertId;
}

export async function getPlanId(userId: number) {
    try {
        const query = `SELECT plan_id FROM User_Plans WHERE user_id = ?`;
        const [ rows ] = await connection.execute<any>(query, [userId]);
        if (rows.length > 0) {
            return rows[0].plan_id;
        }
        console.log('Returning user data: ', rows);
        const new_plan_id = await createPlan(userId);
        console.log(new_plan_id);
        return new_plan_id;

    } catch (err) {
        console.error('Failed to find user by email: ', err);
        throw new Error("No plan found and failed to create a new one");
    }
}


export async function addCoursesToQuarter({ userId, courseId, yearIndex, quarterName }: addCourseProps) {
  const planId = await getPlanId(userId);

  const insertQuery = `
    INSERT INTO Plan_Items (plan_id, course_id, year, quarter, status)
    VALUES (?, ?, ?, ?, 'Planned');
  `;

  const [result] = await connection.execute<ResultSetHeader>(insertQuery, [
    planId,
    courseId,
    yearIndex,
    quarterName
  ]);

  return result.insertId;
}