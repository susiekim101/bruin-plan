import Quarters from './Quarters.tsx';
import { useState, useEffect } from 'react';
import axios from "axios";

type yearProps = {
    yearIndex: number;
}

interface Course {
    course_id: number | null;
    course_number: string;
    course_name: string;
    course_units: number;
    category: string;
}

function Year({yearIndex} : yearProps) {
    const [allCourses, setAllCourses] = useState<{ [key: string]: Course[] }>({});
    const userId = 3;

    const loadCourses = async (
                                year: number,
                                quarter: 'Fall' | 'Winter' | 'Spring' | 'Summer'
    ) => {
        if (!userId) return;

        try {
            const userData = {
                userId: userId,
                yearIndex: year,
                quarterName: quarter
            };
            const result = await axios.post(`http://localhost:3001/quarter/getCourses`, userData);
            setAllCourses(prev => ({
                ...prev,
                [`${year}-${quarter}`]: result.data.allCourses
            }));
            console.log(`Successfully loaded courses for ${quarter}`, result.data.allCourses);
        } catch (err) {
            console.error("Failed to load courses:", err);
        }
    };
    
    useEffect(() => {
        loadCourses(yearIndex, 'Fall');
        loadCourses(yearIndex, 'Winter');
        loadCourses(yearIndex, 'Spring');
        loadCourses(yearIndex, 'Summer');
    }, [yearIndex]);
    
    return (
        <div className="flex flex-row shrink w-full overflow-x-auto gap-x-3">
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Fall</p>
                <Quarters 
                    yearIndex={yearIndex} 
                    quarterName={"Fall"} 
                    courses={allCourses[`${yearIndex}-Fall`] || []}
                    userId={userId}
                    loadCourses={loadCourses}/>
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Winter</p>
                <Quarters 
                    yearIndex={yearIndex} 
                    quarterName={"Winter"} 
                    courses={allCourses[`${yearIndex}-Winter`] || []}
                    userId={userId}
                    loadCourses={loadCourses}/>
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Spring</p>
                <Quarters 
                    yearIndex={yearIndex} 
                    quarterName={"Spring"} 
                    courses={allCourses[`${yearIndex}-Spring`] || []}
                    userId={userId}
                    loadCourses={loadCourses}/>
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Summer</p>
                <Quarters 
                    yearIndex={yearIndex} 
                    quarterName={"Summer"} 
                    courses={allCourses[`${yearIndex}-Summer`] || []}
                    userId={userId}
                    loadCourses={loadCourses}/>
            </div>
        </div>
    )
};

export default Year;