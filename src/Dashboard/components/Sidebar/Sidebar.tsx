// import CustomCard from '../CourseCards/CustomCards';
import CourseCard from '../CourseCards/CourseCards';
import SearchBar from './SearchBar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Course {
    course_number: string,
    course_name: string,
    course_units: number,
    course_category: string,
    major_id: number
}

function Sidebar() {
    const [ courses, setCourses ] = useState<Course[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCourses = async () => {
            try {
                // TODO: pass in user's major_id
                const response = await axios.get('http://localhost:3001/courses/1', { withCredentials: true });
                setCourses(response.data.data);
                // console.log(response.data.data);
            } catch (err){
                console.error("Failed to load courses: ", err);
                navigate('/');
            }
        };

        loadCourses();
    }, []);

    return (
        <div className="w-full flex shrink justify-end">
            <div className="flex flex-col justify-center bg-blue-800 rounded-l-3xl px-6 py-6 h-screen">
                <SearchBar />
                <div className="flex flex-col gap-4 mt-6 overflow-y-auto h-full w-full">
                    {courses.map((course, index) => (
                        <CourseCard 
                            key={index}
                            courseName={course.course_number}
                            courseTitle={course.course_name}
                            units={course.course_units}
                            courseClassification={course.course_category}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
