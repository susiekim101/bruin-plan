import { connection } from "../src/database.ts";
import { getPlanId } from "./addCoursesToQuarter.ts";

interface removeCourseProps {
  userId: number;
  courseId: number;
  yearIndex: number;
  quarterName: "Fall" | "Winter" | "Spring" | "Summer";
}

interface PlanIdResult {
    length: number;
    plan_id: number,
}

interface DeleteCourseResult {
  affectedRows: number;
}

export async function removeCoursesFromQuarter({ userId, courseId, yearIndex, quarterName }: removeCourseProps) {
const results: PlanIdResult[] = await getPlanId({ userId: userId });
  if (!results || results.length == 0 || results[0].length == 0)  {
    throw new Error('Cannot find planId');
  }
  const planId = results[0].plan_id;

  const query = `
    DELETE FROM Plan_Items WHERE plan_id = ? AND course_id = ? AND year = ? AND quarter = ?;`;

  const [deleteResult] : DeleteCourseResult[] = await connection.execute(query, [
    planId,
    courseId,
    yearIndex,
    quarterName
  ]);

  return deleteResult.affectedRows;
}