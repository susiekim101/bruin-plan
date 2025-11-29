// import CustomCard from '../CourseCards/CustomCards';
import CourseCard from '../components/CourseCards/CourseCards.tsx';
import SearchBar from './SearchBar.tsx';
import Major from '../components/Major/Major.tsx';
import Filter from './Filter.tsx';
import type { MajorOption } from './Filter.tsx';
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
    const [ selectedMajor, setSelectedMajor ] = useState<MajorOption | null>(null);
    const [ majors, setMajors ] = useState<MajorOption[]>([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilter = (option: MajorOption | null) => {
        setSelectedMajor(option);
        console.log('Selected major: ', option);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const loadUserMajor = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user/major', { withCredentials: true });
                setUserMajor(response.data.data);
                console.log(response.data.data);
            } catch (err){
                console.error("Failed to load user's major: ", err);
                navigate('/');
            }
        }
        loadUserMajor();
    }, []);

    useEffect(() => {
        const loadAllMajors = async () => {
            try {
                const response = await axios.get('http://localhost:3001/majors', { withCredentials: true });
                const allMajors = response.data.data.map(major => ({
                    value: major.major_id,
                    label: major.major_name
                }))
                setMajors(allMajors);
                console.log(allMajors);
            } catch (err) {
                console.error("Failed to load all majors: ", err);
                navigate('/');
            }
        }
        loadAllMajors();
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
            {userMajor && <Major majorName={userMajor.major_name}/>}
            <Filter 
                selectedOption={selectedMajor}
                majorOptions={majors}
                handleChange={handleFilter}
            />
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
