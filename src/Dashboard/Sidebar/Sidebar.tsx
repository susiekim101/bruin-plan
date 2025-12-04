import { useState, useEffect } from 'react';

import type { Course, MajorOption } from '../types.ts';

import CourseCard from '../components/CourseCards/CourseCards.tsx';
import SearchBar from './SearchBar.tsx';
import UserMajorDisplay from '../components/UserMajorDisplay/UserMajorDisplay.tsx';
import Filter from './Filter.tsx';

import { useUserMajor,  useAllMajors} from './hooks/majors-hooks.ts';
import { useMajorCourses, useUserCourses } from './hooks/courses-hooks.ts';
import removeCourseLogic from '../Year/removeCourseLogic';

type sideBarProps = {
    userId: number | null;
    courses: Course[];
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
    filteredCourses: Course[];
    setFilteredCourses: React.Dispatch<React.SetStateAction<Course[]>>;
    loadQuarterCourses: (year: number, quarter: "Fall" | "Winter" | "Spring" | "Summer") => void;
}

function Sidebar({userId, courses, setCourses, filteredCourses, setFilteredCourses, loadQuarterCourses}: sideBarProps) {
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ selectedMajor, setSelectedMajor ] = useState<MajorOption | null>(null);

    const { userMajor } = useUserMajor();
    const { majors } = useAllMajors({ userMajor });
    const { userCourses } = useUserCourses({ userId }); 
    const { majorCourses } = useMajorCourses({ userMajor, selectedMajor });

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilter = (option: MajorOption | null) => {
        setSelectedMajor(option);
    };

    // Remove user's planned courses from major courses
    useEffect(() => {
        const loadCourses = async () => {
            const coursesNotPlanned = majorCourses.filter((majorCourse: Course) => 
                    ! userCourses.some(userCourse => majorCourse.course_number === userCourse.course_number)
            );
            setCourses(coursesNotPlanned);
            setFilteredCourses(coursesNotPlanned);
        };
        loadCourses();
    }, [userCourses, majorCourses]);

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
            id="sidebar"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex flex-col justify-center bg-blue-800 rounded-l-3xl px-6 py-6 h-screen">
            { userMajor && 
                <UserMajorDisplay
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
                    course.course_id === null ? null : (
                    <CourseCard 
                        key={index}
                        courseId={course.course_id}
                        courseName={course.course_number}
                        courseTitle={course.course_name}
                        units={course.course_units}
                        status={course.status}
                        courseClassification={course.category}
                    />
                    )
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
