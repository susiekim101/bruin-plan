import CourseUnits from './CourseUnits.tsx'
import CourseStatus from './CourseStatus.tsx'
import CourseClassification from './CourseClassification.tsx'
import CourseName from './CourseName.tsx'
import CourseTitle from './CourseTitle.tsx'
//import './Card.css'

type CardProps = {
    units?: number;
    courseName?: string;
    courseTitle?: string;
}

function Card({ courseName, courseTitle, units }: CardProps) {
    return (
        <>
            <div className="
                bg-[#6096BA]
                rounded-[20px]
                border
                border-black
                min-w-[295px]
                min-h-[130px]
                w-fit
                h-fit
                flex
                flex-col
                p-3
                ">
                <div className="
                    p-1
                    flex
                    justify-between
                    text-[#E5C655]
                    font-bold
                    text-[12px]
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
                    <div className="
                        bg-[#E9E9E9]
                        text-gray-600
                        rounded-md
                        text-[10px]
                        font-normal
                        inline-block
                        max-w-min
                        h-[15px]
                        ">
                        <CourseClassification />
                    </div>
                </div>
                <div className="
                    p-1
                    pt-2
                    flex
                    flex-start
                    text-white
                    font-bold
                    text-[18px]
                    w-full
                    ">
                    { courseName !== undefined ? (
                        <p>
                            {courseName}
                        </p>
                        ) : (
                            <CourseName />
                        )
                    }
                </div>
                <div className="
                    p-1
                    pt-0
                    flex
                    flex-start
                    text-white
                    font-normal
                    text-[16px]
                    w-full
                    ">
                    { courseTitle !== undefined ? (
                        <p>
                            {courseTitle}
                        </p>
                        ) : (
                            <CourseTitle />
                        )
                    }
                </div>
                <div className="
                    bg-[#E9E9E9]
                    rounded-md
                    text-gray-600
                    text-[10px]
                    font-normal
                    ml-auto
                    max-w-min
                    flex
                    items-center
                    ">
                    <CourseStatus />
                </div>
            </div>
        </>
    );
}


export default Card