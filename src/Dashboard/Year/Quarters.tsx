import CourseCard from "../components/CourseCards/CourseCards";
import CustomCard from "../components/CourseCards/CustomCards";
import { useEffect } from 'react';
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
    yearIndex: number;
    quarterName: 'Fall' | 'Winter' | 'Spring' | 'Summer';
    courses: Course[];
    userId: number;
    loadCourses: (year: number, quarter: "Fall" | "Winter" | "Spring" | "Summer") => void;
}

function Quarters({yearIndex, quarterName, courses, userId, loadCourses} : quarterProps) {
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    async function handleDrop (event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const payload = JSON.parse(event.dataTransfer.getData("application/json"));

        await removeCourseLogic({courseJson: payload.courseJson, userId: userId, yearIndex: payload.sourceYearIndex, quarterName: payload.sourceQuarterName});

        await handleDropLogic({courseJson: payload.courseJson, userId: userId, yearIndex: yearIndex, quarterName: quarterName});
        loadCourses(payload.sourceYearIndex, payload.sourceQuarterName);
        loadCourses(yearIndex, quarterName);
    }
    useEffect(() => {
        loadCourses(yearIndex, quarterName);
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
                <p className="text-black font-bold">
                    Units: 15
                </p>
            </div>
        </div>
    );
}
export default Quarters;