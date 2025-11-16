import CustomCard from '../components/CourseCards/CustomCards';
import CourseCard from '../components/CourseCards/CourseCards';
import SearchBar from './SearchBar';
import Filter from './Filter';
import type { MajorOption } from './Filter'
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Course {
    course_number: string,
    course_name: string,
    course_units: number,
    course_category: string,
    major_id: number
}

function Sidebar() {
    const [ courses, setCourses ] = useState<Course[]>([]);
    const [ selectedMajor, setSelectedMajor ] = useState<MajorOption | null>(null);
    useEffect(() => {
        const loadCourses = async () => {
            try {
                // TODO: pass in user's major_id
                const response = await axios.get('http://localhost:3001/courses/1');
                setCourses(response.data.data);
                console.log(response.data.data);
            } catch {
                console.error("Failed to load courses");
            }
        };

        loadCourses();
    }, []);

    return (
        <div className="w-full flex shrink justify-end">
            <div className="flex gap-4 flex-col justify-center bg-blue-800 rounded-l-3xl px-6 py-6 h-screen">
                <Filter selectedMajor={selectedMajor} setSelectedMajor={setSelectedMajor}/>
                <SearchBar />
                <div className="flex flex-col gap-4 mt-2 overflow-y-auto h-full w-full">
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
