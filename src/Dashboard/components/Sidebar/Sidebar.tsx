import Card from '../CourseCards/Card'
import SearchBar from './SearchBar'

function Sidebar() {
    return (
        <div className="w-full flex shrink justify-end">
            <div className="flex flex-col justify-center bg-blue-800 rounded-l-3xl px-6 py-6 h-screen">
                <SearchBar />
                <div className="flex flex-col gap-4 mt-6 overflow-y-auto h-full w-full">
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
