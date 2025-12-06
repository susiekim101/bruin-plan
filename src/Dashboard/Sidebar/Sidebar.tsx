import { useState, useEffect, useCallback } from 'react';

import type { Course, MajorOption } from '../types.ts';

import CourseCard from '../components/CourseCards/CourseCards.tsx';
import SearchBar from './components/SearchBar.tsx';
import UserMajorDisplay from './components/UserMajorDisplay.tsx';
import SelectAMajor from './components/SelectAMajor.tsx';

import { useUserMajor,  useAllMajors} from './hooks/majors-selection.ts';
import { useMajorCourses, useUserCourses } from './hooks/courses-management.ts';
import { handleDragOver, handleDrop } from './handlers/DragDropHandler.ts';
import { handleSearch, handleSelect } from './handlers/SidebarHandler.ts';

interface sideBarProps {
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

    const onDropHandler = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        handleDrop({ event, userId, userMajor, setCourses, setFilteredCourses, loadQuarterCourses });
    }, [ userId, userMajor, setCourses, setFilteredCourses, loadQuarterCourses ]);

    const onSelectChange = useCallback((option: MajorOption | null) => {
        handleSelect({ option, setSelectedMajor });
    }, [setSelectedMajor]);
    
    const onSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch({ event, setSearchTerm });
    }, [setSearchTerm]);


    // Display courses whose course codes match search term
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCourses(courses);
            return;
        }

        const result = courses.filter(course =>
            course.course_number.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredCourses(result);
    }, [searchTerm, courses]);

    // Remove user's planned courses from major courses
    useEffect(() => {
        const loadCoursesNotPlanned = async () => {
            const coursesNotPlanned = majorCourses.filter((majorCourse: Course) => 
                    ! userCourses.some(userCourse => majorCourse.course_number === userCourse.course_number)
            );
            setCourses(coursesNotPlanned);
            setFilteredCourses(coursesNotPlanned);
        };
        loadCoursesNotPlanned();
    }, [userCourses, majorCourses]);
    

    return (
        <div
            id="sidebar"
            onDragOver={handleDragOver}
            onDrop={onDropHandler}
            className="flex flex-col justify-center bg-blue-800 rounded-l-3xl px-6 py-6 h-screen">
            { userMajor && 
                <UserMajorDisplay
                    majorName={userMajor.major_name}
                />
            }
            <SelectAMajor 
                selectedOption={selectedMajor}
                majorOptions={majors}
                handleChange={onSelectChange}
            />
            <SearchBar 
                searchTerm={searchTerm} 
                handleSearch={onSearchChange}
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
