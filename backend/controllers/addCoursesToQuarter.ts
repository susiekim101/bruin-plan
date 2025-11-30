// import type { ResultSetHeader } from "mysql2/promise";
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
    // console.log("user id given to plan id: ", userId);
    const query = `SELECT plan_id FROM User_Plans WHERE user_id = ?`;
    try {
      const [ results ] = await connection.execute(query, [ userId ]);
      return results;
    } catch (err) {
      console.error("Failed to fetch planId: ", err);
      return [];
    }
}


export async function addCoursesToQuarter({ userId, courseId, yearIndex, quarterName }: addCourseProps) {
  const results = await getPlanId({ userId: userId });
  if(!results || results[0].length == 0)  {
    throw new Error('Cannot find planId');
  }
  const planId = results[0].plan_id;

  const query = `
    INSERT INTO Plan_Items (plan_id, course_id, year, quarter, status)
    VALUES (?, ?, ?, ?, 'Planned');`;

  await connection.execute(query, [
    planId,
    courseId,
    yearIndex,
    quarterName
  ]);
}