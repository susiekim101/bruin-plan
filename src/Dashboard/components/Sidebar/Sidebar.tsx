import Card from '../Dashboard/components/CourseCards/Card'
import SearchBar from './SearchBar'

function Sidebar() {
    return (
        <>
            <div className="flex flex-col justify-center bg-blue-800 rounded-l-3xl px-6 py-6 absolute inset-y-0 right-0 w-1/5">
                <SearchBar />
                <div className="flex flex-col gap-4 mt-6 overflow-y-auto h-full w-full">
                    <Card />
                    <Card />
                </div>
            </div>
        </>
    )
}

export default Sidebar
