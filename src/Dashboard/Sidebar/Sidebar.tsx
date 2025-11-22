import CustomCard from '../components/CourseCards/CustomCards';
import CourseCard from '../components/CourseCards/CourseCards';
import SearchBar from './SearchBar';
import Filter from './Filter';
import axios from 'axios';
import { useState, useEffect } from 'react';
import type { OnChangeValue } from 'react-select';

interface Major {
    major_id: number;
    major_name: string;
}

export interface MajorOption {
    value: number;
    label: string;
}

interface Course {
    course_number: string,
    course_name: string,
    course_units: number,
    course_category: string,
    major_id: number
}

function Sidebar() {
    const [ courses, setCourses ] = useState<Course[]>([]);
    const [ majorOptions, setMajorOptions ] = useState<MajorOption[]>([]);
    const [ selectedMajor, setSelectedMajor ] = useState<MajorOption | null>({value: 1, label: "Computer Engineering"});

    const handleFilter = (
        selectedOption: OnChangeValue<MajorOption, false> | null
    ) => {
        setSelectedMajor(selectedOption);
    }

    // load majors
    useEffect(() => {
        const loadMajors = async () => {
            try {
                const response = await axios.get('http://localhost:3001/majors');
                const options = response.data.data.map((major: Major) => ({
                    value: major.major_id, 
                    label: major.major_name
                }));

                setMajorOptions(options);
                console.log(response.data.data);

            } catch {
                console.error("Failed to load majors.");
            }
        };

        loadMajors();
    }, [])

    // load courses for specified major
    useEffect(() => {
        const loadCourses = async () => {
            try {
                if (! selectedMajor)
                    return;

                const response = await axios.get(`http://localhost:3001/courses/${selectedMajor.value}`);
                setCourses(response.data.data);

                console.log(response.data.data);
            } catch {
                console.error("Failed to load courses");
            }
        };

        loadCourses();
    }, [selectedMajor]);

    return (
        <div className="w-full flex shrink justify-end">
            <div className="flex gap-4 flex-col justify-center bg-blue-800 rounded-l-3xl px-6 py-6 h-screen">
                <Filter 
                    options={majorOptions} 
                    selectedMajor={selectedMajor} 
                    handleFilter={handleFilter}
                />
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
