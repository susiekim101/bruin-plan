import axios from "axios";

type handleDropProps = {
    courseJson: string;
    userId: number | null;
    yearIndex: number;
    quarterName: 'Fall' | 'Winter' | 'Spring' | 'Summer';
}

async function handleDropLogic({courseJson, userId, yearIndex, quarterName} : handleDropProps) {
    if (userId === null || courseJson === "") {
        return;
    }
    const droppedCourse = JSON.parse(courseJson);

    if (droppedCourse === null || droppedCourse.course_id === null) {
        return;
    }
    const courseData = {
        userId: userId,
        courseId: droppedCourse.course_id,
        yearIndex: yearIndex,
        quarterName: quarterName
    };
    try {
        await axios.post(`http://localhost:3001/quarter/addCourse`, courseData);
    } catch (err) {
        console.error(`Could not add dropped course to database: `, err);
    }
}

export default handleDropLogic;