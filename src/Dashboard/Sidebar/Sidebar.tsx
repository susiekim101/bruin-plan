// import CustomCard from '../CourseCards/CustomCards';
import CourseCard from '../components/CourseCards/CourseCards';
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
    const [ filteredCourses, setFilteredCourses ] = useState<Course[]>([])
    const [ searchTerm, setSearchTerm ] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const navigate = useNavigate();

    useEffect(() => {
        const loadCourses = async () => {
            try {
                // TODO: pass in user's major_id
                const response = await axios.get('http://localhost:3001/courses/1', { withCredentials: true });
                setCourses(response.data.data);
                setFilteredCourses(response.data.data);
                console.log(response.data.data);
            } catch (err){
                console.error("Failed to load courses: ", err);
                navigate('/');
            }
        };

        loadCourses();
    }, []);

    useEffect(() => {
        // If the search term is empty, display all original data
        if (searchTerm === '') {
            setFilteredCourses(courses);
            return;
        }

        // Filter the original data based on the search term
        const result = courses.filter(course =>
            course.course_number.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredCourses(result);
    }, [searchTerm, courses]);

    return (
        <div className="flex flex-col justify-center bg-blue-800 rounded-l-3xl px-6 py-6 h-screen">
            <SearchBar searchTerm={searchTerm} handleSearch={handleSearch}/>
            <div id='course-list' className="flex flex-col gap-4 mt-6 overflow-y-auto h-full w-full">
                {filteredCourses.map((course, index) => (
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
    );
}

export default Sidebar;
