import { connection } from "../src/database.ts";
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface addCourseProps {
  userId: number,
  courseId: number,
  yearIndex: number,
  quarterName: "Fall" | "Winter" | "Spring" | "Summer";
}

interface getPlanIdProps {
    userId: number,
}

interface PlanIdRow extends RowDataPacket {
  plan_id: number,
}

/*
Retrieves a User's plan_id from the database. plan_id has a foreign key of user_id.
Return: A single array of an objct that has userId's plan_id
  [{ plan_id: 5 }]
*/
export async function getPlanId({ userId }: getPlanIdProps) {
    const query = `SELECT plan_id FROM User_Plans WHERE user_id = ?`;
    try {
      const [ results ] = await connection.execute<PlanIdRow[]>(query, [ userId ]);
      return results;
    } catch (err) {
      console.error("Failed to fetch planId: ", err);
      return [];
    }
}


export async function addCoursesToQuarter({ userId, courseId, yearIndex, quarterName }: addCourseProps) {

  const results: PlanIdRow[] = await getPlanId({ userId: userId });
  if (!results || results.length == 0 || results[0].length == 0)  {
    throw new Error('Cannot find planId');
  }
  const planId = results[0].plan_id;

  const query = `
    INSERT INTO Plan_Items (plan_id, course_id, year, quarter, status)
    VALUES (?, ?, ?, ?, 'Planned');`;

  const [insertResult] = await connection.execute<ResultSetHeader>(query, [
    planId,
    courseId,
    yearIndex,
    quarterName
  ]);
  return insertResult.insertId;
}