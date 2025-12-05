import type { RowDataPacket } from "mysql2";

export interface removeCourseProps {
  userId: number;
  courseId: number;
  yearIndex: number;
  quarterName: "Fall" | "Winter" | "Spring" | "Summer";
}

export interface addCourseProps {
  userId: number,
  courseId: number,
  yearIndex: number,
  quarterName: "Fall" | "Winter" | "Spring" | "Summer";
}

export interface fetchUserCoursesProps {
    userId: number;
    yearIndex: number;
    quarterName: "Fall" | "Winter" | "Spring" | "Summer";
}

export interface setQuarterCourseStatusProps {
    userId: number,
    yearIndex: number,
    quarterName: "Fall" | "Winter" | "Spring" | "Summer",
    status: "Planned" | "In Progress" | "Completed"
}

export interface PlanIdResult {
    plan_id: number,
}

export interface PlanIdRow extends RowDataPacket {
  plan_id: number,
}