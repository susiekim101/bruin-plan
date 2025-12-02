import CourseStatus from "./CourseStatus";
import CourseUnits from "./CourseUnits";

type CourseCardProps = {
    courseId: number;
    units: number;
    courseName: string;
    courseTitle: string;
    courseClassification: string;
    yearIndex?: number;
    quarterName?: 'Fall' | 'Winter' | 'Spring' | 'Summer';
}

function CourseCard({ courseId, courseName, courseTitle, units, courseClassification, yearIndex, quarterName}: CourseCardProps) {
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const payload = {
            courseJson: JSON.stringify({
                course_id: courseId, 
                course_number: courseName,
                course_name: courseTitle,
                course_units: units, 
                category: courseClassification,
            }),
            sourceYearIndex: yearIndex !== undefined ? yearIndex : null,
            sourceQuarterName: quarterName !== undefined ? quarterName : null

        };

        console.log(payload);
        event.dataTransfer.setData("application/json", JSON.stringify(payload));
    };

    return (
        <>
            <div draggable="true" onDragStart={handleDragStart} data-testid="course-card-root" className="
                bg-sky-600 rounded-[20px] border border-black w-full h-fit flex flex-col p-3
            ">
                <div 
                    className="p-1 flex justify-between text-amber-300 font-bold text-[12px]
                ">
                    <div>
                        { units !== undefined ? (
                            <p>
                                Units: {units}
                            </p>
                            ) : (
                                <p>
                                    Units: {<CourseUnits />}
                                </p>
                            )
                        }
                    </div>
                    <div 
                        className=" bg-zinc-100 text-gray-600 rounded-md text-[10px] font-normal inline-block h-fit ml-auto items-center
                    ">
                        <p className="px-1">
                            {courseClassification}
                        </p>
                    </div>
                </div>
                <div 
                    className="p-1 pt-2 flex flex-start text-white font-bold text-[18px] w-full
                ">
                    <p>
                        {courseName}
                    </p>
                </div>
                <div 
                    className="p-1 pt-0 flex flex-start text-white font-normal text-[16px] w-full
                ">
                    <p>
                        {courseTitle}
                    </p>
                </div>
                <div 
                    className=" bg-zinc-100 rounded-md text-gray-600 text-[10px] font-normal ml-auto max-w-min flex items-center
                ">
                    <CourseStatus />
                </div>
            </div>
        </>
    );
};


export default CourseCard;