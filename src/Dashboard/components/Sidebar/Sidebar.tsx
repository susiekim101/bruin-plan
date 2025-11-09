import CustomCard from '../CourseCards/CustomCards';
import CourseCard from '../CourseCards/CourseCards';
import SearchBar from './SearchBar';

function Sidebar() {
    return (
        <div className="w-full flex justify-end">
            <div className="flex flex-col justify-center bg-blue-800 rounded-l-3xl px-6 py-6 w-3xs h-screen">
                <SearchBar />
                <div className="flex flex-col gap-4 mt-6 overflow-y-auto h-full w-full">
                    <CustomCard />
                    <CustomCard />
                    <CourseCard units={4} courseName='COM SCI 35L' courseTitle='Software Construction' courseClassification='Major'/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
