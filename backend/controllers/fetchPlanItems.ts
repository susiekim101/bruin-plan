import { connection } from "../src/database.ts"

/* Retrieves all of the plans that are shared

Returns an array of objects, where each object has a plan_id and major_id
    e.g.
    [
        { plan_id: 1, major_id: 2 },
        { plan_id: 2, major_id: 3 },
        ...
    ]
*/
export async function getAllPublicPlans() {
    try {
        const query = `SELECT plan_id, major_id FROM User_Plans WHERE is_shared = 1`;
        const [rows] = await connection.execute(query);
        return rows;
    } catch (err) {
        console.error(err);
    }
}

/*
Retrieves the name of the major by its major_id
Returns a row with a single object that has a major_name field
    e.g. [ { major_name: "Computer Science"} ]
*/
export async function getMajorById(major_id: number) {
    try {
        const query = `SELECT major_name FROM Majors WHERE major_id = ?`;
        const [rows] = await connection.execute(query, [ major_id ]);
        return rows;
    } catch (err) {
        console.error(`getMajorById(${major_id}) threw an error: ${err}`);
        return [];
    }
}

/* Each user has a dedicated plan_id, and each plan_id has a plan_item for each individual course. Given a user's plan_id, return the information of each plan to display on a Course Card
Returns an array of objects, where each object represents a single course in the user's plan
    e.g. 
    [
        { plan_item_id: 1, course_number: "MATH 32A", course_name: "Multivariable Calculus", year: 1, quarter: "Fall" },
        { plan_item_id: 2, course_number: "COM SCI 31", course_name: "Introduction to C++", year: 2, quarter: "Spring" },
        ...
    ]

*/
export async function getPlanItems(plan_id: number) {
    try {
        const query = `SELECT pi.plan_item_id, c.course_number, c.course_name, pi.year, pi.quarter FROM Plan_Items pi JOIN Courses c ON pi.course_id = c.course_id WHERE plan_id = ?`;
        const [rows] = await connection.execute(query, [ plan_id ]);
        return rows;
    } catch (err) {
        console.error(`getPlanItems(${plan_id}) threw an error: ${err}`);
    }
}