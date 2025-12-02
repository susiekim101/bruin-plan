import CourseCard from "../components/CourseCards/CourseCards";
import CustomCard from "../components/CourseCards/CustomCards";
import { useEffect } from 'react';
import React from 'react';
import handleDropLogic from "./handleDropLogic";
import removeCourseLogic from "./removeCourseLogic";

interface Course {
    course_id: number | null;
    course_number: string;
    course_name: string;
    course_units: number;
    category: string;
}

type quarterProps = {
    userId: number | null;
    yearIndex: number;
    quarterName: 'Fall' | 'Winter' | 'Spring' | 'Summer';
    courses: Course[];
    removeFromSidebar: (courseId: number) => void;
    loadCourses: (year: number, quarter: "Fall" | "Winter" | "Spring" | "Summer") => void;
}

function Quarters({userId, yearIndex, quarterName, courses, removeFromSidebar, loadCourses} : quarterProps) {
    const [totalUnits, setTotalUnits] = React.useState<number>(0);
    
    useEffect(() => {
        loadCourses(yearIndex, quarterName);
    }, [quarterName, yearIndex]);

    useEffect(() => {
        setTotalUnits(courses.reduce((sum, course) => sum + course.course_units, 0));
    }, [courses, totalUnits]);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    async function handleDrop (event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const payload = JSON.parse(event.dataTransfer.getData("application/json"));

        await removeCourseLogic({courseJson: payload.courseJson, userId: userId, yearIndex: payload.sourceYearIndex, quarterName: payload.sourceQuarterName});

        await handleDropLogic({courseJson: payload.courseJson, userId: userId, yearIndex: yearIndex, quarterName: quarterName});

        if (!payload.sourceQuarterName && removeFromSidebar) {
            const courseObj = JSON.parse(payload.courseJson);
            removeFromSidebar(courseObj.course_id);
        }
        loadCourses(payload.sourceYearIndex, payload.sourceQuarterName);
        loadCourses(yearIndex, quarterName);
    }

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
                    (isEmptyCourse(course) || course.course_id === null) ? (
                        <CustomCard key={index} />
                    ) : (
                        <CourseCard
                            key={index}
                            courseId={course.course_id}
                            courseName={course.course_number}
                            courseTitle={course.course_name}
                            units={course.course_units}
                            courseClassification={course.category}
                            yearIndex={yearIndex}
                            quarterName={quarterName}
                        />
                    )
                ))}

            </div>
            
            <div className="flex flex-col justify-center items-center mt-0.5">
                <button className="flex justify-center items-center bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-2 text-xs rounded-full w-fit mt-4 mb-0.5 whitespace-nowrap">
                    Mark all as
                </button>
                <div> 
                    { (totalUnits > 21 || (totalUnits < 12 && quarterName != "Summer")) ?
                        <p className="text-red-600 font-bold">
                            Units: {totalUnits}
                        </p>
                    :
                        <p className="text-black font-bold">
                            Units: {totalUnits}
                        </p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Quarters;