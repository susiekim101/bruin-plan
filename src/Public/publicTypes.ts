import type { RefObject } from "react";

export type DialogRef = RefObject<HTMLDialogElement | null>;

export type PlanItems = {
    plan_item_id: number,
    course_number: string,
    course_name: string,
    year: number,
    quarter: string,
}

export interface Plan {
    plan_id: number,
    major: string
}

export interface RawPlan {
    plan_id: number,
    major_id: number,
}

