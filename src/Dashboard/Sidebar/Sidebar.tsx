// import CustomCard from '../CourseCards/CustomCards';
import CourseCard from '../components/CourseCards/CourseCards.tsx';
import SearchBar from './SearchBar.tsx';
import Major from '../components/Major/Major.tsx';
import Filter from './Filter.tsx';
import type { MajorOption } from './Filter.tsx';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import removeCourseLogic from '../Year/removeCourseLogic';

interface Major {
    major_name: string,
    major_id: number
}

interface UserMajor {
    value: string,
    label: string
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
    userId: number | null;
    loadQuarterCourses: (year: number, quarter: "Fall" | "Winter" | "Spring" | "Summer") => void;
}

function Sidebar({userId, loadQuarterCourses}: sideBarProps) {
    const [ userMajor, setUserMajor ] = useState<Major>();
    const [ courses, setCourses ] = useState<Course[]>([]);
    const [ userCourses, setUserCourses ] = useState<Course[] | null>(null);
    const [ filteredCourses, setFilteredCourses ] = useState<Course[]>([])
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ selectedMajor, setSelectedMajor ] = useState<MajorOption | null>(null);
    const [ majors, setMajors ] = useState<MajorOption[]>([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        console.log('Search by: ', event.target.value);
    };

    const handleFilter = (option: MajorOption | null) => {
        setSelectedMajor(option);
        console.log('Selected major: ', option);
    };

    const navigate = useNavigate();

    // Fetch user's major
    useEffect(() => {
        const loadUserMajor = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user/major', { withCredentials: true });
                setUserMajor(response.data.data);
                console.log("Loaded user's major: ", response.data.data);
            } catch (err){
                console.error("Failed to load user's major: ", err);
                navigate('/');
            }
        }
        loadUserMajor();
    }, []);

    // Fetch all majors for Filter component
    useEffect(() => {
        const loadAllMajors = async () => {
            try {
                const response = await axios.get('http://localhost:3001/majors', { withCredentials: true });
                const allMajors = response.data.data.map((major: Major) => ({
                    value: major.major_id,
                    label: major.major_name
                }));
                
                if (userMajor) {
                        const allMajorsExceptUserMajor = allMajors.filter((major: UserMajor) =>
                        Number(major.value) != Number(userMajor.major_id)
                    );

                    setMajors(allMajorsExceptUserMajor);
                    console.log("All majors except user's major: ", allMajorsExceptUserMajor);
                }
            } catch (err) {
                console.error("Failed to load all majors: ", err);
                navigate('/');
            }
        }
        loadAllMajors();
    }, [userMajor?.major_id]);

    useEffect(() => {
        const loadUserCourses = async () => {
            if (! userId)
                return;
            
            try {
                const response = await axios.get(`http://localhost:3001/courses/planned/${userId}`, { withCredentials: true});
                setUserCourses(response.data.data);
                console.log("User's planned courses: ", response.data.data);
            } catch (err) {
                console.error("Failed to load user's courses: ", err);
                navigate('/');
            }
        }
        loadUserCourses();
    }, [userId]);

    // Fetch all courses for a given major
    useEffect(() => {
        const loadCourses = async (majorID: number) => {
            // Return if userId hasn't been loaded
            if (! userCourses)
                return;

            try {
                const response = await axios.get(`http://localhost:3001/courses/${majorID}`, { withCredentials: true });
                const allMajorCourses = response.data.data;
                
                // Remove courses already in user's planner
                const coursesNotPlanned = allMajorCourses.filter((majorCourse: Course) => 
                    ! userCourses.some(userCourse => majorCourse.course_number === userCourse.course_number));
                
                setCourses(coursesNotPlanned);
                setFilteredCourses(coursesNotPlanned);
                console.log(`Displaying courses for major ${majorID}`, coursesNotPlanned);
            } catch (err){
                console.error(`Failed to load courses for selected major ${majorID}`, err);
                navigate('/');
            }
        };

        if ( selectedMajor ) {
            loadCourses(selectedMajor.value);
        } else if (userMajor) {
            loadCourses( userMajor.major_id )
        } else {
            return;
        }
        
    }, [userCourses, userMajor?.major_id, selectedMajor?.value]);

    // Display courses whose course codes match search term
    useEffect(() => {
        // If the search term is empty, display all courses
        if (searchTerm === '') {
            setFilteredCourses(courses);
            return;
        }

        // Filter the courses based on the search term
        const result = courses.filter(course =>
            course.course_number.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredCourses(result);
    }, [searchTerm, courses]);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const removeFromSidebar = (courseId: number) => {
        setCourses(prev => prev.filter(c => c.course_id !== courseId));
        setFilteredCourses(prev => prev.filter(c => c.course_id !== courseId));
    };
    
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

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex flex-col justify-center bg-blue-800 rounded-l-3xl px-6 py-6 h-screen">
            { userMajor && 
                <Major
                    majorName={userMajor.major_name}
                />
            }
            <Filter 
                selectedOption={selectedMajor}
                majorOptions={majors}
                handleChange={handleFilter}
            />
            <SearchBar 
                searchTerm={searchTerm} 
                handleSearch={handleSearch}
            />
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
