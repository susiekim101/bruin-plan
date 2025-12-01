// import CustomCard from '../CourseCards/CustomCards';
import CourseCard from '../components/CourseCards/CourseCards';
import SearchBar from './SearchBar';
import Major from '../components/Major/Major'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import removeCourseLogic from '../Year/removeCourseLogic';

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

type sideBarProps = {
    loadQuarterCourses: (year: number, quarter: "Fall" | "Winter" | "Spring" | "Summer") => void;
}

function Sidebar({loadQuarterCourses}: sideBarProps) {
    const [ userMajor, setUserMajor ] = useState<Major>();
    const [ courses, setCourses ] = useState<Course[]>([]);
    const [ filteredCourses, setFilteredCourses ] = useState<Course[]>([])
    const [ searchTerm, setSearchTerm ] = useState('');
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const res = await axios.get("http://localhost:3001/user/userId", {
                    withCredentials: true
                });
                setUserId(res.data.user_id);
            } catch (err) {
                console.error("Failed to get user ID:", err);
            }
        };

        fetchUserId();
    }, []);

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

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }
    
    async function handleDrop (event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const payload = JSON.parse(event.dataTransfer.getData("application/json"));
        const courseObj : Course = JSON.parse(payload.courseJson);
        await removeCourseLogic({courseJson: payload.courseJson, userId: userId, yearIndex: payload.sourceYearIndex, quarterName: payload.sourceQuarterName});
        loadQuarterCourses(payload.sourceYearIndex, payload.sourceQuarterName);
        if (!userMajor || !courseObj) {
            return;
        }
        setCourses(prev => [
            {
                ...courseObj,
                major_id: userMajor.major_id
            },
            ...prev
        ]);
        setFilteredCourses(prev => [
            {
                ...courseObj,
                major_id: userMajor.major_id
            },
            ...prev
        ]);
    }
    const removeFromSidebar = (courseId: number) => {
        setCourses(prev => prev.filter(c => c.course_id !== courseId));
        setFilteredCourses(prev => prev.filter(c => c.course_id !== courseId));
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex flex-col justify-center bg-blue-800 rounded-l-3xl px-6 py-6 h-screen">
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
                        removeFromSidebar={removeFromSidebar}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
