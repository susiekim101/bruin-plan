// import CustomCard from '../CourseCards/CustomCards';
import CourseCard from '../components/CourseCards/CourseCards';
import SearchBar from './SearchBar';
import Major from '../components/Major/Major'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Major {
    major_name: string,
    major_id: number
}

interface Course {
    course_id: number,
    course_number: string,
    course_name: string,
    course_units: number,
    category: string,
    major_id: number
}

function Sidebar() {
    const [ userMajor, setUserMajor ] = useState<Major>();
    const [ courses, setCourses ] = useState<Course[]>([]);
    const [ filteredCourses, setFilteredCourses ] = useState<Course[]>([])
    const [ searchTerm, setSearchTerm ] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const navigate = useNavigate();

    useEffect(() => {
        const loadMajor = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user/major', { withCredentials: true });
                setUserMajor(response.data.data);
                console.log(response.data.data);
            } catch (err){
                console.error("Failed to load major: ", err);
                navigate('/');
            }
        }
        loadMajor();
    }, []);

    useEffect(() => {
        const loadCourses = async () => {
            if (! userMajor )
                return;

            try {
                const userMajorID = userMajor.major_id;
                const response = await axios.get(`http://localhost:3001/courses/${userMajorID}`, { withCredentials: true });
                setCourses(response.data.data);
                setFilteredCourses(response.data.data);
                console.log(response.data.data);
            } catch (err){
                console.error("Failed to load courses: ", err);
                navigate('/');
            }
        };

        loadCourses();
    }, [userMajor?.major_id]);

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
                        courseId={course.course_id}
                        courseName={course.course_number}
                        courseTitle={course.course_name}
                        units={course.course_units}
                        courseClassification={course.category}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
