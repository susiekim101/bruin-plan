import { connection } from "../src/database.ts";
import { getPlanId } from "./addCoursesToQuarter.ts";

interface PlanIdResult {
    plan_id: number,
}

interface setQuarterCourseStatusProps {
    userId: number,
    yearIndex: number,
    quarterName: "Fall" | "Winter" | "Spring" | "Summer",
    status: "Planned" | "In Progress" | "Taken"
}

export async function setQuarterCourseStatus({ userId, yearIndex, quarterName, status }: setQuarterCourseStatusProps) {
    const results: PlanIdResult[] = await getPlanId({ userId: userId });

    if (!results || results.length == 0)  {
        throw new Error('Cannot find planId');
    }
    const planId = results[0].plan_id;

    const query = `UPDATE Plan_Items SET status = ? WHERE plan_id = ? AND year = ? AND quarter = ?;`;
  
    const [setResult] = await connection.execute(query, [status, planId, yearIndex, quarterName]);

    return setResult;
}   