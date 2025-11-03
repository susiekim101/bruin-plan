import SearchBar from './SearchBar'

function Sidebar() {
    return (
        <>
            <div className="flex justify-center bg-blue-800 rounded-l-3xl px-6 py-6 absolute inset-y-0 right-0 w-1/5">
                <SearchBar />
            </div>
        </>
    )
}

export default Sidebar
