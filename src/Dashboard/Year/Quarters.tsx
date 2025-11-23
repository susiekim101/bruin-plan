import CourseCard from "../components/CourseCards/CourseCards";
import CustomCard from "../components/CourseCards/CustomCards";
import { handleDrop, handleDragOver } from './QuarterManager'
import { useState, useEffect } from 'react';

interface Course {
    course_number: string,
    course_name: string,
    course_units: number,
    category: string,
}

type quarterProps = {
    yearIndex: number;
    quarterName: 'Fall' | 'Winter' | 'Spring' | 'Summer';
}



function Quarters({yearIndex, quarterName} : quarterProps) {
    const [courses, setCourses ] = useState<Course[]>([]);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const itemId = event.dataTransfer.getData("application/json");
        console.log(itemId);
        
        if (itemId === "") {
            setCourses(prev => [...prev, {
                "course_number": "", 
                "course_name": "",
                "course_units": 0, 
                "category": ""
            }]);
        }
        else {
            const droppedCourse: Course = JSON.parse(itemId);
            setCourses(prev => [...prev, droppedCourse]);
        }
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
                    isEmptyCourse(course) ? (
                        <CustomCard key={index} />
                    ) : (
                        <CourseCard
                            key={index}
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