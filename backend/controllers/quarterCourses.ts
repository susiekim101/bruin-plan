import { connection } from "../src/database.ts";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface removeCourseProps {
  userId: number;
  courseId: number;
  yearIndex: number;
  quarterName: "Fall" | "Winter" | "Spring" | "Summer";
}

interface addCourseProps {
  userId: number,
  courseId: number,
  yearIndex: number,
  quarterName: "Fall" | "Winter" | "Spring" | "Summer";
}

interface fetchUserCoursesProps {
    userId: number;
    yearIndex: number;
    quarterName: string;
}

interface PlanIdResult {
    plan_id: number,
}

interface PlanIdRow extends RowDataPacket {
  plan_id: number,
}

interface PlanIdResult {
    plan_id: number,
}

/*
Retrieves a User's plan_id from the database. plan_id has a foreign key of user_id.
Return: A single array of an objct that has userId's plan_id
  [{ plan_id: 5 }]
*/
export async function getPlanId(userId: number) {
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

  const results: PlanIdRow[] = await getPlanId(userId);
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

export async function removeCoursesFromQuarter({ userId, courseId, yearIndex, quarterName }: removeCourseProps) {
const results: PlanIdResult[] = await getPlanId(userId);
  if (!results || results.length == 0)  {
    throw new Error('Cannot find planId');
  }
  const planId = results[0].plan_id;

  const query = `
    DELETE FROM Plan_Items WHERE plan_id = ? AND course_id = ? AND year = ? AND quarter = ?;`;

  const [deleteResult] = await connection.execute<ResultSetHeader>(query, [
    planId,
    courseId,
    yearIndex,
    quarterName
  ]);

  return deleteResult.affectedRows;
}

export async function fetchUserCourses ({ userId, yearIndex, quarterName }: fetchUserCoursesProps) {
    try {
        const query = `SELECT pi.course_id, c.course_number, c.course_name, c.course_units, c.category 
                    FROM Plan_Items pi JOIN Courses c ON pi.course_id = c.course_id 
                    WHERE plan_id = ? AND year = ? AND quarter = ?`;

        const results: PlanIdResult[] = await getPlanId(userId);
        if(!results || results.length == 0) {
            throw new Error('Cannot fetch user courses');
        }
        const plan_id = results[0].plan_id;

        const [rows] = await connection.execute(query, [plan_id, yearIndex, quarterName]);
        return rows;
    } catch (error) {
        console.log('Error fetching data:', error)
        return [];
    }
}