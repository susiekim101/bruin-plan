import Quarters from './Quarters.tsx';

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
    removeFromSidebar: (courseId: number) => void;
    loadCourses: (year: number, quarter: "Fall" | "Winter" | "Spring" | "Summer") => void;
}

function Year({userId, yearIndex, allCourses, removeFromSidebar, loadCourses} : yearProps) {
    return (
        <div className="flex flex-row shrink w-full overflow-x-auto gap-x-3">
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Fall</p>
                <Quarters 
                    userId={userId}
                    yearIndex={yearIndex} 
                    quarterName={"Fall"} 
                    courses={allCourses[`${yearIndex}-Fall`] || []}
                    removeFromSidebar={removeFromSidebar}
                    loadCourses={loadCourses}/>
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Winter</p>
                <Quarters 
                    userId={userId}
                    yearIndex={yearIndex} 
                    quarterName={"Winter"} 
                    courses={allCourses[`${yearIndex}-Winter`] || []}
                    removeFromSidebar={removeFromSidebar}
                    loadCourses={loadCourses}/>
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Spring</p>
                <Quarters
                    userId={userId}
                    yearIndex={yearIndex} 
                    quarterName={"Spring"} 
                    courses={allCourses[`${yearIndex}-Spring`] || []}
                    removeFromSidebar={removeFromSidebar}
                    loadCourses={loadCourses}/>
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Summer</p>
                <Quarters 
                    userId={userId}
                    yearIndex={yearIndex} 
                    quarterName={"Summer"} 
                    courses={allCourses[`${yearIndex}-Summer`] || []}
                    removeFromSidebar={removeFromSidebar}
                    loadCourses={loadCourses}/>
            </div>
        </div>
    )
};

export default Year;