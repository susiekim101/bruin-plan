import { connection } from "../src/database.ts";
import { getPlanId } from "./addCoursesToQuarter.ts";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
interface removeCourseProps {
  userId: number;
  courseId: number;
  yearIndex: number;
  quarterName: "Fall" | "Winter" | "Spring" | "Summer";
}

interface PlanIdRow extends RowDataPacket {
  plan_id: number,
}

export async function removeCoursesFromQuarter({ userId, courseId, yearIndex, quarterName }: removeCourseProps) {
  console.log("goes to delete course");
const results: PlanIdRow[] = await getPlanId({ userId: userId });
  if (!results || results.length == 0 || results[0].length == 0)  {
    throw new Error('Cannot find planId');
  }
  const planId = results[0].plan_id;

  const query = `
    DELETE FROM Plan_Items WHERE plan_id = ? AND course_id = ? AND year = ? AND quarter = ?;`;

    console.log("gets to delete query");
  const [deleteResult] = await connection.execute<ResultSetHeader>(query, [
    planId,
    courseId,
    yearIndex,
    quarterName
  ]);

  return deleteResult.affectedRows;
}