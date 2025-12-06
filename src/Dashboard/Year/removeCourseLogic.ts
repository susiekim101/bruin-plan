import axios from "axios";

type removeCourseProps = {
    courseJson: string;
    userId: number | null;
    yearIndex: number;
    quarterName: 'Fall' | 'Winter' | 'Spring' | 'Summer';
}

async function removeCourseLogic({courseJson, userId, yearIndex, quarterName} : removeCourseProps) {
    if (userId === null || courseJson === "") {
        return;
    }
    const draggedCourse = JSON.parse(courseJson);

    if (draggedCourse.course_id === null) {
        return;
    }
    const courseData = {
        userId: userId,
        courseId: draggedCourse.course_id,
        yearIndex: yearIndex,
        quarterName: quarterName
    };
    try {
        await axios.post(`http://localhost:3001/quarter/removeCourses`, courseData);
    } catch (err) {
        console.error(`Could not remove dragged course from database: `, err);
    }
}

export default removeCourseLogic;