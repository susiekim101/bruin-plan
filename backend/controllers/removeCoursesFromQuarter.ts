import { connection } from "../src/database.ts";
import { getPlanId } from "./addCoursesToQuarter.ts";

interface removeCourseProps {
  userId: number;
  courseId: number;
  yearIndex: number;
  quarterName: "Fall" | "Winter" | "Spring" | "Summer";
}

export async function removeCoursesFromQuarter({ userId, courseId, yearIndex, quarterName }: removeCourseProps) {
  console.log("goes to delete course");
const results: any = await getPlanId({ userId: userId });
  if (!results || results.length == 0 || results[0].length == 0)  {
    throw new Error('Cannot find planId');
  }
  const planId = results[0].plan_id;

  const query = `
    DELETE FROM Plan_Items WHERE plan_id = ? AND course_id = ? AND year = ? AND quarter = ?;`;

    console.log("gets to delete query");
  const [deleteResult] : any = await connection.execute(query, [
    planId,
    courseId,
    yearIndex,
    quarterName
  ]);

  return deleteResult.affectedRows;
}