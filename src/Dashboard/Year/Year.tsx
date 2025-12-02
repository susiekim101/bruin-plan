import Quarters from './Quarters.tsx';
import { useEffect } from 'react';
import React from 'react';

interface Course {
    course_id: number | null;
    course_number: string;
    course_name: string;
    course_units: number;
    category: string;
}

type yearProps = {
    userId: number | null;
    yearIndex: number;
    allCourses: { [key: string]: Course[] };
    loadCourses: (year: number, quarter: "Fall" | "Winter" | "Spring" | "Summer") => void;
    setTotalUnits: React.Dispatch<React.SetStateAction<number>>;
}

function Year({userId, yearIndex, allCourses, loadCourses, setTotalUnits} : yearProps) {
    const [fallUnits, setFallUnits] = React.useState<number>(0);
    const [winterUnits, setWinterUnits] = React.useState<number>(0);
    const [springUnits, setSpringUnits] = React.useState<number>(0);
    const [summerUnits, setSummerUnits] = React.useState<number>(0);

    useEffect(() => {
        const totalUnits = fallUnits + winterUnits + springUnits + summerUnits;
        console.log(totalUnits);
        setTotalUnits(totalUnits);
    }, [fallUnits, winterUnits, springUnits, summerUnits]);

    return (
        <div className="flex flex-row shrink w-full overflow-x-auto gap-x-3">
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Fall</p>
                <Quarters 
                    userId={userId}
                    yearIndex={yearIndex} 
                    quarterName={"Fall"} 
                    courses={allCourses[`${yearIndex}-Fall`] || []}
                    loadCourses={loadCourses}
                    setQuarterTotal={setFallUnits}/>
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Winter</p>
                <Quarters 
                    userId={userId}
                    yearIndex={yearIndex} 
                    quarterName={"Winter"} 
                    courses={allCourses[`${yearIndex}-Winter`] || []}
                    loadCourses={loadCourses}
                    setQuarterTotal={setWinterUnits}/>
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Spring</p>
                <Quarters
                    userId={userId}
                    yearIndex={yearIndex} 
                    quarterName={"Spring"} 
                    courses={allCourses[`${yearIndex}-Spring`] || []}
                    loadCourses={loadCourses}
                    setQuarterTotal={setSpringUnits}/>
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Summer</p>
                <Quarters 
                    userId={userId}
                    yearIndex={yearIndex} 
                    quarterName={"Summer"} 
                    courses={allCourses[`${yearIndex}-Summer`] || []}
                    loadCourses={loadCourses}
                    setQuarterTotal={setSummerUnits}/>
            </div>
        </div>
    )
};

export default Year;