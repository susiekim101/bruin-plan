import axios from "axios";

type handleDropProps = {
    courseJson: string;
    userId: number | null;
    yearIndex: number;
    quarterName: 'Fall' | 'Winter' | 'Spring' | 'Summer';
}

async function handleDropLogic({courseJson, userId, yearIndex, quarterName} : handleDropProps) {
    let droppedCourse;
    if (courseJson === "") {
        droppedCourse = {
            "course_id": null,
            "course_number": "", 
            "course_name": "",
            "course_units": 0, 
            "category": ""
        }
    }
    else {
        droppedCourse = JSON.parse(courseJson);
    }

    if (userId !== null && droppedCourse.course_id !== null) {
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
}

export default handleDropLogic;