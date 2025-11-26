// import CustomCard from '../CourseCards/CustomCards';
import CourseCard from '../components/CourseCards/CourseCards';
import SearchBar from './SearchBar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Major {
    major_name: string,
    major_id: number
}

interface Course {
    course_number: string,
    course_name: string,
    course_units: number,
    course_category: string,
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
        <div className="w-full flex shrink justify-end">
            <div className="flex flex-col justify-center bg-blue-800 rounded-l-3xl px-6 py-6 h-screen">
                <div className="w-fit py-1 px-2 flex flex-col justify-items-center items-center">
                    <p className="text-gray-200 font-bold text-sm"> 
                        Major: {userMajor?.major_name}
                    </p>
                </div>
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
        </div>
    );
}

export default Sidebar;
