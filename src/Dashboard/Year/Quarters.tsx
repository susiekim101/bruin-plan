import CourseCard from "../components/CourseCards/CourseCards";
import CustomCard from "../components/CourseCards/CustomCards";
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Course {
    course_id: number | null;
    course_number: string;
    course_name: string;
    course_units: number;
    category: string;
}

type quarterProps = {
    yearIndex: number;
    quarterName: 'Fall' | 'Winter' | 'Spring' | 'Summer';
}

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

function Quarters({yearIndex, quarterName} : quarterProps) {
    const [courses, setCourses ] = useState<Course[]>([]);
    const userId = 3;

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        // removeCourse();
    }

    async function handleDrop (event: React.DragEvent<HTMLDivElement>) {

        event.preventDefault();
        const itemId = event.dataTransfer.getData("application/json");

        await handleDropLogic({courseJson: itemId, userId: userId, yearIndex: yearIndex, quarterName: quarterName});

        loadCourses();
    }

    const removeCourse = () => {

    }

    const loadCourses = async () => {
        if (!userId) return;

        try {
            const userData = {
                userId,
                yearIndex,
                quarterName
            };

            const result = await axios.post(`http://localhost:3001/quarter/getCourses`, userData);
            console.log(`Successfully loaded courses for ${quarterName}`, result.data.allCourses);
            setCourses(result.data.allCourses);
        } catch (err) {
            console.error("Failed to load courses:", err);
            setCourses([]);
        }
    };

    useEffect(() => {
        loadCourses();
    }, [quarterName, yearIndex]);


    const isEmptyCourse = (course: Course) => 
        course.course_number === "" &&
        course.course_name === "" &&
        course.course_units === 0 &&
        course.category === "";

    return(
        <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex flex-col w-full justify-between bg-zinc-200 h-[calc(100vh-8em)] m-3 mt-0.5 rounded-3xl p-4 overflow-y-scroll">
            <div className="flex flex-col shrink space-y-2">
                {courses.map((course, index) => (
                    isEmptyCourse(course) ? (
                        <CustomCard key={index} />
                    ) : (
                        <CourseCard
                            key={index}
                            courseId={course.course_id}
                            courseName={course.course_number}
                            courseTitle={course.course_name}
                            units={course.course_units}
                            courseClassification={course.category}
                        />
                    )
                ))}

            </div>
            
            <div className="flex flex-col justify-center items-center mt-0.5">
                <button className="flex justify-center items-center bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-2 text-xs rounded-full w-fit mt-4 mb-0.5 whitespace-nowrap"
                    onClick={changeClassStatus}>
                    Mark all as
                </button>
                <p className="text-black font-bold">
                    Units: 15
                </p>
            </div>
        </div>
    );
}
export default Quarters;

function changeClassStatus() {

};