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

function handleDropLogic({courseJson, userId, yearIndex, quarterName} : handleDropProps) {
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

    // setCourses(prev => [...prev, droppedCourse]);

    if (userId !== null && droppedCourse.course_id !== null) {
        // console.log("goes to add course");
        // console.log(droppedCourse.course_id);
        fetch(`http://localhost:3001/quarter/add-course/${userId}/${droppedCourse.course_id}/${yearIndex}/${quarterName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                courseId: droppedCourse.course_id,
                yearIndex: yearIndex,
                quarterName: quarterName
            })
        })
        .then(res => res.json())
        .then(data => console.log("Saved:", data))
        .catch(err => console.error(err));
    }
    else {
        console.log("something is null");
        console.log(userId);
        console.log(droppedCourse.course_id);
    }
}

function Quarters({yearIndex, quarterName} : quarterProps) {
    const [courses, setCourses ] = useState<Course[]>([]);
    //const [userId, setUserId] = useState<number | null>(null);
    const userId = 19;
    // TO-DO: fetch userID from backend
    // pass in default right now
    
    

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        removeCourse();
    }

    function handleDrop (event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const itemId = event.dataTransfer.getData("application/json");
        console.log(itemId);

        handleDropLogic({courseJson: itemId, userId: userId, yearIndex: yearIndex, quarterName: quarterName});
        /*
        let droppedCourse;
        if (itemId === "") {
            droppedCourse = {
                "course_id": null,
                "course_number": "", 
                "course_name": "",
                "course_units": 0, 
                "category": ""
            }
        }
        else {
            droppedCourse = JSON.parse(itemId);
        }

        setCourses(prev => [...prev, droppedCourse]);

       if (userId !== null && droppedCourse.course_id !== null) {
            fetch("http://localhost:3001/quarter/add-course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    courseId: droppedCourse.course_id,
                    yearIndex,
                    quarterName
                })
            })
            .then(res => res.json())
            .then(data => console.log("Saved:", data))
            .catch(err => console.error(err));
        }
        else {
            console.log("something is null");
            console.log(userId);
            console.log(droppedCourse.course_id);
        }
        */
    }

    const removeCourse = () => {

    }

    useEffect(() => {
        if (!userId) {
            console.log("no user id: ", userId);
            return;
        }

        const loadCourses = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3001/quarter/${userId}/${yearIndex}/${quarterName}`
                );
                setCourses(res.data.data);
            } catch (err) {
                console.error("Failed to load courses:", err);
            }
        };

        loadCourses();
    }, [userId, yearIndex, quarterName]);


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