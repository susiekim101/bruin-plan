import axios from "axios";

type removeCourseProps = {
    courseJson: string;
    userId: number | null;
    yearIndex: number;
    quarterName: 'Fall' | 'Winter' | 'Spring' | 'Summer';
}

async function removeCourseLogic({courseJson, userId, yearIndex, quarterName} : removeCourseProps) {
    let draggedCourse;
        if (courseJson === "") {
            draggedCourse = {
                "course_id": null,
                "course_number": "", 
                "course_name": "",
                "course_units": 0, 
                "category": ""
            }
        }
        else {
            draggedCourse = JSON.parse(courseJson);
        }

        if (userId !== null && draggedCourse.course_id !== null) {
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
}

export default removeCourseLogic;