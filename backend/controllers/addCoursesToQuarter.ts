import type { ResultSetHeader } from "mysql2/promise";
import { connection } from "../src/database.ts";

interface addCourseProps {
  userId: number;
  courseId: number;
  yearIndex: number;
  quarterName: "Fall" | "Winter" | "Spring" | "Summer";
}

interface getPlanIdProps {
    userId: number;
}

export async function getPlanId({ userId }: getPlanIdProps) {
    try {
        console.log("user id given to plan id: ", userId);
        const query = `SELECT plan_id FROM User_Plans WHERE user_id = ?`;
        const [plan_id_arr] = await connection.execute<any>(query, [userId]);
        console.log("user id passed in: ", userId);
        const planId = plan_id_arr[0].plan_id;
        console.log("user's plan id:", planId);
        console.log("type of plan_id:", typeof planId, planId);
        return planId;

    } catch (err) {
        console.error('Failed to find plan_id: ', err);
        throw new Error("No plan found and failed to create a new one");
    }
}


export async function addCoursesToQuarter({ userId, courseId, yearIndex, quarterName }: addCourseProps) {
    console.log("userId that adds course", userId);
    const planId = await getPlanId({ userId: userId });
    console.log("adding course with: ", planId, courseId, yearIndex, quarterName);

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